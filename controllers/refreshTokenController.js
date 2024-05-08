const States = require('../model/States');
const bcrypt = require('jsonwebtoken');

const handleRefreshToken = async(req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundState = await States.findOne({ refreshToken }).exec();
    if(!foundState) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundState.stateCode !== decoded.stateCode) return res.sendStatus(403);
            const funFacts = Object.values(foundState.funFacts);
            const accessToken = jwt.sign(
                {
                    "StateInfo":{
                        "stateCode": decoded.stateCode,
                        "funFacts": funFacts

                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({accessToken})
        }
    );
}

module.exports = { handleRefreshToken }
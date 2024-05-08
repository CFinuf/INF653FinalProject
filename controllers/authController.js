const State = require('../model/States');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { stateCode, funfact } = req.body;
    if (!stateCode || !funfact) return res.status(400).json({ 'message': 'State Code and Fun Fact are required.' });
    
    const foundState = await States.findOne({ refreshToken }).exec();
    if (!foundState) return res.sendStatus(401); //Unauthorized 
    // evaluate stateCode 
                                                //this might cause issues as its the same as above
    const match = await bcrypt.compare(stateCode, foundState.stateCode);
    if (match) {
        const facts = Object.values(foundState.funFact);
        // create JWTs
        const accessToken = jwt.sign(
            {
                //This might also be a problem. Dave had "UserInfo" but it may be the db name??
                "states": {
                    "stateCode": stateCode,
                    //This is an array, not so sure we can just do this
                    "funFacts": funfact
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundState.refreshToken = refreshToken;
        const result = await foundState.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
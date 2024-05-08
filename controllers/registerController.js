const State = require('../model/States');


const handleNewFunFact = async (req, res) => {
    const { statecode, funfact } = req.body;
    if (!statecode || !funfact) return res.status(400).json({ 'message': 'State code and funfact are required.' });
    // check for duplicate usernames in the db
    //db name is StateFunFacts with a collection called states
    const duplicate = await StateFunFacts.states.findOne({stateCode: statecode}).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedSt = await bcrypt.hash(statecode, 10);
        //create store the new state and funfact
        const result = await State.create({
            "stateCode": statecode,
            "funFacts": funfact
        });

        //Different way
        /*
        const newState = new State();
        //Update fields here
        const result = await newState.save();

        OR 

        const newUser = new User({
            stuff
        })

        then save
        */


        console/log(result);

        res.status(201).json({ 'success': `New State, ${statecode}, with fun fact ${funfact} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewFunFact };
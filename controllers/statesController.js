const States = require('../model/States');
const statesData = require('../model/statesData.json');

// Function to get all state data
const getAllStates = async (req, res) => {
    try {
        const states = await States.find();
        res.json(states);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get state data for contiguous states
const getContiguousStates = async (req, res) => {
    try {
        const contiguousStateCodes = [
            'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 
            'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 
            'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 
            'WV', 'WI', 'WY'
        ];
        const contiguousStates = await States.find({ stateCode: { $in: contiguousStateCodes } });
        res.json(contiguousStates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get a random fun fact for a state
const getRandomFunFact = async (req, res) => {
    try {
        const state = await States.findOne({ stateCode: req.params.state });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        const funFacts = state.funFacts;
        if (!funFacts || funFacts.length === 0) {
            return res.status(404).json({ message: 'No fun facts available for this state' });
        }
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        res.json({ funFact: funFacts[randomIndex] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get state capital
const getStateCapital = async (req, res) => {
    try {
        const stateCode = req.params.state;
        const stateInfo = statesData.find(state => state.code === stateCode);
        if (!stateInfo) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json({ state: stateInfo.state, capital: stateInfo.capital }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get state nickname
const getStateNickname = async (req, res) => {
    try {
        const stateCode = req.params.state;
        const stateInfo = statesData.find(state => state.code === stateCode);
        if (!stateInfo) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json({ state: stateInfo.state, nickname: stateInfo.nickname });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get state population
const getStatePopulation = async (req, res) => {
    try {
        const state = await States.findOne({ stateCode: req.params.state });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json({ state: state.stateCode, population: state.population });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get state admission date
const getStateAdmissionDate = async (req, res) => {
    try {
        const state = await States.findOne({ stateCode: req.params.state });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json({ state: state.stateCode, admitted: state.admissionDate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to add a new fun fact for a state
const addFunFact = async (req, res) => {
    try {
        const state = await States.findOne({ stateCode: req.params.state });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        const newFunFact = req.body.funFact;
        if (!newFunFact) {
            return res.status(400).json({ message: 'Fun fact is required' });
        }
        state.funFacts.push(newFunFact);
        await state.save();
        res.status(201).json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update a fun fact for a state
const updateFunFact = async (req, res) => {
    try {
        const state = await States.findOne({ stateCode: req.params.state });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        const index = req.body.index;
        const newFunFact = req.body.funFact;
        if (!index || !newFunFact) {
            return res.status(400).json({ message: 'Index and new fun fact are required' });
        }
        state.funFacts[index - 1] = newFunFact;
        await state.save();
        res.json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to delete a fun fact for a state
const deleteFunFact = async (req, res) => {
    try {
        const state = await States.findOne({ stateCode: req.params.state });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        const index = req.body.index;
        if (!index) {
            return res.status(400).json({ message: 'Index is required' });
        }
        state.funFacts.splice(index - 1, 1);
        await state.save();
        res.json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all data for a state
const getStateData = async (req, res) => {
    try {
        const state = await States.findOne({ stateCode: req.params.state });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAllStates,
    getContiguousStates,
    getRandomFunFact,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmissionDate,
    addFunFact,
    updateFunFact,
    deleteFunFact,
    getStateData
};

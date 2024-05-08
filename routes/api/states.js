const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const verifyStates = require('../../middleware/verifyStates');

// Get all state data
router.get('/', statesController.getAllStates);

// Get state data for contiguous states
router.get('/contiguous', statesController.getContiguousStates);

// Get all data for a state
router.get('/:state', statesController.getStateData);

// Get a random fun fact for a state
router.get('/:state/funfact', verifyStates, statesController.getRandomFunFact);

// Get state capital
router.get('/:state/capital', verifyStates, statesController.getStateCapital);

// Get state nickname
router.get('/:state/nickname', verifyStates, statesController.getStateNickname);

// Get state population
router.get('/:state/population', verifyStates, statesController.getStatePopulation);

// Get state admission date
router.get('/:state/admission', verifyStates, statesController.getStateAdmissionDate);

// Add new fun fact for a state
router.post('/:state/funfact', verifyStates, statesController.addFunFact);

// Update fun fact for a state
router.patch('/:state/funfact', verifyStates, statesController.updateFunFact);

// Delete fun fact for a state
router.delete('/:state/funfact', verifyStates, statesController.deleteFunFact);

module.exports = router;
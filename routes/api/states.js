const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const verifyStates = require('../../middleware/verifyStates');

// Use verifyStates middleware for routes that require state parameter
router.use('/:state', verifyStates);

// Get all state data
router.get('/', statesController.getAllStates);

// Get state data for contiguous states
router.get('/contiguous', statesController.getContiguousStates);

// Get state data by state code
router.get('/:state', statesController.getStateByCode);

// Get a random fun fact for a state
router.get('/:state/funfact', statesController.getRandomFunFact);

// Get state capital
router.get('/:state/capital', statesController.getStateCapital);

// Get state nickname
router.get('/:state/nickname', statesController.getStateNickname);

// Get state population
router.get('/:state/population', statesController.getStatePopulation);

// Get state admission date
router.get('/:state/admission', statesController.getStateAdmissionDate);

// Add new fun fact for a state
router.post('/:state/funfact', statesController.addFunFact);

// Update fun fact for a state
router.patch('/:state/funfact', statesController.updateFunFact);

// Delete fun fact for a state
router.delete('/:state/funfact', statesController.deleteFunFact);

module.exports = router;
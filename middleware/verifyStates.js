console.log("Beginning Middleware!");
// Import required dependencies
const statesData = require('../model/statesData.json');

// Define middleware function
const verifyState = (req, res, next) => {
    // Extract state abbreviation parameter from request
    const stateAbbreviation = req.params.state.toUpperCase(); // Convert to uppercase for consistency

    // Create an array of state abbreviations from the JSON data
    const stateAbbreviations = statesData.map(state => state.abbreviation);

    //Log for debug
    console.log("State Abbreviations:", stateAbbreviations);

    // Check if the state abbreviation is valid
    if (!stateAbbreviations.includes(stateAbbreviation)) {
        // If state abbreviation is not valid, return bad request status with error message
        return res.status(400).json({ error: 'Invalid state abbreviation' });
    }

    // If state abbreviation is valid, set it on the request object
    req.stateAbbreviation = stateAbbreviation;

    // Move to the next middleware or route handler
    next();
};

// Export middleware function
module.exports = verifyState;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema ({
    // State Abbreviations
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    // Fun Facts about states
    funFacts: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('States', stateSchema);

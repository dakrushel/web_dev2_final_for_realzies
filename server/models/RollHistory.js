const mongoose = require('mongoose');

const RollHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    //Assuming there will be user accounts
    },
    //For die types
    rollType: {
        type: String,
        required: true,
    },
    result: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('RollHistory', RollHistorySchema);
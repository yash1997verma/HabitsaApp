const mongoose = require('mongoose');

const habitDateStatusSchema = new mongoose.Schema({
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habit'
    },
    date:{
        type:Date,
    },
    status :{
        type: String,
        enum: ['done', 'not-done', 'none'], // Possible statuses
        default: 'none', // Default status

    }
});

const habitDateStatus = mongoose.model('habitDateStatus', habitDateStatusSchema);

module.exports = habitDateStatus;
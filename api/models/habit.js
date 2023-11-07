//things to save in a habit
//title, weeklyGoal, start date, end date, both are decided by user
// depending on the duration of days user wants to repeat habit, they can set a goal, goal can not be bigger than period decided by user
// user can change the status of any date between the start and end date provided

const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name:{
        type:String,
        // required: true,
        unique: true,
    },
    description: String,
    goal:Number,
    progress: {
        type: Number,
        default: 0 // Initialize the progress to 0 by default
    },
    achieved:Number,
    createdAt:{//defines time when habit was created
        type:Date,
        default: Date.now,
    },
    startDate:{
        type: Date,
        // required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },

    //an array of dates to track habit for each day of the month
    //we will only keep track of dates whose, status were changed, rest remain 'none' status, by default
    habitDateStatus: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'habitDateStatus',
            required:true,
        }
    ],
 
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // }

});


const habit = mongoose.model('habit', habitSchema);

module.exports = habit;
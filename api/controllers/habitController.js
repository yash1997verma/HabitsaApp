const habit = require('../models/habit');
const { format, addDays, startOfMonth, endOfMonth, isWithinInterval } = require('date-fns');

const habitDateStatus = require('../models/habitDateStatus');

//add a new habit
module.exports.addHabit = async (req,res)=>{
    try{
        const newHabit = req.body;
        //returns the added habit
        const newAddedHabit = await habit.create(newHabit);
        //return the new added habit
        res.status(200).json(newAddedHabit);
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get Today habits
module.exports.getTodayHabits = async (req, res) => {
    try {
   
      const today = new Date();

      // Use the date to filter habits
      const habits = await habit.find({
        startDate: { $lte: today },
        endDate: { $gte: today },
      }).populate('habitDateStatus');
  
      res.json(habits);
    } catch (err) {
      console.log(err);
      res.status(500).json(`Error in fetching habits`);
    }
  };


//get weeklyHabits
module.exports.getWeeklyHabits = async(req,res)=>{
   try{
    const {startOfWeek, endOfWeek} = req.query;
    // console.log(startOfWeek, endOfWeek)

    //convert to date objects
    const start = new Date(startOfWeek);
    const end = new Date(endOfWeek);
      
    // Use the date to filter habits, finding habits with any intersection
    const habits = await habit.find({
        startDate: { $lte: end },
        endDate: { $gte: start },
    }).populate('habitDateStatus');
    // console.log(habits)

    res.json(habits);




  
   }catch(err){
    console.log(err);
    res.status(500).json(`Error in fetching habits`);
   }
}

module.exports.editHabit = async(req,res)=>{
    try{
        const newHabit = req.body;
        const {id} = req.params;
       
        //update the existing record, new: true returns the updated doc
        const updatedDoc = await habit.findByIdAndUpdate(id,newHabit, {new: true  })

        res.status(200).json(updatedDoc);
    }catch(err){
        console.log(err);
        res.status(500).json(`Error in editing habits`);
    }
}

//delete habit
module.exports.deleteHabit = async(req, res)=>{
    try {
        const { id } = req.params;

        // Find the habit to get the associated habitDateStatus IDs
        const habitToDelete = await habit.findById(id);

        if (!habitToDelete) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        // Get associated habitDateStatus IDs
        const habitDateStatusIds = habitToDelete.habitDateStatus;

        // Delete the habitDateStatus documents
        await habitDateStatus.deleteMany({ _id: { $in: habitDateStatusIds } });

        // Delete the habit
        const deletedHabit = await habit.findByIdAndDelete(id);

        res.status(200).json(deletedHabit);
    }catch(err){
        console.log(err);
        res.status(500).json(`Error in deleting habits`);
    }
}


//change the state of a habit on a particular date
//we will only save the dates on which the state is done or not-done
//by default value will be none so we will not save that insid the habit data array
module.exports.changeHabitState = async (req, res) => {
    try {
        const dateStatus = req.body;
        const { id } = req.params;
        //find the habit with this id
        const currHabit = await habit.findById(id);

        // console.log(`out: ${dateStatus.status}`)
          //increase progress
            if(dateStatus.status === 'done'){
                currHabit.progress++ ;
                await currHabit.save() ;
            }else if(dateStatus.status ==='not-done' && currHabit.progress>0){
                currHabit.progress--;
                await currHabit.save();
            }//in case of none, no change in progress, 
            //cz not done, always comes fires and it will reduce progress 
     

        
        // Check if a document with the given date and habitId exists
        const existingStatus = await habitDateStatus.findOne({
            habitId: id,
            date: dateStatus.date,
        });

        //if a matching doc of this date and habitiD exist
        if (existingStatus) {
            // Update the status
            existingStatus.status = dateStatus.status;
            await existingStatus.save();
        } else {
            // Create a new document
            const newDateStatus = await habitDateStatus.create({
                habitId: id,
                date: dateStatus.date,
                status: dateStatus.status,
            });
            // update ref in habit
            currHabit.habitDateStatus.push(newDateStatus._id);
            await currHabit.save();
           
        }

        // Return the updated habit
        res.status(200).json(currHabit);
    } catch (err) {
        console.log(err);
        res.status(500).json('Error in updating status');
    }
}



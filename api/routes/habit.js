const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

//create a habit 
router.post('/addHabit', habitController.addHabit);

//get today habits
router.get('/getTodayHabits', habitController.getTodayHabits);

//get all habits
router.get('/getWeeklyHabits', habitController.getWeeklyHabits);

//edit habit
router.put('/editHabit/:id', habitController.editHabit )

//delete a habit
router.delete('/deleteHabit/:id', habitController.deleteHabit)

//update the status of a habit
router.put('/changeHabitState/:id', habitController.changeHabitState);
module.exports = router;
const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController')

router.get('/', (req,res)=>{

    res.json('Welcome to HabitsaAPI');
});

//define other routes
router.use('/habit', require('./habit'));

module.exports = router;
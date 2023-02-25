const express = require('express');
const router = express.Router();

//redirect all questions requests to the questions api route
router.use('/questions', require('./questions'));

//redirect all users requests to the users api route
router.use('/users', require('./users'));


module.exports = router;
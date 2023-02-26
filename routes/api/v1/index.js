const express = require('express');
const router = express.Router();

//redirect all questions requests to the questions api route
router.use('/questions', require('./questions'));

//redirect all users requests to the users api route
router.use('/users', require('./users'));

//redirect all options requests to the options api route
router.use('/options', require('./options'));

module.exports = router;
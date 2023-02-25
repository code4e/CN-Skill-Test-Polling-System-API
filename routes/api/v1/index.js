const express = require('express');
const router = express.Router();

//redirect all questions requests to the questions api route
router.use('/questions', require('./questions'));


module.exports = router;
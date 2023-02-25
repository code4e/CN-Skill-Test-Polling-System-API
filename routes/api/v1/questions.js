const express = require('express');
const router = express.Router();
const questionsController = require('../../../controllers/api/v1/questions_controller');


//create a new question, redirect to questionsController
router.post('/create', questionsController.create);



module.exports = router;
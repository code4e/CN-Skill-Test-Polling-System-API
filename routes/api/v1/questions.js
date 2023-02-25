const express = require('express');
const router = express.Router();
const questionsController = require('../../../controllers/api/v1/questions_controller');
const passport = require('passport');

//create a new question, redirect to questionsController
router.post('/create', questionsController.create);

//get all the questions
router.get('/index',
    //checking that the user who is trying to read the questions is authenticated or not using jwt auth
    passport.authenticate('jwt', { session: false }),
    questionsController.index);



module.exports = router;
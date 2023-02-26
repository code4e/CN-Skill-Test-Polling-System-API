const express = require('express');
const router = express.Router();
const questionsController = require('../../../controllers/api/v1/questions_controller');
const passport = require('passport');

const optionsController = require('../../../controllers/api/v1/options_controller');


//create a new question, redirect to questionsController
router.post('/create',
    //only authenticated user can create a question
    passport.authenticate('jwt', { session: false }),
    questionsController.create);

//get all the questions
router.get('/index',
    //checking that the user who is trying to read the questions is authenticated or not using jwt auth
    passport.authenticate('jwt', { session: false }),
    questionsController.index);



router.use('/:questionID/options',
    //setting up the params explicitally to the req object to access it in further routes
    (req, res, next) => { req.paramsObj = req.params; next(); },
    require('./options')
);

//handle delete question
router.delete('/:questionTBD/delete', 
passport.authenticate('jwt', { session: false }),
questionsController.destroy);


//get a question by id
router.get('/:id', 
passport.authenticate('jwt', { session: false }),
questionsController.read);


module.exports = router;














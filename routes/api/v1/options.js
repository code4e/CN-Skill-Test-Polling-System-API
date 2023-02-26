const express = require('express');
const router = express.Router();
const optionsController = require('../../../controllers/api/v1/options_controller');
const votesController = require('../../../controllers/api/v1/votes_controller');
const passport = require('passport');


//create option under a spefic question, question id has been passed in the params object
router.post('/create',
    passport.authenticate('jwt', { session: false }),
    optionsController.create);

//add vote
router.use('/:optionID/add_vote',
    passport.authenticate('jwt', { session: false }),
    votesController.add);





module.exports = router;
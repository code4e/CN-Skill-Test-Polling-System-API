const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/api/v1/users_controller');
const passport = require('passport');

//create session route
router.post('/create-session',
usersController.createSession);

//sign up user
router.post('/create',
usersController.create);



module.exports = router;
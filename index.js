const express = require('express');
const port = 8080;
const app = express();

//require and configure DOTENV to store and read keys and passwords from a separate .env file
require('dotenv').config();

//require body parser to read body data
const bodyParser = require('body-parser');

//load up mongo config to connect to the db
const db = require('./config/mongoose');

//require passport
const passport = require('passport');

//require passport jwt strategy for authentication using JWT
const passportJWT = require('./config/passport-jwt-strategy');



//use body parser to parse the body and the data inside it
app.use(bodyParser.urlencoded({ extended: true }));


app.use(passport.initialize());

//use express router
app.use('/', require('./routes/index'));




app.listen(port, () => console.log(`Polling System is up and running on port ${port}`));
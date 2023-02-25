const express = require('express');
const port = 8080;
const app = express();
const bodyParser = require('body-parser');

//load up mongo config to connect to the db
const db = require('./config/mongoose');

//use body parser to parse the body and the data inside it
app.use(bodyParser.urlencoded({ extended: true }));


//use express router
app.use('/', require('./routes/index'));

app.listen(port, () => console.log(`Polling System is up and running on port ${port}`));
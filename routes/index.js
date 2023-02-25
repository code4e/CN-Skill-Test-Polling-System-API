const express = require('express');
const router = express.Router();


//set up home route with a welcome message
router.get('/', (req, res) => res.status(200).json({
    message: "Welcome to Polling System API",
    data: {
        description: "You can add a question, create options for it and even vote it too! Enjoy!"
    }
}));


//redirect all api requests to the api routes folder
router.use('/api', require('./api/index'))

module.exports = router;
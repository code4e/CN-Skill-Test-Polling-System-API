const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        }
    ]
}, {
    timestamps: true
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
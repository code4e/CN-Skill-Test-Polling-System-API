const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //question to which this option belongs to
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    vote_count: {
        type: Number,
        default: 0
    },
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vote'
        }
    ],
    //auto generate it dynamically
    link_to_vote: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});


const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
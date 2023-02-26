const mongoose = require('mongoose');


const voteSchema = new mongoose.Schema({
    //the user who voted
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //the option of which this add vote link belongs to
    option: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }
}, {
    timestamps: true
});


const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
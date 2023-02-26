const Option = require('../../../models/option');
const Vote = require('../../../models/vote');
module.exports.add = async (req, res) => {
    let { optionID } = req.params;

    try {
        //check that the option exists
        let option = await Option.findById(optionID);
        if (option) {
            //check that the current user has already voted to this option, if yes, then don't allow revote
            let vote = await Vote.findOne({
                user: req.user,
                option: optionID
            });

            if (vote) {
                //vote exists i.e. current user has voted already, so don't allow revote
                return res.status(409).json({
                    message: "Conflict! You have already voted"
                });
            } else {
                //add the new vote
                let newVote = await Vote.create({
                    user: req.user,
                    option: optionID
                });

                //register this new vote against this option
                option.votes.push(newVote);
                option.vote_count++;

                option.save();

                return res.status(200).json({
                    message: "Thank you! Your vote has been registered"
                });
            }

        } else {
            //option doesn't exist
            return res.status(422).json({
                message: "The specified option doesn't exist, please provide a valid option to vote"
            });
        }

    } catch (error) {

    }
}
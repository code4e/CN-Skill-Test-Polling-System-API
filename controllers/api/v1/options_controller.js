const Question = require('../../../models/question');
const Option = require('../../../models/option');


//create an option
module.exports.create = async (req, res) => {
    try {
        //check if the question under which this option is to be added exists ot not
        let { questionID } = req.paramsObj;
        let { text } = req.body;
        let question = await Question.findById(questionID);

        //handle question doesn't exist
        if (!question) {
            return res.status(404).json({
                message: "Oops! This question does not exist, please provide a valid question ID"
            });
        } else {

            //check if the same option is already there
            let option = await Option.findOne({ text: text.trim() });
            if (option) {
                return res.status(200).json({
                    message: "This option already exists, please add a new one"
                });
            }

            let newOption = await Option.create({ text: text.trim(), question: questionID });

            //dynamically generate the link to vote and save it to the newly created option
            let fullUrl = `${req.protocol}://${req.headers.host}/api/v1/options/${newOption._id}/add_vote`;
            newOption.link_to_vote = fullUrl;
            newOption.save();

            // insert the new option in the question
            let question = await Question.findByIdAndUpdate(questionID);
            question.options.push(newOption);
            question.save();



            return res.status(200).json({
                message: "Option added sucessfully",
                data: {
                    option: {
                        text: newOption.text,
                        question: newOption.question,
                        vote_count: newOption.vote_count,
                        link_to_vote: newOption.link_to_vote
                    }
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Unable to create option! Something went wrong"
        });
    }
}

//delete an option
module.exports.destroy = async (req, res) => {
    const { optionID } = req.params;
    try {

        //check if the option exists or not
        let option = await Option.findById(optionID, { _id: 1, text: 1, question: 1, vote_count: 1, link_to_vote: 1 });

        if (option) {
            //check if there are votes present against this option, if yes, then don't allow deletion
            if (option.vote_count > 0) {
                return res.status(404).json({
                    message: "Requested option cannot be deleted as it holds votes against it"
                });
            } else {
                //if there are no votes, then delete the option and also remove it from the corresponding question
                let question = await Question.findByIdAndUpdate(option.question,
                    //pull out the option from the options array of that question
                    { $pull: { options: optionID } });

                //remove the option
                option.remove();
                return res.status(200).json({
                    message: "Option deleted sucessfully!",
                    data: {
                        option
                    }
                });
            }

        } else {
            return res.status(404).json({
                message: "Resource not found, please provide a valid option ID"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong while deleting this option. Please try again"
        });
    }
}
const Question = require('../../../models/question');
const Option = require('../../../models/option');
const mongoose = require("mongoose");

//get question by id
module.exports.read = async (req, res) => {
    let { id } = req.params;

    try {
        let question = await Question.findById(id).populate("options", "_id text vote_count link_to_vote");
        if(question){
            return res.status(200).json({
                message: "Here is the requested question",
                data: {
                    question
                }
            });
        }else{
            //handle question not found
            return res.status(404).json({
                message: "Requested resource not found"
            });
        }
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong! Please try again",
            data: {}
        });
    }
}


//reading all posts. index is used as an action name when we want to read something
module.exports.index = async (req, res) => {

    try {
        let questions = await Question.find({}, { _id: 1, title: 1, options: 1 })
            //only populate certain fields while fetching the populated document
            .populate("options", "_id text vote_count link_to_vote");
        return res.status(200).json({
            message: "Listing all questions",
            data: {
                questions
            }
        });
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong, unable to fetch questions",
            data: {}
        });
    }


}



module.exports.create = async (req, res) => {

    //perform some base level validations
    let { title } = req.body;
    if (!title || title.length === 0) {
        return res.status(422).json({
            message: "Unprocessable Entity...please enter a valid input"
        });
    }

    try {
        //check if the same question already exists
        let question = await Question.findOne({ title });
        if (question) {
            return res.status(200).json({
                message: "This question has already been asked. Please post a new one"
            });
        } else {
            //create a new question
            let newQuestion = await Question.create({ title });
            // console.log(`New Question created - ${newQuestion}`);
            return res.status(200).json({
                message: "New Question sucessfully created!",
                data: {
                    question: {
                        id: newQuestion._id,
                        title: newQuestion.title,
                        options: newQuestion.options
                    }
                }
            });
        }

    } catch (error) {
        return res.status(404).json({
            message: "Oops! Something went wrong while creating a new question. Please try again",
        });
    }
}

module.exports.destroy = async (req, res) => {
    try {
        //check if the question to be deleted exists or not
        let { questionTBD } = req.params;
        let question = await Question.findById(questionTBD).populate("options", "_id votes");
        if (question) {
            //check if the options under this question have votes to it, if yes, then don't delete it
            let options = await Option.find({
                question,
                //check that the votes size is zero
                votes: { $size: 0 }
            }).select({ _id: 1 });

            //if the options found all have votes size 0, then allow deletion
            if (options.length) {
                // remove all the options under this question
                await Option.deleteMany({ _id: { $in: options } });

                //remove the question
                question.remove();

                return res.status(200).json({
                    message: "Question and all its options deleted sucessfully"
                });

            } else {
                return res.status(401).json({
                    message: "The option(s) under this question have votes to, cannot be deleted"
                });
            }

        } else {
            return res.status(404).json({
                message: "Resource not found",
                data: {}
            });
        }


    } catch (error) {
        return res.status(404).json({
            message: "Oops! Something went wrong while deleting this question. Please try again",
        });
    }
}

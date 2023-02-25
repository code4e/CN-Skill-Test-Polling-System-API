const Question = require('../../../models/question');


//reading all posts. index is used as an action name when we want to read something
module.exports.index = async (req, res) => {

    try {
        let questions = await Question.find({}, { _id: 1, title: 1, options: 1 })
        // .populate("options");
        return res.status(200).json({
            message: "Listing all questions",
            data: {
                questions
            }
        });

    } catch (error) {
        return res.status(404).json({
            message: "Resource not found",
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
            console.log(`New Question created - ${newQuestion}`);
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

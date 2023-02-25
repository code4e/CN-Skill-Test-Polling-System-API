const Question = require('../../../models/question');



module.exports.create = async (req, res) => {

    //perform some base level validations
    let { title } = req.body;
    if(!title || title.length === 0){
        return res.status(422).json({
            message: "Unprocessable Entity...please enter a valid input"
        })
    }


    try {
        //check if the same question already exists
        let question = await Question.findOne({
            title: req.body.title.trim()
        });
        if (question) {
            return res.status(200).json({
                message: "This question has already been asked. Please post a new one"
            });
        } else {
            //create a new question
            let newQuestion = await Question.create({
                title: req.body.title.trim()
            });
            console.log(`New Question created - ${newQuestion}`);
            return res.status(200).json({
                message: "New Question sucessfully created!",
                data: {
                    question: newQuestion
                }
            });
        }

    } catch (error) {
        return res.status(404).json({
            message: "Oops! Something went wrong while creating a new question. Please try again",
        });
    }
}
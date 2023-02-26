const Question = require('../../../models/question');
const Option = require('../../../models/option');

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
            let option = await Option.create({ text, question: questionID });

            //dynamically generate the link to vote and save it to the newly created option
            let fullUrl = `${req.protocol}://${req.headers.host}/api/v1/options/${option._id}/add_vote`;
            option.link_to_vote = fullUrl;
            option.save();

            // insert the new option in the question
            let question = await Question.findByIdAndUpdate(questionID);
            question.options.push(option);
            question.save();

 

            return res.status(200).json({
                message: "Option added sucessfully",
                data: {
                    option: {
                       text: option.text,
                       question: option.question,
                       vote_count: option.vote_count, 
                       link_to_vote: option.link_to_vote
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


module.exports.destroy = (req, res) => {

}
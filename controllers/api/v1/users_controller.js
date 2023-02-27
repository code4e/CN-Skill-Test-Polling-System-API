const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
// fetch the data of signed in user, i.e. create a new session for the user
module.exports.createSession = async (req, res) => {

    //perform basic validations
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json({
            message: "Unprocessable Entity...please enter a valid input"
        });
    }

    //whenever create session request is received, we need to find if the user(email) exists in db and generate the corresponding json web token
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || req.body.password != user.password) {
            //status code 422 means there is an invalid input by the user
            return res.status(422).json({
                message: "Invalid username/password"
            });
        } else {
            return res.status(200).json({
                message: "Signed in sucessfully! Here is your token, please keep it safe.",
                data: {
                    //generate jwt token and send it the user after encrypting it with our secret key
                    token: jwt.sign({
                        data: user.toJSON()
                    },
                        //use the secret key to generate the jwt
                        process.env.SECRET_KEY,
                        { expiresIn: '4h' })
                }
            });
        }
    } catch (error) {
        console.log(`Error occured in creating your session ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports.create = async (req, res) => {
    let { email, password, confirm_password } = req.body;
    //perform base level validations
    if (!email || !password || !confirm_password) {
        return res.status(422).json({
            message: "Unprocessable Entity...please enter a valid input"
        });
    }
    //handle password dont match
    else if (password !== confirm_password) {
        return res.status(422).json({
            message: "Password and Confirm Password should match"
        });
    } else {
        try {
            //check if the user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(409).json({
                    message: "Conflict! This user already exists"
                });
            } else {
                //create a new user in the db
                let newUser = await User.create({ email, password });

                return res.status(200).json({
                    message: "Sign Up successful! Please login to continue",
                    data: {
                        success: `Welcome user - ${email}`
                    }
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error! Failed to Sign Up the user"
            });
        }

    }

}
    
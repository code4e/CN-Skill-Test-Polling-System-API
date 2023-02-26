
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
    // 'polling-system-api'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad.data._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            //user sign in is sucessfull using jwt auth
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}));

// passport.checkAlreadyLoggedIn = (req, res, next) => !req.isAuthenticated() ? next() : res.res(400).json({message: "A user is already logged in!"});



module.exports = passport;

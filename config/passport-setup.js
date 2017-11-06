const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const mongoose = require('mongoose');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null,user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null,user);
  });
});

passport.use(new FacebookStrategy({
    clientID: keys.facebook.appID,
    clientSecret: keys.facebook.appSecret,
    callbackURL: "https://agile-cliffs-42235.herokuapp.com/auth/redirect",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
  }, (accessToken, refreshToken, profile, done) => {
   User.findOne({facebookId: profile._json.id}).then((currentUser) => {
     if(currentUser) {
          // already have the user
          done(null, currentUser);
        }else {
       new User ({
         facebookId    : profile._json.id,
         name          : profile._json.name,
         last_name     : profile._json.last_name,
         first_name    : profile._json.first_name,
         gender        : profile._json.gender,
         picture       : profile._json.picture.data.url
        }).save().then((newUser) => {
            done(null, newUser);
       })
     }
   })
  }
));

const keys = require('../config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) done(null, user);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitter.consumerKey,
      consumerSecret: keys.twitter.consumerSecret,
      callbackURL: keys.twitter.callbackURL
    },
    async (token, tokenSecret, profile, cb) => {
      const registeredUser = await User.findOne({ twitterId: profile.id });
      if (registeredUser) {
        return cb(null, registeredUser);
      }
      const newUser = await new User({ twitterId: profile.id }).save();
      cb(null, newUser);
    }
  )
);

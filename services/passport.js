const keys = require('../config/keys');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const knex = require('../db/knex');

// const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const fetchUser = await knex
    .select()
    .from('users')
    .where({ _id: id });
  if (fetchUser.length) done(null, fetchUser[0]);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitter.consumerKey,
      consumerSecret: keys.twitter.consumerSecret,
      callbackURL: keys.twitter.callbackURL
    },
    async (token, tokenSecret, profile, cb) => {
      try {
        const fetchUser = await knex
          .select('_id')
          .from('users')
          .where({ twitter_id: profile.id.toString() });
        if (fetchUser.length) {
          const user = fetchUser[0];
          return cb(null, user);
        }
        const newUser = await knex('users')
          .insert({
            twitter_id: profile.id.toString()
          })
          .returning('_id');
        if (newUser.length) return cb(null, newUser[0]);
      } catch (err) {
        console.log(err);
        cb(err);
      }
    }
  )
);

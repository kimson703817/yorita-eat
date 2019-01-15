const passport = require('passport');
const router = require('express').Router();

router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('callback success');
    res.send('welcome yoshino');
  }
);

module.exports = router;

const passport = require('passport');
const router = require('express').Router();
const clientURI = require('../config/keys').clientURI;

router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectURI = clientURI + '/discover/joy';
    res.redirect(redirectURI);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;

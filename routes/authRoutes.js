const passport = require('passport');
const router = require('express').Router();
const clientURI = require('../config/keys').clientURI;
const jwt = require('jsonwebtoken');
const knex = require('../db/knex');

router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectURI = clientURI + '/eatery/discover';
    res.redirect(redirectURI);
  }
);

router.post('/register', (req, res) => {
  res.send('hello world');
});

router.get('/login', (req, res) => {
  res.send('signing in');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;

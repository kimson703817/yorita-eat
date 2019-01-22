/** NPM modules **/

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();
const express = require('express');

const passport = require('passport');

/** HELPER modules **/

const keys = require('./config/keys');
const routes = require('./routes/routes');

// Initialize app and connect database
const app = express();

// Initialize services
require('./services/passport');

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', routes.auth);
app.use('/api/eatery', routes.eatery);

app.get('/', (req, res) => {
  res.send('seki hiromi');
});

const port = process.env.PORT || 5000;
app.listen(port);

/** NPM modules **/

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

/** HELPER modules **/

const keys = require('./config/keys');
const models = require('./models/models');
const routes = require('./routes/routes');

// Initialize app and connect database
mongoose.connect(keys.mongoURI);
const app = express();

// Initialize models and services
models.user();
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

app.get('/', (req, res) => {
  res.send('seki hiromi');
});

const port = process.env.PORT || 5000;
app.listen(port);

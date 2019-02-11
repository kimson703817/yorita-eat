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
app.use('/api/resource', routes.resource);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // such as main.js or main.css
  app.use(express.static('client/build'));

  // Express will serve the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port);

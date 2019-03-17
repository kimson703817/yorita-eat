const auth = require('./authRoutes');
const eatery = require('./eateryRoutes');
const order = require('./orderRoutes');
const payment = require('./paymentRoutes');
const resource = require('./resourceRoutes');

module.exports = {
  auth,
  eatery,
  order,
  payment,
  resource
};

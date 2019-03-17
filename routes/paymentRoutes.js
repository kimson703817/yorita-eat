const knex = require('../db/knex');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.payment.stripeSK);

router.post('/api/stripe', requireLogin, async (req, res) => {
  const { amount, currency, description, source } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      source
    });
    const redirectURI = clientURI;
    res.status(200).redirect(redirectURI);
  } catch (err) {
    res.status(err.status || 400).send(err);
  }
});

module.exports = router;

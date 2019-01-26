const knex = require('../db/knex');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();

router.get('/testing', (req, res) => {
  res.send('Sunshine See May');
});

router.put('/add', requireLogin, async (req, res) => {
  const { name } = req.body;
  const owner_id = req.user._id;

  try {
    const res_id = await knex('eateries')
      .insert({ name, owner_id })
      .returning('_id');
    res.send(res_id);
  } catch (err) {
    res.status(err.status || 422).send(err);
  }
});

module.exports = router;

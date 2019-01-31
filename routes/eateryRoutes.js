const knex = require('../db/knex');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();

router.get('/testing', (req, res) => {
  res.send('Sunshine See May');
});

router.put('/add', requireLogin, async (req, res) => {
  const { name, streetAddr, city, state, zipcode, areaCode, phone } = req.body;
  const owner_id = req.user._id;

  try {
    const db_res = await knex('eateries')
      .insert({
        owner_id,
        name,
        streetAddr,
        city,
        state,
        zipcode,
        areaCode,
        phone
      })
      .returning([
        '_id',
        'name',
        'streetAddr',
        'city',
        'state',
        'zipcode',
        'areaCode',
        'phone'
      ]);
    res.status(201).send(db_res[0]);
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
});

module.exports = router;

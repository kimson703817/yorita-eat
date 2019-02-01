const knex = require('../db/knex');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db_res = await knex('eateries')
      .select()
      .where({ _id: id });
    if (db_res.length) return res.send(db_res[0]);
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
  res.status(404).send('This restaurant does not exist.');
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
        'owner_id',
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

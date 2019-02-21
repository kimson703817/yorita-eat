const knex = require('../db/knex');
const isOwner = require('../middlewares/isOwner');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();
const { deleteResourceObject } = require('../middlewares/s3_manager');
const keys = require('../config/keys');

// Helpers
const generateResourceUrl = key => {
  if (key) return `${keys.storageServiceProvider}/${keys.S3.Bucket}/${key}`;
  return keys.placeholderImages.restaurantIcon;
};

const getEateryDataFromBody = body => {
  return {
    name: body.name,
    streetAddr: body.streetAddr,
    city: body.city,
    state: body.state,
    zipcode: body.zipcode,
    areaCode: body.areaCode,
    phone: body.phone,
    icon_imageKey: body.icon_imageKey
  };
};

const getMenuDataFromBody = body => {
  return {
    eateries_id: body.eateries_id,
    name: body.name,
    price: body.price
  };
};

// Router functions

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db_res = await knex('eateries')
      .select()
      .where({ _id: id });
    if (db_res.length) {
      db_res[0].icon_imageUrl = generateResourceUrl(db_res[0].icon_imageKey);

      return res.send(db_res[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
  res.status(404).send('This restaurant does not exist.');
});

router.put('/add', requireLogin, async (req, res) => {
  const bodyInfo = getEateryDataFromBody(req.body);
  const owner_id = req.user._id;
  const objectToInsert = { ...bodyInfo, owner_id };

  try {
    const db_res = await knex('eateries')
      .insert(objectToInsert)
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

router.put(
  '/update',
  requireLogin,
  async (req, res, next) => {
    const { _id, old_imageKey } = req.body;
    req.body.s3_bucketKey = old_imageKey;
    const userId = req.user._id;
    const objectToUpdate = getEateryDataFromBody(req.body);

    try {
      const db_res = await knex('eateries')
        .where({ _id, owner_id: userId })
        .update(objectToUpdate)
        .returning([
          'owner_id',
          '_id',
          'name',
          'streetAddr',
          'city',
          'state',
          'zipcode',
          'areaCode',
          'phone',
          'icon_imageKey'
        ]);
      db_res[0].icon_imageUrl = generateResourceUrl(db_res[0].icon_imageKey);
      db_res[0].user_id = userId;
      res.status(200).send(db_res[0]);
      next();
    } catch (err) {
      console.log(err);
      res.status(err.status || 422).send(err);
    }
  },
  deleteResourceObject
);

router.put('/menu', requireLogin, isOwner, async (req, res, next) => {
  const objectToInsert = getMenuDataFromBody(req.body);

  try {
    const db_res = await knex('menuItems')
      .insert(objectToInsert)
      .returning(['name', 'price']);
    res.status(201).send(db_res[0]);
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
});

module.exports = router;

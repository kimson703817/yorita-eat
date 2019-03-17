const knex = require('../db/knex');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();
const { deleteResourceObject } = require('../middlewares/s3_manager');
const keys = require('../config/keys');

// Helpers
const generateResourceUrl = key => {
  if (key) return `${keys.storageServiceProvider}/${keys.S3.Bucket}/${key}`;
  return keys.placeholderImages.restaurantIcon;
};

const s3_appendUrl = items => ({
  items,
  cloudUrl: `${keys.storageServiceProvider}/${keys.S3.Bucket}`
});

const getEateryDataFromBody = body => {
  const {
    name,
    address,
    city,
    state,
    zipcode,
    area_code,
    phone,
    key_icon
  } = body;

  if (key_icon) {
    return {
      name,
      address,
      city,
      state,
      zipcode,
      area_code,
      phone,
      key_icon
    };
  }

  return {
    name,
    address,
    city,
    state,
    zipcode,
    area_code,
    phone
  };
};

const getMenuDataFromBody = body => {
  const { eateries_id, name, price, key_img } = body;
  if (key_img) {
    return {
      eateries_id,
      name,
      price,
      key_img
    };
  }

  return {
    eateries_id,
    name,
    price
  };
};

/* Router Functions */

/** FETCH RESTAURANT using id**/

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const db_res = await knex('eateries')
      .select()
      .where({ id });
    if (db_res.length) {
      db_res[0].icon_imageUrl = generateResourceUrl(db_res[0].key_icon);

      return res.send(db_res[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
  res.status(404).send('This restaurant does not exist.');
});

/** ADD RESTAURANT **/

router.put('/add', requireLogin, async (req, res) => {
  const bodyInfo = getEateryDataFromBody(req.body);
  const owner_id = req.user._id;

  // insert owner_id into the new database entry
  let object = { ...bodyInfo, owner_id };

  try {
    const db_res = await knex('eateries')
      .insert(object)
      .returning([
        'owner_id',
        'id',
        'name',
        'address',
        'city',
        'state',
        'zipcode',
        'area_code',
        'phone'
      ]);
    res.status(201).send(db_res[0]);
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
});

/** UPDATE RESTAURANT if owner_id and req.user.id matches **/

router.put(
  '/update',
  requireLogin,
  async (req, res, next) => {
    const { id, key_OLD } = req.body;

    // remove old image icon on S3
    req.body.s3_bucketKey = key_OLD;

    const userId = req.user._id;
    let object = getEateryDataFromBody(req.body);

    try {
      const db_res = await knex('eateries')
        .where({ id, owner_id: userId })
        .update(object)
        .returning([
          'owner_id',
          'id',
          'name',
          'address',
          'city',
          'state',
          'zipcode',
          'area_code',
          'phone',
          'key_icon'
        ]);
      db_res[0].icon_imageUrl = generateResourceUrl(db_res[0].key_icon);
      db_res[0].user_id = userId;
      res.status(200).send(db_res[0]);
      if (key_OLD) next();
    } catch (err) {
      console.log(err);
      res.status(err.status || 422).send(err);
    }
  },
  deleteResourceObject
);

router.get('/menu/:id', async (req, res) => {
  const eateries_id = req.params.id;

  try {
    const db_res = await knex('menu_items')
      .select('id', 'name', 'price', 'key_img')
      .where({ eateries_id });

    const data = s3_appendUrl(db_res);
    return res.send(data);
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
  res.status(404).send('This restaurant does not exist.');
});

router.put('/menu', requireLogin, async (req, res) => {
  let object = getMenuDataFromBody(req.body);

  try {
    const db_res = await knex('menu_items')
      .insert(object)
      .returning(['id', 'name', 'price', 'key_img']);
    res.status(201).send(db_res[0]);
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
});

router.put('/menu/update', requireLogin, async (req, res, next) => {
  let object = getMenuDataFromBody(req.body);
  const { key_OLD } = req.body;
  req.body.s3_bucketKey = key_OLD;

  try {
    const db_res = await knex('menu_items')
      .where({ name, eateries_id: object.eateries_id })
      .update(object)
      .returning(['name', 'price', 'key_img']);
    const data = s3_appendUrl(db_res);
  } catch (err) {
    console.log(err);
    res.status(err.status || 422).send(err);
  }
});

module.exports = router;

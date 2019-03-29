const knex = require('../db/knex');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();
const { deleteResourceObject } = require('../middlewares/s3_manager');
const keys = require('../config/keys');

const getInfoFromBody = req => {
  const { eateries_id, note } = req.body.metadata;
  const customer_id = req.user ? req.user._id : null;
  return {
    eateries_id,
    note,
    customer_id
  };
};

const getInsertArray = (req, order_id) => {
  const { items } = req.body;
  return items.map(({ id, quantity }) => {
    return {
      order_id,
      item_id: id,
      quantity: quantity
    };
  });
};

/* Router Functions */

router.get('/', (req, res) => {
  res.send('wassup man');
});

router.post('/', async (req, res) => {
  const order = getInfoFromBody(req);

  try {
    const orderRes = await knex.transaction(async trx => {
      const newOrder = await trx.insert(order, 'id').into('restaurant_orders');
      const items = getInsertArray(req, newOrder[0]);

      const insertRes = await trx.insert(items).into('food_orders');
      res.status(201).send(insertRes[0]);
    });
  } catch (error) {
    console.log(error);
    res.status(err.status || 500);
  }
});

module.exports = router;

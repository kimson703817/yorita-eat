const knex = require('../db/knex');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();
const { deleteResourceObject } = require('../middlewares/s3_manager');
const keys = require('../config/keys');

const getInfoFromBody = req => {
  const { eateries_id, note, subtotal } = req.body.data;
  const customer_id = req.user ? req.user._id : null;
  return {
    eateries_id,
    note,
    customer_id,
    total: subtotal
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

router.get('/history/user', async (req, res) => {
  try {
    // const orderHistory = await knex
    //   .select(
    //     'restaurant_orders.id',
    //     'food_orders.item_id',
    //     'food_orders.quantity'
    //   )
    //   .from('restaurant_orders')
    //   .innerJoin('food_orders', 'restaurant_orders.id', 'food_orders.order_id')
    //   .where('restaurant_orders.customer_id', req.user._id);

    const orderHistory = await knex('restaurant_orders')
      .innerJoin('food_orders', 'restaurant_orders.id', 'food_orders.order_id')
      .select(
        'restaurant_orders.id',
        knex.raw(`
          ARRAY_AGG(
            json_build_object(
              \'itemID:\', food_orders.item_id,
              \'itemQty:\', food_orders.quantity
            )
          ) AS items`),
        'restaurant_orders.total'
      )
      .where('restaurant_orders.customer_id', req.user._id)
      .groupBy('restaurant_orders.id');
    res.send(orderHistory);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500);
  }
});

router.post('/food', async (req, res) => {
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

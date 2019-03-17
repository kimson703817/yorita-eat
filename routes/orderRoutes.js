const knex = require('../db/knex');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();
const { deleteResourceObject } = require('../middlewares/s3_manager');
const keys = require('../config/keys');

const getInfoFromBody = () => {
  const { eateries_id, note, total } = req.body;
  const customer_id = req.user._id;
  return {
    eateries_id,
    note,
    total,
    customer_id
  };
};

const getInsertArray = order_id => {
  const { items } = req.body;
  return items.map(item_id => {
    return {
      item_id,
      order_id
    };
  });
};

/* Router Functions */

router.post('/', async (req, res) => {
  const order = getInfoFromBody();

  try {
    const orderRes = await knex.transaction(async trx => {
      const newOrder = await trx.insert(order, 'id').into('restaurant_orders');
      const items = getInsertArray(newOrder[0]);

      const insertRes = await trx.insert(items, 'id').into('food_orders');
      res.status(201).send(insertRes[0]);
    });
  } catch (error) {
    console.log(error);
    res.status(err.status || 500);
  }
});

module.exports = router;

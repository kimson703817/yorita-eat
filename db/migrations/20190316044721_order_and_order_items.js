exports.up = (knex, Promise) =>
  knex.schema
    .createTable('restaurant_orders', table => {
      table.uuid('customer_id');
      table.foreign('customer_id').references('users._id');

      table
        .integer('eateries_id')
        .unsigned()
        .notNullable();
      table.foreign('eateries_id').references('eateries.id');

      table.increments('id');
      table.text('note');
      table.float('total');
    })
    .createTable('food_orders', table => {
      table
        .integer('order_id')
        .unsigned()
        .notNullable();
      table.foreign('order_id').references('restaurant_orders.id');

      table
        .integer('item_id')
        .unsigned()
        .notNullable();
      table.foreign('item_id').references('menu_items.id');

      table
        .integer('quantity')
        .unsigned()
        .notNullable();
    });

exports.down = (knex, Promise) =>
  knex.schema.dropTable('food_orders').dropTable('restaurant_orders');

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

      // additions
      // Excellent - 5, Very Good - 4, Decent - 3, No strong feeling - 2, Bad - 1
      table
        .datetime('order_date')
        .notNullable()
        .defaultTo(knex.fn.now());
      table.decimal('total', 12, 2);
      table.decimal('service_rating');
      table.text('feedback');
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

      // additions
      table.text('feedback');
      table.float('rating');
    });

exports.down = (knex, Promise) =>
  knex.schema.dropTable('food_orders').dropTable('restaurant_orders');

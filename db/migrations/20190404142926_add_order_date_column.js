exports.up = (knex, Promise) =>
  knex.schema.table('restaurant_orders', table => {
    table
      .datetime('order_date')
      .notNullable()
      .defaultTo(knex.fn.now());
  });

exports.down = (knex, Promise) =>
  knex.schema.table('restaurant_orders', table => {
    table.dropColumn('order_date');
  });

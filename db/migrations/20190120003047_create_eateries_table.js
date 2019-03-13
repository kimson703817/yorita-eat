exports.up = (knex, Promise) =>
  knex.schema
    .createTable('eateries', table => {
      table.uuid('owner_id').notNullable();
      table.foreign('owner_id').references('users._id');

      table.increments('id');
      table.string('name').notNullable();
      table.string('address');
      table.string('city');
      table.string('state');
      table.string('zipcode');
      table.string('area_code');
      table.string('phone');
      table.string('key_icon');
      table.float('rating');
      table.text('feedback');
    })
    .createTable('menu_items', table => {
      table
        .integer('eateries_id')
        .unsigned()
        .notNullable();
      table.foreign('eateries_id').references('eateries.id');

      table.increments('id');
      table.string('name').notNullable();
      table.decimal('price').notNullable();
      table.string('key_img');
      table.text('feedback');
      table.float('rating');

      table.unique('name', 'eateries_id');
    });

exports.down = (knex, Promise) =>
  knex.schema.dropTable('menu_items').dropTable('eateries');

exports.up = (knex, Promise) =>
  knex.schema
    .createTable('eateries', eateries => {
      eateries.increments('_id');
      eateries.uuid('owner_id').notNullable();
      eateries.foreign('owner_id').references('users._id');
      eateries.string('name').notNullable();
      eateries.string('streetAddr');
      eateries.string('city');
      eateries.string('state');
      eateries.string('zipcode');
      eateries.string('areaCode');
      eateries.string('phone');
    })
    .createTable('chainLocations', chainLocations => {
      chainLocations
        .integer('eateries_id')
        .unsigned()
        .notNullable();
      chainLocations.foreign('eateries_id').references('eateries._id');
      chainLocations.string('streetAddr').notNullable();
      chainLocations.string('city').notNullable();
      chainLocations.string('state').notNullable();
      chainLocations.string('zipcode').notNullable();
      chainLocations.string('areaCode');
      chainLocations.string('phone');
    })
    .createTable('menuItems', menuItems => {
      menuItems.increments('id');
      menuItems
        .integer('eateries_id')
        .unsigned()
        .notNullable();
      menuItems.foreign('eateries_id').references('eateries._id');
      menuItems.string('name').notNullable();
      menuItems.decimal('price').notNullable();
    });

exports.down = (knex, Promise) =>
  knex.schema
    .dropTable('menuItems')
    .dropTable('chainLocations')
    .dropTable('eateries');

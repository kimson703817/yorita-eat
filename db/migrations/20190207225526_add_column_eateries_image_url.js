exports.up = (knex, Promise) =>
  knex.schema.table('eateries', table => {
    table.string('icon_imageKey');
  });

exports.down = (knex, Promise) =>
  knex.schema.table('eateries', table => {
    table.dropColumn('icon_imageKey');
  });

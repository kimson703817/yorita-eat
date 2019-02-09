exports.up = (knex, Promise) =>
  knex.schema.table('eateries', table => {
    table.string('icon_image_file');
  });

exports.down = (knex, Promise) =>
  knex.schema.table('eateries', table => {
    table.dropColumn('icon_image_file');
  });

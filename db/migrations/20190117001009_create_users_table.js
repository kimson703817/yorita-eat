exports.up = (knex, Promise) =>
  knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() =>
    knex.schema.createTable('users', table => {
      table
        .uuid('_id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('twitter_id').unique();
      table.string('google_id').unique();
      table.string('facebook_id').unique();
    })
  );

exports.down = (knex, Promise) =>
  knex.schema
    .dropTable('users')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));

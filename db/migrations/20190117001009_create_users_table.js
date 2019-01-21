exports.up = (knex, Promise) =>
  knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() =>
    knex.schema.createTable('users', users => {
      users
        .uuid('_id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      users.string('twitter_id').unique();
      users.string('google_id').unique();
      users.string('facebook_id').unique();
      users.boolean('isOwner').defaultTo(false);
    })
  );

exports.down = (knex, Promise) =>
  knex.schema
    .dropTable('users')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));

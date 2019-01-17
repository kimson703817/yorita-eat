const keys = require('./config/keys');

module.exports = {
  development: {
    client: 'pg',
    connection: keys.pgURI,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};

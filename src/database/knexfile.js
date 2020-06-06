const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });

module.exports = {
  client: 'mysql',
  connection: {
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
  },
  port: 80,
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: path.join(__dirname, './seeds/'),
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, './migrations/'),
  },

};

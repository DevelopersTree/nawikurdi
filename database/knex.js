
const db = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    debug: false,
  },
});

module.exports = db;

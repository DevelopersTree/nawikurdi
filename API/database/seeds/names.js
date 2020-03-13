const namesJson = require('./names.json');
exports.seed = (knex) => knex('names').del()
    .then(() => knex('names').insert(namesJson));

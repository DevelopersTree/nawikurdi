
exports.up = (knex) => knex.schema.createTable('names', (table) => {
  table.increments('nameid').primary();
  table.string('name', 350).notNullable().defaultTo('default name');
  table.string('desc', 350).defaultTo('');
  table.enu('gender', ['M','F','O']).defaultTo('O');
  table.boolean('sended').notNullable().defaultTo(0);
  table.boolean('deleted').notNullable().defaultTo(0);
  table.boolean('activated').notNullable().defaultTo(0);
  table.integer('positive_votes').notNullable().defaultTo(0);    
  table.integer('negative_votes').notNullable().defaultTo(0);    
  table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now());
  table.charset('utf8');
  table.collate('utf8_general_ci');
});

exports.down = (knex) => knex.schema.dropTable('names');

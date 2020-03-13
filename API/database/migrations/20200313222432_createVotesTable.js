
exports.up = (knex) => knex.schema.createTable('votes', (table) => {
    table.increments('id').primary();
    table.string('uid', 350).notNullable().defaultTo('default user id');
    table.integer('nameid').notNullable().defaultTo(0);    
    table.enu('impact', ['positive','negative']).defaultTo('negative');
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now());
    table.charset('utf8');
    table.collate('utf8_general_ci');
  });
  
  exports.down = (knex) => knex.schema.dropTable('votes');
  
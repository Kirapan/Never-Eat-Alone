exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_needs', function(table) {
    table.integer('user_id').references('id').inTable('users');
    table.integer('need_id').references('id').inTable('offers_needs');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_needs')
};

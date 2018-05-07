exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_industries', function(table) {
    table.integer('user_id').references('id').inTable('users');
    table.integer('industry_id').references('id').inTable('industries');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_industries')
};
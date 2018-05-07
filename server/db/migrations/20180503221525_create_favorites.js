exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table) {
    table.integer('favoritor_id').references('id').inTable('users');
    table.integer('favoritee_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites')
};
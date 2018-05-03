exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name');
    table.string('email');
    table.string('image');
    table.string('password');
    table.integer('industry_id').references('id').inTable('industries');
    table.string('company');
    table.string('location');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
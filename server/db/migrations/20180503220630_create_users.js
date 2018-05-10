exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name');
    table.string('email');
    table.string('image');
    table.string('password_digest').notNull();
    table.integer('industry_id').references('id').inTable('industries');
    table.string('company');
    table.string('address');
    table.string('location');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
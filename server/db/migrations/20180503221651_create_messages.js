exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments();
    table.string('content');
    table.integer('from_user_id').references('id').inTable('users');
    table.integer('to_user_id').references('id').inTable('users');
    table.boolean('read');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages')
};
exports.seed = function(knex, Promise) {
  return knex('industries').del()
    .then(function() {
        return knex('industries').del();
      })
    .then(function () {
      return Promise.all([
        knex('industries').insert({title: 'IT'}),
        knex('industries').insert({title: 'Finance'}),
        knex('industries').insert({title: 'Marketing'})
      ]);
    })
    .then(function() {
        return knex('users').del();
      })
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Alice', email: 'Alice@gmail.com', image: '', password_digest: 'test', industry_id: 1,
          company: 'Google', location: '46 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Mark', email: 'Mark@gmail.com', image: '', password_digest: 'test', industry_id: 1,
          company: 'Amazon', location: '50 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Paul', email: 'Paul@gmail.com', image: '', password_digest: 'test', industry_id: 2,
          company: 'Scotiabank', location: '55 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Grace', email: 'Grace@gmail.com', image: '', password_digest: 'test', industry_id: 2,
          company: 'TD', location: '10 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Tom', email: 'Tom@gmail.com', image: '', password_digest: 'test', industry_id: 2,
          company: 'BMO', location: '100 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Christine', email: 'Christine@gmail.com', image: '', password_digest: 'test', industry_id: 3,
          company: 'FUZE', location: '150 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Eva', email: 'Eva@gmail.com', image: '', password_digest: 'test', industry_id: 3,
          company: 'Zync', location: '200 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Jack', email: 'Jack@gmail.com', image: '', password_digest: 'test', industry_id: 3,
          company: 'Eighty-Eight', location: '250 Spadina Ave, Toronto, ON M5V 2H8'})
      ]);
    })
    .then(function() {
        return knex('offers_needs').del();
      })
    .then(function () {
      return Promise.all([
        knex('offers_needs').insert({title: 'Career advice'}),
        knex('offers_needs').insert({title: 'Coaching'}),
        knex('offers_needs').insert({title: 'Industry advice'})
      ]);
    })
    .then(function() {
        return knex('messages').del();
      })
    .then(function () {
      return Promise.all([
        knex('messages').insert({content: "Hello there!", from_user_id: 1, to_user_id: 2, read: false }),
        knex('messages').insert({content: "How are you?", from_user_id: 2, to_user_id: 1, read: false }),
        knex('messages').insert({content: "Great idea!", from_user_id: 3, to_user_id: 2, read: false })
      ]);
    })
    .then(function() {
        return knex('users_offers').del();
      })
    .then(function () {
      return Promise.all([
        knex('users_offers').insert({user_id: 1, offer_id: 1}),
        knex('users_offers').insert({user_id: 1, offer_id: 2}),
        knex('users_offers').insert({user_id: 2, offer_id: 3}),
        knex('users_offers').insert({user_id: 3, offer_id: 3}),
        knex('users_offers').insert({user_id: 3, offer_id: 2}),
        knex('users_offers').insert({user_id: 4, offer_id: 1}),
        knex('users_offers').insert({user_id: 5, offer_id: 1}),
        knex('users_offers').insert({user_id: 6, offer_id: 3}),
        knex('users_offers').insert({user_id: 6, offer_id: 2})
      ]);
    })
    .then(function() {
        return knex('users_needs').del();
    })
    .then(function () {
      return Promise.all([
        knex('users_needs').insert({user_id: 1, need_id: 1}),
        knex('users_needs').insert({user_id: 2, need_id: 2}),
        knex('users_needs').insert({user_id: 3, need_id: 3}),
        knex('users_needs').insert({user_id: 4, need_id: 3}),
        knex('users_needs').insert({user_id: 5, need_id: 2}),
        knex('users_needs').insert({user_id: 6, need_id: 1}),
        knex('users_needs').insert({user_id: 7, need_id: 1}),
        knex('users_needs').insert({user_id: 8, need_id: 3}),
        knex('users_needs').insert({user_id: 8, need_id: 2})
      ]);
    })
    .then(function() {
        return knex('users_industries').del();
      })
    .then(function () {
      return Promise.all([
        knex('users_industries').insert({user_id: 1, industry_id: 1}),
        knex('users_industries').insert({user_id: 2, industry_id: 2}),
        knex('users_industries').insert({user_id: 3, industry_id: 3}),
        knex('users_industries').insert({user_id: 4, industry_id: 3}),
        knex('users_industries').insert({user_id: 4, industry_id: 2}),
        knex('users_industries').insert({user_id: 6, industry_id: 1}),
        knex('users_industries').insert({user_id: 7, industry_id: 1}),
        knex('users_industries').insert({user_id: 7, industry_id: 3}),
        knex('users_industries').insert({user_id: 8, industry_id: 2})
      ]);
    })
    .then(function() {
        return knex('favorites').del();
      })
    .then(function () {
      return Promise.all([
        knex('favorites').insert({favoritor_id: 1, favoritee_id: 2}),
        knex('favorites').insert({favoritor_id: 1, favoritee_id: 7}),
        knex('favorites').insert({favoritor_id: 2, favoritee_id: 6}),
        knex('favorites').insert({favoritor_id: 3, favoritee_id: 1}),
        knex('favorites').insert({favoritor_id: 4, favoritee_id: 2}),
        knex('favorites').insert({favoritor_id: 5, favoritee_id: 3}),
        knex('favorites').insert({favoritor_id: 6, favoritee_id: 4}),
        knex('favorites').insert({favoritor_id: 6, favoritee_id: 5}),
        knex('favorites').insert({favoritor_id: 8, favoritee_id: 6})
      ]);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('favorites')
  .then(function() {
    return knex.schema.dropTableIfExists('users_industries');
    })
  .then(function() {
    return knex.schema.dropTableIfExists('users_offers_seeks');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('users_offers_needs');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('messages');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('offers');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('industries');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('users');
  });
};

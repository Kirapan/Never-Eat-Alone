exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Alice', email: 'Alice@gmail.com', image: '', password: 'test', industry: 1,
          company: 'Google', Location: '46 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Mark', email: 'Mark@gmail.com', image: '', password: 'test', industry: 1,
          company: 'Amazon', Location: '50 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Paul', email: 'Paul@gmail.com', image: '', password: 'test', industry: 2,
          company: 'Scotiabank', Location: '55 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Grace', email: 'Grace@gmail.com', image: '', password: 'test', industry: 2,
          company: 'TD', Location: '10 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Tom', email: 'Tom@gmail.com', image: '', password: 'test', industry: 2,
          company: 'BMO', Location: '100 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Christine', email: 'Christine@gmail.com', image: '', password: 'test', industry: 3,
          company: 'FUZE', Location: '150 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Eva', email: 'Eva@gmail.com', image: '', password: 'test', industry: 3,
          company: 'Zync', Location: '200 Spadina Ave, Toronto, ON M5V 2H8'}),
        knex('users').insert({name: 'Jack', email: 'Jack@gmail.com', image: '', password: 'test', industry: 3,
          company: 'Eighty-Eight', Location: '250 Spadina Ave, Toronto, ON M5V 2H8'})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('industries').insert({title: 'IT'}),
        knex('industries').insert({title: 'Finance'}),
        knex('industries').insert({title: 'Marketing'})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('offers').insert({title: 'Career advice'}),
        knex('offers').insert({title: 'Coaching'}),
        knex('offers').insert({title: 'Industry advice'})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('messages').insert({content: "Hello there!", from_user_id: 1, to_user_id: 2, read: false }),
        knex('messages').insert({content: "How are you?", from_user_id: 2, to_user_id: 1, read: false }),
        knex('messages').insert({content: "Great idea!", from_user_id: 3, to_user_id: 2, read: false })
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('users_offers_needs').insert({user_id: 1, offer_id: 1}),
        knex('users_offers_needs').insert({user_id: 1, offer_id: 2}),
        knex('users_offers_needs').insert({user_id: 2, offer_id: 3}),
        knex('users_offers_needs').insert({user_id: 3, offer_id: 3}),
        knex('users_offers_needs').insert({user_id: 3, offer_id: 2}),
        knex('users_offers_needs').insert({user_id: 4, offer_id: 1}),
        knex('users_offers_needs').insert({user_id: 5, offer_id: 1}),
        knex('users_offers_needs').insert({user_id: 6, offer_id: 3}),
        knex('users_offers_needs').insert({user_id: 6, offer_id: 2})
      ]);
    })
    .then(function () {
      return Promise.all([
        knex('users_offers_seeks').insert({user_id: 1, seeker_id: 1}),
        knex('users_offers_seeks').insert({user_id: 2, seeker_id: 2}),
        knex('users_offers_seeks').insert({user_id: 3, seeker_id: 3}),
        knex('users_offers_seeks').insert({user_id: 4, seeker_id: 3}),
        knex('users_offers_seeks').insert({user_id: 5, seeker_id: 2}),
        knex('users_offers_seeks').insert({user_id: 6, seeker_id: 1}),
        knex('users_offers_seeks').insert({user_id: 7, seeker_id: 1}),
        knex('users_offers_seeks').insert({user_id: 8, seeker_id: 3}),
        knex('users_offers_seeks').insert({user_id: 8, seeker_id: 2})
      ]);
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
    .then(function () {
      return Promise.all([
        knex('favorites').insert({user_id: 1, favorite_id: 2}),
        knex('favorites').insert({user_id: 1, favorite_id: 7}),
        knex('favorites').insert({user_id: 2, favorite_id: 6}),
        knex('favorites').insert({user_id: 3, favorite_id: 1}),
        knex('favorites').insert({user_id: 4, favorite_id: 2}),
        knex('favorites').insert({user_id: 5, favorite_id: 3}),
        knex('favorites').insert({user_id: 6, favorite_id: 4}),
        knex('favorites').insert({user_id: 6, favorite_id: 5}),
        knex('favorites').insert({user_id: 8, favorite_id: 6})
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
const faker          = require('faker');

function ten(){
  return parseInt(Math.random()*10)+1
}
function hundred(){
  return parseInt(Math.random()*100)+1
}

function lat() {
  return Number(43.636 + Math.random()/100).toFixed(6)
}

function lng() {
  return Number(-79.390 - Math.random()/100).toFixed(6)
}

exports.seed = function(knex, Promise) {
  return knex('industries').del()
    .then(function() {
        return knex('industries').del();
      })
    .then(function () {
      return Promise.all([
        knex('industries').insert({title: 'Finance'}),
        knex('industries').insert({title: 'IT'}),
        knex('industries').insert({title: 'Marketing'}),
        knex('industries').insert({title: 'Retail'}),
        knex('industries').insert({title: 'Logistics'}),
        knex('industries').insert({title: 'Legal'}),
        knex('industries').insert({title: 'Health Care'}),
        knex('industries').insert({title: 'Others'}),
        knex('industries').insert({title: 'Education'}),
        knex('industries').insert({title: 'Arts and Performance'})
      ])
    })
    .then(function() {
        return knex('users').del();
      })
    .then(function () {
      const users = []
      for (let i=0; i < 100; i++) {
        users.push({
          name: faker.name.findName(),
          email: faker.internet.email(),
          image: faker.image.avatar(),
          password_digest: 'test',
          industry_id: ten(),
          company: faker.company.companyName(),
          address: faker.address.streetAddress(),
          lat: lat(),
          lng: lng()
        })
      }
      return knex('users').insert(users)
    })
    .then(function() {
        return knex('offers_needs').del();
      })
    .then(function () {
      return Promise.all([
        knex('offers_needs').insert({title: 'Career advice'}),
        knex('offers_needs').insert({title: 'Skill coaching'}),
        knex('offers_needs').insert({title: 'Industry insights'}),
        knex('offers_needs').insert({title: 'Referral'}),
        knex('offers_needs').insert({title: 'Mentoring'}),
        knex('offers_needs').insert({title: 'Company overview'}),
        knex('offers_needs').insert({title: 'General inquires'}),
        knex('offers_needs').insert({title: 'Networking'}),
        knex('offers_needs').insert({title: 'Business cooperation'}),
        knex('offers_needs').insert({title: 'Interview tips'})
      ])
    })
    .then(function() {
        return knex('messages').del();
      })
    .then(function () {
      const messages = []
      for (let i=1; i < 51; i++) {
        messages.push({
          content: faker.hacker.phrase(),
          from_user_id: ten(),
          to_user_id: hundred(),
          read: faker.random.boolean()
        })
      }
      return knex('messages').insert(messages)
    })
    .then(function() {
        return knex('users_offers').del();
      })
    .then(function () {
      const offers = []
      for (let i=1; i < 101; i++) {
        for (let j=0; j<3; j++){
          offers.push({
            user_id: i,
            offer_id: ten(),
          })
        }
      }
      return knex('users_offers').insert(offers)
    })
    .then(function() {
        return knex('users_needs').del();
    })
    .then(function () {
      const needs = []
      for (let i=1; i < 101; i++) {
        for (let j=0; j<3; j++){
          needs.push({
            user_id: i,
            need_id: ten(),
          })
        }
      }
      return knex('users_needs').insert(needs)
    })
    .then(function() {
        return knex('users_industries').del();
      })
    .then(function () {
      const users_industries = []
      for (let i=1; i < 101; i++) {
        users_industries.push({
          user_id: i,
          industry_id: ten()
        })
      }
      return knex('users_industries').insert(users_industries)
    })
    .then(function() {
        return knex('favorites').del();
      })
    .then(function () {
      const favorites = []
      for (let i=1; i < 101; i++) {
        favorites.push({
          favoritor_id: i,
          favoritee_id: hundred()
        })
      }
      return knex('favorites').insert(favorites)
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



// Drop table favorites;
// Drop table messages;
// Drop table migrations ;
// Drop table migrations_lock;
// Drop table users_industries ;
// Drop table users_needs;
// Drop table offers_needs ;
// Drop table users_offers;
// Drop table users;
// Drop table industries ;
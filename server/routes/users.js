"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

<<<<<<< HEAD
//  router.get('/', function(req, res) {
//    res.json([{
//      id: 1,
//      username: "samsepi0l"
//    }, {
//      id: 2,
//      username: "D0loresH4ze"
//    }]);
//  });

   router.get('/', (req, res) => {
      knex
        .select("*")
        .from("users")
        .then((results) => {
          res.json(results);
        });
    });
=======
   router.get("/", (req, res) => {
     knex
       .select("*")
       .from("users")
       .then((results) => {
         res.json(results);
       });
   });
>>>>>>> 5fcc31f02d4febea57b6c153031d4a781018fa27

  function getUserProfile(id) {
    return knex
      .select()
      .from('users')
      .innerJoin('industries', 'users.industry_id', 'industries.id')
      .where('users.id', '=', id)

//select * from users u inner join industries i on u.industry_id = i.id where u.id = 1;
  }

  router.get('/users/:id', (req, res) => {
    getUserProfile(req.params.id)
      .then((results) => {
          res.json(results[0]);
        })
      .catch((err) => {
        res.send(err);
      })
  })

  function saveUserProfile(id, data) {
    let newIndustry = knex('industries')
      .where('title', data.industry)
      .returning('id')
    return knex
      .select()
      .from('users')
      .where('id', '=', id)
      .update({
        name: data.name,
        image: data.name,
        password: data.name,
        industry: newIndustry,
        company: data.name,
        location: data.name
      })
  }

  router.put('/users/:id/update', (req, res) => {
    saveUserProfile(req.params.id)
      .then((results) => {
        res.redirect(`/api/users/match/${req.params.id}`);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function getMessages(from_id, to_id) {
    return knex
      .select()
      .from('messages')
      .where({
        from_user_id: from_id,
        to_user_id: to_id
      })
  }

  router.get('/users/:from_id/messages/:to_id', (req, res) => {
    getMessages(req.params.from_id, req.params.to_id)
      .then((messages) => {
        res.json(messages);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function matching(id) {
    return "i am working on it!!!!Machine Learning!!!"
  }
  router.get('/users/:id/matches', (req, res) => {
    matching(req.params.id)
      .then((matchlist) => {
        res.json(matchlist);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function favoritePage(id) {
    return knex
      .select()
      .from('favorites')
      .where('favoritor_id', '=', id)
  }

  router.get('/users/:id/favorites', (req, res) => {
    favoritePage(req.params.id)
      .then((favorites) => {
        res.json(favorites);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function favoriteUser(from_id, to_id) {
    return knex('favorites')
      .insert({
        favoritor_id: from_id,
        favoritee_id: to_id
      })
  }

  router.post('/users/:from_id/favorites/:to_id', (req, res) => {
    favoriteUser(req.params.from_id, req.params.to_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  return router;
}

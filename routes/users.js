"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  function getUserProfile(id) {
    return knex
      .select()
      .from('users')
      .where('id', '=', id)
  }

  router.get('/user/:id', (req, res) => {
    getUserProfile(req.params.id)
      .then((profileData) => {
        res.json(profileData);
      })
      .catch((err) => {
        res.send(err);
      })
  })
  //check update syntax
  function saveUserProfile(id) {
    return knex
      .select()
      .from('users')
      .where('id', '=', id)
      .update

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
    return
  }
  router.get('/users/:id/matches', (req, res) => {
    matching(id)
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
  //filter research how to add multiple params (offers, industries)





  return router;
}
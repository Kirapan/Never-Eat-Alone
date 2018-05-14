"use strict";

const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
//const bcrypt  = require('bcrypt');

module.exports = (knex) => {

  router.post('/verifyToken', verifyToken, (req, res) => {
    console.log("in server verify", req.headers.Authorization);
    jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
      console.log("in verify in post");
      if (err) {
        console.log("in error");
        res.sendStatus(403);
      } else {
        console.log("in else ", authData);
        res.send({
          authData
        });
      }
    })
  })

  //extract the token from the header
  function verifyToken(req, res, next) {

    //const bearerHeader = req.headers['authorization'];

    //    console.log("in verifyToken", bearerHeader);
    //    if (typeof bearerHeader !== 'undefined') {
    //      const bearer = bearerHeader.split(' ');
    //      const bearerToken = bearer[1];
    //      req.token = bearerToken;
    req.token = req.body.token;
    console.log("in verifyToken function", req.token);
    //      console.log("in if", req.token);
    next();
    //    } else {
    //      //forbidden
    //      res.sendStatus(403);
    //    }
  }

  router.post("/getToken", (req, res) => {

    if (!req.body.email || !req.body.password) {
      res.sendStatus(401).send("Fields not set");
    }

    console.log("in login server", req.body.email);
    knex
      .select("*")
      .from("users")
      .where('email', req.body.email)
      .then((result) => {
        if (!result) {
          res.sendStatus(400);
        } else {
          let payload = {
            id: result[0].id,
            email: result[0].email
          };
          const token = jwt.sign(payload, process.env.SECRETKEY);
          req.headers = {
            Authorization: "Bearer " + token
          };
          console.log("in getToken", req.headers);
          res.send(token);
        }
        //        res.authenticate(req.boapp.use(express.staticdy.password).then(user => {
        //          //set expiration after secretKey, e.g. 'secreteKey', {expiresIn: '1d'},
        //          const token = jwt.sign({user}, process.env.SECRETKEY);
        //          res.json(token);
        //        }).catch(err => {
        //          res.sendStatus(401).send({err: err});
        //        })
      })
      .catch((err) => {
        console.error(err);
      });
  })

  router.post("/signup", (req, res) => {
    console.log("in signup", req.body.email);
    //check if user does already exist in DB
    knex
      .select('id')
      .from('users')
      .where('email', req.body.email)
      .then((result) => {
        let user_id = result;
        console.log("user", result, " and type ", result.typeof);
        //user does already exist - redirext user to login
        if (typeof result !== 'undefined' && result.length > 0) {
          console.log("user_id ", result)
          res.sendStatus(400);
        } else { //user does not exist - create new user
          console.log("user does not exist ", result)
          //let hashPassword = '';
          // bcrypt.hash(req.body.password, 10, function(err, hash) {
          //   hashPassword =  hash;
          //   console.log("inside hash", hashPassword);
          knex('users')
            .insert({
              name: req.body.firstname + ' ' + req.body.lastname,
              email: req.body.email,
              password_digest: req.body.password
            })
            .then((result) => {
              console.log("after insert new user", result);
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log("error on insert");
              console.log(err);
            })
          // });
        }
      })
      .catch((err) => {
        console.log("error on select user");
        console.error(err);
      })
  })

  router.get("/users", (req, res) => {
    knex("users")
      .leftJoin('users_offers', "users.id", "users_offers.user_id")
      .leftJoin('industries', 'users.industry_id', 'industries.id')
      .leftJoin('offers_needs', "users_offers.offer_id", "offers_needs.id")
      .select("users.*", 'industries.title as industry', knex.raw('ARRAY_AGG(offers_needs.title) as offers'))
      .groupBy('users.id', 'industries.title')
      .then((results) => {
        res.json(results);
      });
  });

  function getUserProfile(id) {
    return knex
      .select()
      .from('users')
      .leftJoin('industries', 'users.industry_id', 'industries.id')
      .where('users.id', '=', id)
  }

  router.get('/users/:id', (req, res) => {
    getUserProfile(req.params.id)
      .then((results) => {
        console.log("i am how result lokk like", results)
        res.json(results[0]);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function saveUserProfile(id, data, industry_id) {

    return knex('users')
      .where('id', '=', id)
      .update({
        name: data.name,
        industry_id: industry_id,
        company: data.company,
        address: data.location,
        lat: data.lat,
        lng: data.lng
      })
  }

  router.put('/users/:id/update', (req, res) => {
    knex
      .select("id")
      .from('industries')
      .where('title', req.body.title)
      .then((result) => {
        saveUserProfile(req.params.id, req.body, result[0].id)
          .then(() => {
            res.status(200).send('Success')
          })
          .catch((err) => {
            res.send(err);
          })
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function findIndustryID(data) {
    let newArray = data.map(item => {
      return item.title
    })
    return knex('industries')
      .where((builder) => {
        builder.whereIn('title', newArray)
      })
  }

  function findID(data) {
    let newArray = data.map(item => {
      return item.title
    })
    return knex('offers_needs')
      .where((builder) => {
        builder.whereIn('title', newArray)
      })
  }

  router.put('/users/:id/updatePrefences', (req, res) => {
    console.log("req.bodyvodsfdsf", req.body)
    //update the interested industries
    knex('users_industries')
      .where("user_id", req.params.id)
      .del()
      .then(() => {
        findIndustryID(req.body.user_industries)
          .then((result) => {
            let id = req.params.id

            let array = result.map(item => {
              return {
                user_id: id,
                industry_id: item.id
              }
            })
            knex('users_industries').insert(array)
              .then(() => {})
              .catch((err) => {
                res.send(err);
              })
          })
          .catch((err) => {
            res.send(err);
          })
      })
      .catch((err) => {
        res.send(err);
      })
    //update the offers
    knex('users_offers')
      .where("user_id", req.params.id)
      .del()
      .then(() => {
        findID(req.body.offers)
          .then((result) => {
            let id = req.params.id
            console.log("iamthefinalresult", result)
            let array = result.map(item => {
              return {
                user_id: id,
                offer_id: item.id
              }
            })
            console.log("offerrsssss", array)
            knex('users_offers').insert(array)
              .then(() => {})
              .catch((err) => {
                res.send(err);
              })
          })
          .catch((err) => {
            res.send(err);
          })
      })
      .catch((err) => {
        console.log("users offerserrroooorr")
        res.send(err);
      })
    //update the needs
    knex('users_needs')
      .where("user_id", req.params.id)
      .del()
      .then(() => {
        findID(req.body.needs)
          .then((result) => {
            let id = req.params.id
            let array = result.map(item => {
              return {
                user_id: id,
                need_id: item.id
              }
            })
            knex('users_needs').insert(array)
              .then(() => {})
              .catch((err) => {
                res.send(err);
              })
          })
          .catch((err) => {
            res.send(err);
          })
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function sendMessages(from_id, to_id, content) {
    return knex('messages')
      .insert({
        content: content,
        from_user_id: from_id,
        to_user_id: to_id,
        read: false
      })
  }

  router.put('/users/:from_id/messages/:to_id', (req, res) => {
    console.log("i am the content", req.body)
    sendMessages(req.params.from_id, req.params.to_id, req.body.content)
      .then((messages) => {
        console.log("ok")
        res.json(messages);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function getMessages(id) {
    return knex
      .select()
      .from('messages')
      .innerJoin('users', 'users.id', 'messages.from_user_id')
      .where({
        to_user_id: id
      })
  }

  router.get('/users/:id/messages', (req, res) => {
    getMessages(req.params.id)
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
      .select("favoritee_id")
      .from('favorites')
      .where('favoritor_id', '=', id)
  }

  router.get('/users/:id/favorites', (req, res) => {
    favoritePage(req.params.id)
      .then((favorites) => {
        console.log("ia m favorites hahhaah", favorites)
        let result = [];
        favorites.forEach(item => {
          result.push(item.favoritee_id)
        });
        res.json(result);
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

  router.put('/users/:from_id/favorites/:to_id', (req, res) => {
    favoriteUser(req.params.from_id, req.params.to_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function deleteFavorite(from_id, to_id) {
    return knex
      .select()
      .from('favorites')
      .where('favoritor_id', '=', from_id)
      .andWhere('favoritee_id', '=', to_id)
      .del()
  }

  router.delete('/users/:from_id/favorites/:to_id', (req, res) => {
    deleteFavorite(req.params.from_id, req.params.to_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  router.get('/industries', (req, res) => {
    knex
      .select('title')
      .from('industries')
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  router.get('/offers_needs', (req, res) => {
    knex
      .select('title')
      .from('offers_needs')
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function getUserIndustries(id) {
    return knex
      .select('title')
      .from('industries')
      .rightJoin('users_industries', 'users_industries.industry_id', 'industries.id')
      .where('users_industries.user_id', id)
  }

  router.get('/users/:id/industries', (req, res) => {
    getUserIndustries(req.params.id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.send(err);
      })
  })


  function getUserNeeds(id) {
    return knex
      .select('title')
      .from('offers_needs')
      .rightJoin('users_needs', 'users_needs.need_id', 'offers_needs.id')
      .where('users_needs.user_id', id)
  }

  router.get('/users/:id/needs', (req, res) => {
    getUserNeeds(req.params.id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  function getUserOffers(id) {
    return knex
      .select('title')
      .from('offers_needs')
      .rightJoin('users_offers', 'users_offers.offer_id', 'offers_needs.id')
      .where('users_offers.user_id', id)
  }

  router.get('/users/:id/offers', (req, res) => {
    getUserOffers(req.params.id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.send(err);
      })
  })

  return router;
}


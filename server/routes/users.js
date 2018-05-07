"use strict";

const express = require('express');
const router  = express.Router();
const jwt     = require("jsonwebtoken");

module.exports = (knex) => {

  router.post("/verifyToken", verifyToken, (req, res) => {
    console.log("in server verify", req.body.token);
    jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
      console.log("in verify in post");
      if (err){
        console.log("in error");
        res.sendStatus(403);
      } else{
        res.send({authData});
      }
    })
  })

  //extract the token from the header
  function verifyToken (req, res, next){

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

    if (!req.body.email || !req.body.password){
      res.sendStatus(401).send("Fields not set");
    }

    console.log("in login server", req.body.email);
    knex
      .select("*")
      .from("users")
      .where('email', req.body.email)
      .then(result => {
        if (!result){
          res.sendStatus(400);
        } else{
          const payload = { id: result.id};
          const token = jwt.sign(payload, process.env.SECRETKEY);
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
      .catch(err => {
        console.error(err);
      });
  })

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

  function saveUserProfile(id, data, industry_id) {
    return knex('users')
      .where('id', '=', id)
      .update({
        name: data.name,
        image: data.image,
        password: data.password,
        industry_id: industry_id,
        company: data.company,
        location: data.location
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

  // function saveUserPreference(id, data) {
  //   return knex('users')
  //     .where('id', '=', id)
  //     .update({
  //       in: data.name,
  //       image: data.image,
  //       password: data.password,
  //       industry_id: industry_id,
  //       company: data.company,
  //       location: data.location
  //     })
  // }

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
        res.json(messages.data[0]);
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
        res.json(favorites.data[0]);
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


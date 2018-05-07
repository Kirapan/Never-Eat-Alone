import api from './api'

/*
This file will represent each data endpoint on your api. It's designed to look a
bit like an ActiveRecord model. If you need to add any data transformations on
the API output before sending it to your app, this is the right place!
Note we're assuming all your endpoints work the same way (and they should, for
your own sanity's sake). You'll need to create different modules if you have
endpoints that behave differently.
*/

const Resource = (endpoint) => {

  // We're extracting result.data and returning it on success to avoid
  function findUserProfile(id) {
    console.log("inside findUserProfile");
    return new Promise((resolve, reject) => {
      api.get(`api/${endpoint}/${id}`)
        .then((result) =>{
          resolve(result.data)
        })
        .catch((errors) => reject(errors))
    })
  }

  function saveUserProfile(id, data) {
    return api.patch(`api/${endpoint}/${id}/update`, data)
  }

  function findMessages(from_id, to_id) {
    return new Promise((resolve, reject)=>{
      api.get(`api/${endpoint}/${from_id}/messages/${to_id}`)
      .then((result)=> resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  function findFavorites(id) {
    return new Promise((resolve, reject)=>{
      api.get(`api/${endpoint}/${id}/favorites`)
      .then((result)=> resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  function addFavorites(from_id, to_id) {
    return api.put(`api/${endpoint}/${from_id}/favorites/${to_id}`)
  }

  function findMatches(id) {
    return new Promise((resolve, reject)=>{
      api.get(`api/${endpoint}/${id}/matches`)
      .then((result)=> resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  //send the login info to the server in json format
  function login(loginInfo) {

    console.log("in login ", loginInfo)
    return new Promise((resolve, reject)=>{
      api.post(`api/getToken`, loginInfo)
      .then((result)=> resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  function verifyToken(token) {
    console.log("in verifyToken", {token});
    return new Promise((resolve, reject) => {
      api.post('api/verifyToken', {token})
      .then((result) => resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  return {
    findUserProfile,
    saveUserProfile,
    findMessages,
    findFavorites,
    addFavorites,
    findMatches,
    login,
    verifyToken
  }

}

export default Resource

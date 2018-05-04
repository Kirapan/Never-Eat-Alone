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
    return new Promise((resolve, reject) => {
      api.get(`/${endpoint}/${id}`)
        .then((result) => resolve(result))
        .catch((errors) => reject(errors))
    })
  }

  function saveUserProfile(id, data) {
    return api.patch(`/${endpoint}/${id}/update`, data)
  }

  function findMessages(from_id, to_id) {
    return api.get(`/${endpoint}/${from_id}/messages/${to_id}`)
  }

  function findFavorites(id) {
    return api.get(`/${endpoint}/${id}/favorites`)
  }

  function addFavorites(from_id, to_id) {
    return api.put(`/${endpoint}/${from_id}/favorites/${to_id}`)
  }

  function findMatches(id) {
    return api.get(`/${endpoint}/${id}/matches`)
  }

  return {
    findUserProfile,
    saveUserProfile,
    findMessages,
    findFavorites,
    addFavorites,
    findMatches
  }

}

export default Resource
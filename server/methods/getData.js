
const gbKey = 'e4e37a13e893b3617854a9d13a246ec90ba07bdb';
const axios = require('axios');
var instance = axios.create({
  baseURL: 'https://www.giantbomb.com/api/'
});

const getData = function(endpoint, request, next) {

  axios.get(endpoint, {
    params: request.params
  })
  .then(function (response) {
    console.log(response);
    next(null, response);
  })
  .catch(function (error) {
    console.log(error);
    next(err);
  });
};

var second = 1000
var minute = 60 * second
var hour = 60 * minute
var day = 24 * hour

module.exports = [
  {
    name: 'getData',
    method: getData,
    options: {
      cache: {
        cache: 'redisCache',
        expiresIn: 10 * minute,
        generateTimeout: 10 * second
      },
      generateKey: function (request) {
        return request;
      }
    }
  }
]
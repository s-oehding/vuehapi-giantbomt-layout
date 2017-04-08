
const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');
const getData = function(next) {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  gb.games.list((err, res, json) => {
    if (err) {
      next(err);
    } else {
      next(null, json);
    }
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
        expiresIn: 100 * second,
        generateTimeout: 1000
      }
    }
  }
]

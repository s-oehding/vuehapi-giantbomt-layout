const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

const getGenres = function(request, next) {
  gb.genres.list(request, (err, res, json) => {
    console.log('GET Genres: ', request)
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
    name: 'getGenres',
    method: getGenres,
    options: {
      cache: {
        cache: 'redisCache',
        expiresIn: 30 * day,
        staleIn: 60 * minute,
        staleTimeout: 60 * second,
        generateTimeout: 1 * second
      },
      generateKey: function (request) {
        return JSON.stringify(request);
      }
    }
  }
]
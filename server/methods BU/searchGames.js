const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

const searchGames = function(request, next) {
  gb.games.search(request.params.searchString, request.query, (err, res, json) => {
    console.log('SEARCH Games: ', request)
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
    name: 'searchGames',
    method: searchGames,
    options: {
      cache: {
        cache: 'redisCache',
        expiresIn: 10 * minute,
        generateTimeout: 10 * second
      },
      generateKey: function (request) {
        return request.params.searchString + '?' + JSON.stringify(request.query);
      }
    }
  }
]

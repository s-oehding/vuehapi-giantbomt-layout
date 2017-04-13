const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

const getGame = function(id, next) {
  gb.games.get(id, (err, res, json) => {
    console.log('GET Game id: ', id)
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
    name: 'getGame',
    method: getGame,
    options: {
      cache: {
        cache: 'redisCache',
        expiresIn: 10 * minute,
        staleIn: 5 * minute,
        staleTimeout: 60 * second,
        generateTimeout: 30 * second
      },
      generateKey: function (request) {
        return JSON.stringify(request);
      }
    }
  }
]

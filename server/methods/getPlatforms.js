const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

const getPlatforms = function(request, next) {
  gb.platforms.list(request, (err, res, json) => {
    console.log('GET Platforms: ', request)
    if (err) {
      next(err);
    } else {
      console.log('RESPONSE Platforms: ', json.offset)
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
    name: 'getPlatforms',
    method: getPlatforms,
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

const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

const getGames = function(request, next) {
  const db = request.mongo.db;

  db.collection('games').find(function (err, result) {
      if (err) {
        return reply(Boom.internal('Internal MongoDB error', err));
      }
      next(result);
  });
};

var second = 1000
var minute = 60 * second
var hour = 60 * minute
var day = 24 * hour

module.exports = [
  {
    name: 'getGames',
    method: getGames
  }
]

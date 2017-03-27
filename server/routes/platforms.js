  
const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

module.exports = [
  {
    method: 'GET',
    path: '/api/platforms',
    handler: function (request, reply) {
      gb.platforms.list(request.query, (err, res, json) => {
        reply(json)
      });
    }
  }
]
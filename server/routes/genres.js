  
const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

const config = {
  page: 1,
  perPage: 100,
  sortBy: 'id',
  sortDir: 'asc'
};

module.exports = [
  {
    method: 'GET',
    path: '/api/genres',
    handler: function (request, reply) {
      gb.genres.list(config, (err, res, json) => {
        reply(json)
      });
    },
    config: {
        cache: {
            expiresIn: 30 * 1000,
            privacy: 'private'
        }
    }
  }
]
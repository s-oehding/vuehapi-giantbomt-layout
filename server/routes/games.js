  
const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

const config = {
  fields: ['id', 'name', 'deck', 'original_release_date', 'platforms'],
  page: 1,
  perPage: 100,
  sortBy: 'original_release_date',
  sortDir: 'desc',
  filters: [
    { 
      field: 'original_release_date',
      start: new Date('1900-01-01'),
      end: new Date()
    }
  ]
};

module.exports = [
  {
    method: 'GET',
    path: '/api/call',
    handler: function (request, reply) {
      gb.games.list(config, (err, res, json) => {
        reply(json.results)
      });
    }
  },
  {
    method: 'GET',
    path: '/api/search/{searchString}',
    handler: function (request, reply) {
      gb.games.search(request.params.searchString, config, (err, res, json) => {
        console.log(request.query)
        reply(json.results)
      });
    }
  },
  {
    method: 'GET',
    path: '/api/games/genre/{id}',
    handler: function (request, reply) {
      gb.games.search(request.params.id, config, (err, res, json) => {
        console.log(request.query)
        reply(json.results)
      });
    }
  }
]
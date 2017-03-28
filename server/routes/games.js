const qsObjects = require('qs-objects');
const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');
const config2 = {
  fields: ['id', 'name', 'deck', 'image'],
  filters: [
    {
      field: 'original_release_date',
      start: new Date('2016-01-01'),
      end: new Date()
    }
  ]
};  
module.exports = [
  {
    method: 'GET',
    path: '/api/games',
    handler: function (request, reply) {
      gb.games.list(request.query , (err, res, json) => {
        // console.log(request.query)
        reply(json)
      });
    }
  },
  {
    method: 'GET',
    path: '/api/search/{searchString}',
    handler: function (request, reply) {
      gb.games.search(request.params.searchString, config, (err, res, json) => {
        // console.log(request.query)
        reply(json)
      });
    }
  },
  {
    method: 'GET',
    path: '/api/games/genre/{id}',
    handler: function (request, reply) {
      gb.games.search(request.params.id, config, (err, res, json) => {
        // console.log(request.query)
        reply(json.results.body)
      });
    }
  }
]
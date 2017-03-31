const qs = require('qs');
const giantbomb = require('giantbomb');
const gb = giantbomb('e4e37a13e893b3617854a9d13a246ec90ba07bdb');

module.exports = [
  {
    method: 'GET',
    path: '/api/search/{searchString}',
    handler: function (request, reply) {

      // Hier werden die Filter neu formatiert damit Giantbomb sie frisst (axios serialisiert die Params falsch)

      var filters = []
      for (var i = 0; i <= request.query.filters.length-1; i++) {
        parse = JSON.parse(request.query.filters[i])
        // parse = request.query.filters[i]
        if (parse.start && parse.end) {
          parse.start = new Date(parse.start);
          parse.end = new Date(parse.end);
        }
        filters.push(parse)
        // console.log(i, filters)
      }
      request.query.filters = filters

      gb.games.search(request.params.searchString, request.query, (err, res, json) => {
        console.log('Request: ', request.query)
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
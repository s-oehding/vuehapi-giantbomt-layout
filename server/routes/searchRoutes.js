var searchRoutes = {  
  register: function (server, options, next) {
    server.route({
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
          console.log(i, filters)
        }
        request.query.filters = filters

        server.methods.searchGames(request, function(error, result) {
          console.log('In Route Search query:', request)
          reply(error || result);
        });
      }
    })

    next()
  }
}

searchRoutes.register.attributes = {  
  name: 'search-routes',
  version: '1.0.0'
}

module.exports = searchRoutes

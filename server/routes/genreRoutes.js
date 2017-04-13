var genreRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/genres',
      handler: function (request, reply) {
        server.methods.getGenres(request.query, function(error, result) {
          reply(error || result);
        });
      }
    }),
    server.route({
      method: 'GET',
      path: '/api/genre/{id}',
      handler: function (request, reply) {
        server.methods.getGenre(request.params.id, function(error, result) {
          reply(error || result);
        });
      }
    })

    next()
  }
}

genreRoutes.register.attributes = {  
  name: 'genre-routes',
  version: '1.0.0'
}

module.exports = genreRoutes

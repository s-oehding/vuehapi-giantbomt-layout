var gameRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/games',
      handler: function (request, reply) {
        server.methods.getGames(request.query, function(error, result) {
          reply(error || result);
        });
      }
    }),
    server.route({
      method: 'GET',
      path: '/api/game/{id}',
      handler: function (request, reply) {
        server.methods.getGame(request.params.id, function(error, result) {
          reply(error || result);
        });
      }
    })

    next()
  }
}

gameRoutes.register.attributes = {  
  name: 'game-routes',
  version: '1.0.0'
}

module.exports = gameRoutes

var gameRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/games',
      handler: function (request, reply) {
        const db = request.mongo.db;
        db.collection('games').find().limit(150).toArray(function (err, result) {
            if (err) {
              return reply(Boom.internal('Internal MongoDB error', err));
            }
            reply(result);
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

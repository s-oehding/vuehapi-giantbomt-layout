var platformRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/platforms',
      handler: function (request, reply) {
        const db = request.mongo.db;

        db.collection('platforms').find().toArray(function (err, result) {
            if (err) {
              return reply(Boom.internal('Internal MongoDB error', err));
            }
            reply(result);
        });
      }
    }),
    server.route({
      method: 'GET',
      path: '/api/platform/{id}',
      handler: function (request, reply) {
        server.methods.getPlatform(request.params.id, function(error, result) {
          reply(error || result);
        });
      }
    })

    next()
  }
}

platformRoutes.register.attributes = {  
  name: 'platform-routes',
  version: '1.0.0'
}

module.exports = platformRoutes

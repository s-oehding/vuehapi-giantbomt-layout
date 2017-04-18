var genreRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/genres',
      handler: function (request, reply) {
        const db = request.mongo.db;

        db.collection('genres').find().toArray(function (err, result) {
            if (err) {
              return reply(Boom.internal('Internal MongoDB error', err));
            }
            reply(result);
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

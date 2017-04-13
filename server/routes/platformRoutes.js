var platformRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/platforms',
      handler: function (request, reply) {
        server.methods.getPlatforms(request.query, function(error, result) {
          console.log('In Route query:', request.query)
          reply(error || result);
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

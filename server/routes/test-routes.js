var testRoutes = {  
  register: function (server, options, next) {
    // add “hello world” route
    server.route({
      method: 'GET',
      path: '/api/test',
      handler: function (request, reply) {
        server.methods.getData(function(error, result) {
          reply(error || result);
        });
      }
    })

    next()
  }
}

testRoutes.register.attributes = {  
  name: 'test-routes',
  version: '1.0.0'
}

module.exports = testRoutes  
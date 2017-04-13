const config = {
  fields: ['id', 'name'],
  page: 1,
  perPage: 0,
  sortBy: 'number_of_user_reviews',
  sortDir: 'asc'
};

var testRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/test',
      handler: function (request, reply) {
        server.methods.getData(request.query, function(error, result) {
          // console.log(result.number_of_total_results)
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
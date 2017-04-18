var companiesRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/companies',
      handler: function (request, reply) {
        const db = request.mongo.db;

        db.collection('companies').find().toArray(function (err, result) {
            if (err) {
              return reply(Boom.internal('Internal MongoDB error', err));
            }
            reply(result);
        });
      }
    })
    next()
  }
}

companiesRoutes.register.attributes = {  
  name: 'companies-routes',
  version: '1.0.0'
}

module.exports = companiesRoutes

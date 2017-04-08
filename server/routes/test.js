var server = require('../../app')

module.exports = [
  {
    method: 'GET',
    path: '/api/test',
    handler: function (request, reply) {
      server.methods.getData(function(error, result) {
        reply(error || result);
      });
    }
  }
]
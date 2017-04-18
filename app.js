'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const methods = require('./server/methods');

// MogoDB Connection
const dbOpts = {
    url: 'mongodb://monokultur:passwortS#R3N@ds161890.mlab.com:61890/game-lounge',
    decorate: true
};

const server = new Hapi.Server({
  cache: [
    {
      name: 'redisCache',
      engine: require('catbox-redis'),
      host: 'redis-13782.c1.eu-west-1-3.ec2.cloud.redislabs.com',
      port: '13782',
      password: 'passwortS#R3N'
    }
  ]
});

server.connection({
  port: 3000
});

// Register webpack HMR, fallback to development environment
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {

  const WebpackConfig = require('./config/webpack.config.js'); // Webpack config
  const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
  const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');

  server.register([{
    register: HapiWebpackDevMiddleware,
    options: {
      config: WebpackConfig,
      options: {
        noInfo: true,
        publicPath: WebpackConfig.output.publicPath,
        stats: {
          colors: true
        }
      }
    }
  }, {
    register: HapiWebpackHotMiddleware
  }, {
    register: require('h2o2')
  },], function (err) {
    if (err) {
      throw err;
    }
  });
}

server.register([
  {register: require('hapi-mongodb'), options: dbOpts},
  {register: require('inert')},
  {register: require('hapi-qs')},
  {register: require('./server/routes/companiesRoutes.js')},
  {register: require('./server/routes/defaultRoutes.js')},
  {register: require('./server/routes/gameRoutes.js')},
  {register: require('./server/routes/genreRoutes.js')},
  {register: require('./server/routes/platformRoutes.js')},
  {register: require('./server/routes/searchRoutes.js')}
  ], function (err) {

  if (err) {
    throw err;
  }
  for (var method in methods) {
    server.method(methods[method]);
  }

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
    console.log('Loaded Servermethods:\n', server.methods);
  });
});

if (process.env.NODE_ENV !== 'production') {
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      proxy: {
        uri: 'http://localhost:3000/'
      }
    }
  });
} else {
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: function (request, reply) {
      reply.file('./public/index.html');
    }
  });
}

module.exports = server;

'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const methods = require('./server/methods');

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
  }], function (err) {
    if (err) {
      throw err;
    }
  });

}

server.register([
  Inert,
  require('hapi-qs'),
  require('./server/routes/test-routes.js'),
  require('./server/routes/gameRoutes.js'),
  require('./server/routes/genreRoutes.js'),
  require('./server/routes/platformRoutes.js'),
  require('./server/routes/searchRoutes.js')
  ], function (err) {

  if (err) {
    throw err;
  }
  for (var method in methods) {
    server.method(methods[method]);
  }
  // server.route(routes);
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
  console.log('Loaded Servermethods:\n', server.methods);
});

module.exports = server;

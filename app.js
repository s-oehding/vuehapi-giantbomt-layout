'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
var routes = require('./server/routes');

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

server.register([Inert], function (err) {

  if (err) {
    throw err;
  }

  server.route(routes);
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

module.exports = server;

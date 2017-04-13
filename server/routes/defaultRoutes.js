var defaultRoutes = {  
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/assets/{filepath*}',
      config: {
        auth: false,
        cache: {
          expiresIn: 24 * 60 * 60 * 1000,
          privacy: 'public'
        }
      },
      handler: {
        directory: {
          path: __dirname + '/public/assets/',
          listing: false,
          index: false
        }
      }
    }),

    server.route({
      method: 'GET',
      path: '/build/{filepath*}',
      config: {
        auth: false,
        cache: {
          expiresIn: 24 * 60 * 60 * 1000,
          privacy: 'public'
        }
      },
      handler: {
        directory: {
          path: __dirname + '/public/build/',
          listing: false,
          index: false
        }
      }
    })

    next()
  }
}

defaultRoutes.register.attributes = {  
  name: 'default-routes',
  version: '1.0.0'
}

module.exports = defaultRoutes

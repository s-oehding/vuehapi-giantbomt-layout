var config = {
  development: {
    redis: {
      host:   '0.0.0.0',
      port:   '6379',
      db:     'DB_NAME',
      password: 'REDIS_PASSWORD',
      partition: ''
    },
    giantbomb: {
      apiKey: 'GIANTBOMB_API_KEY'
    }
  },
  production: {
    redis: {
      host:   '0.0.0.0',
      port:   '6379',
      db:     'DB_NAME',
      password: 'REDIS_PASSWORD',
      partition: ''
    },
    giantbomb: {
      apiKey: 'GIANTBOMB_API_KEY'
    }
  }
}
module.exports = config
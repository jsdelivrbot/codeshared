module.exports = {

  development: {
    database: {
      mongourl: process.env.NODE_DB || 'mongodb://localhost/just_another_bookstore',
    },
    httpServer: {
      port: process.env.PORT || 8080,
      session: {
        secret: process.env.SESSION_SECRET || 'awesome unicorns'
      },
    },
  },

  production: {
    database: {
      mongourl: process.env.NODE_DB || 'mongodb://localhost/just_another_bookstore',
    },
    httpServer: {
      port: process.env.PORT || 8080,
      session: {
        secret: process.env.SESSION_SECRET || 'awesome unicorns'
      },
    },
  }

};
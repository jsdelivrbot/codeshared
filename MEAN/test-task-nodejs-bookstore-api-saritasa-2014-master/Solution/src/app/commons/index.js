'use strict';
var projectRoot = '../../..';
module.exports = {
  // Packages
  express: require('express'),
  passport: require('passport'),
  mongoose: require('mongoose'),

  // Environment
  isDevelopment: function() {
    return this.env === 'development';
  },
  // Configurations
  configs: {},
  loadConfigs: function(configFile) {
    configFile = configFile || projectRoot + '/configs';
    this.configs = require(configFile)[this.env];
  },
  configMongoose: function() {
    this.mongourl = this.configs.database.mongourl;
  },
  configExpress: function() {
    this.port = this.configs.httpServer.port;
  },

  // Initializations
  initMongoose: function(mongourl) {
    this.mongourl = mongourl || this.mongourl || process.env.NODE_DB;
    this.mongoose.connect(this.mongourl);
    if( this.isDevelopment() ) {
      this.mongoose.set('debug', true);
      var self = this;

      this.mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + self.mongourl);
      });

      this.mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
      });
      
      this.mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected.');
      });

      process.on('SIGINT', function() {
        self.mongoose.connection.close(function () {
          console.log('Mongoose default connection disconnected through app termination.');
          process.exit(0);
        });
      });
    }
  },
  initExpress: function(app) {
    this.app = app || this.app || this.express();
    var app = this.app;
    app.set('env', this.env);

    var bodyParser = require('body-parser');
    app.use(bodyParser());

    var cookieParser = require('cookie-parser');
    app.use(cookieParser());    

    var session = require('express-session');
    var MongoStore = require('connect-mongostore')(session);
    
    app.use(session({
      secret: this.configs.httpServer.session.secret,
      store: new MongoStore({'db': 'sessions'})
    }));

    var passport = this.passport;
    app.use(passport.initialize());
    app.use(passport.session());
    
    if( this.isDevelopment() ) {
      var requestLoggerMw = require('morgan')();
      app.use(requestLoggerMw);
    }

    return app;
  },
  /*
  init(...)
  Used to initialise the whole application server.
  */
  init: function(mongourl, port, env) {
    this.env = env || process.argv[2] || process.env.NODE_ENV || 'development';
    this.loadConfigs();
    // Init DB
    this.configMongoose();
    this.mongourl = mongourl || process.argv[3] || this.mongourl;
    this.initMongoose();
    // Init Http Server
    this.configExpress();
    this.port = port || this.port || 8080;    
    this.initExpress();
    
    return this;
  }
};
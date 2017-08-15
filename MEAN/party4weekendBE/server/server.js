'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

var app = module.exports = loopback();


const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dannydns.au.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000/api/',
    issuer: "https://dannydns.au.auth0.com/",
    algorithms: ['RS256']
});

// app.use(jwtCheck);


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

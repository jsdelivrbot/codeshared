(function() {
  'use strict';
  var debug = require('debug')('server');

  // Base Setup
  var appPath = './src/app';
  var commons = require(appPath + '/commons');
  commons.init();
  var app = commons.app;
  
  // Routes for the API

  var apiRouter = require(appPath + '/controllers/apiRouter');
  app.use('/api', apiRouter);
  app.use(
    function(req, res, next) {
      debug('The last middleware is reached without errors.');
      next();
    }
  );
  app.use(
    function(err, req, res, next) {
      debug('The last error handler is reached with errors.');
      next(err); // Call the default express error handler.
    }
  );

  // Start the Server

  var port = commons.port;
  app.listen(port);
  console.log('Listening on port ' + port);

})();
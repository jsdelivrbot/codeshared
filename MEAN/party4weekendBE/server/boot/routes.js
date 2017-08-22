'use strict';

module.exports = (app) => {
  let router = app.loopback.Router();

  router.get('/ping', (req, res, next) => {
    res.send('pongaroo');
  });

  router.get('/bang', (req, res, next) => {
      res.send('big');
  });

  router.get('/api', (req, res, next) => {
      res.send('api');
  })

  app.use(router);
};

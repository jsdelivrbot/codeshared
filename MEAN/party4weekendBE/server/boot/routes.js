'use strict';

module.exports = (app) => {
  let router = app.loopback.Router();

  router.get('/ping', (req, res, next) => {
    res.send('pongaroo');
  });

  app.use(router);
};

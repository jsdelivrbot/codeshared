'use strict';

module.export = function(app) {
  app.dataSources.mysqlDs.automigrate('CoffeeShop', (err) => {
    if (err) throw err;

    app.models.CoffeeShop.create([
      {
        name: 'Bel Cafe',
        city: 'Vancouver',
      },
      {
        name: 'Three Bees Coffee House',
        city: 'San Mateo',
      },
      {
        name: 'Caffe Artigiano',
        city: 'Vancouver',
      },
    ], function(err, coffeeShops) {
      if (err) throw err;
      console.log('Models created: \n', coffeeShops);
    });
  });
};

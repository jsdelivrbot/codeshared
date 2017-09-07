'use strict';
/*
Warning!
This scripts drops all books in your database!
*/
var appPath = '../app';
var commons = require(appPath + '/commons');
var fs = require('fs');
var filePath = __dirname + '/data_fixture/price.json';
var fileData = fs.readFileSync(filePath, {encoding: 'utf8'});
var productObjects = JSON.parse(fileData);

commons.configMongoose();
commons.initMongoose();

var ProductModel = require(appPath + '/models/book');
ProductModel.remove().exec();

ProductModel.ensureIndexes(
  function (err) { // TODO: has no desired effect. Maybe becouse there is no connection.
    if (err) { return console.log(err); }
  }
);

var count = productObjects.length;
productObjects.forEach(
  function (product, i) {
    var doc = new ProductModel( product );
    doc.save(function (err) {
      // TODO: Check that doc.validate is called in the same tick/thread as doc.save call.
      if(err) {
        console.log('\nProduct #'+i+' with id \''+product.id+'\' failed to be saved.\nSee error:\n');
        console.log(err);
        return;
      }
      --count;
      if(!count) {
        console.log('\nSuccess.');
        process.exit(0);
      }
    });
  }
);
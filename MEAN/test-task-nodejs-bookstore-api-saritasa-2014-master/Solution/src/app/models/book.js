'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateInteger = require('../commons/validators').validateInteger;

var attributes = {
  desc: {
    type: String,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true, // TODO:
    validate: [
      validateInteger,
      'Book\'s id must be an integer.'
    ]
  },
  name: {
    type: String,
    required: 'Books without names are not allowed.'
  },
  picture: String,
  price: Number
};

var BookSchema = new Schema(attributes, {
  strict: true,
  autoIndex: true,
  safe: true,
  background: false
});

var model = mongoose.model('Book', BookSchema);

module.exports = model;

'use strict';

function validateInteger(value) {
  return (typeof value === 'number') && !isNaN(value) && Math.floor(value) === value;
}

module.exports.validateInteger = validateInteger;
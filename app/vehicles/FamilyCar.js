'use strict';

var Vehicle = require('app/Vehicle');
var util = require('util');

var FamilyCar = function() {

    Vehicle.call(this);

};

util.inherits(FamilyCar, Vehicle);

module.exports = FamilyCar;
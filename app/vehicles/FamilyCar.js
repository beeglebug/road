'use strict';

var Vehicle = require('app/Vehicle');
var util = require('util');

var FamilyCar = function() {

    Vehicle.call(this);

    this.mpg = 40;
    this.seats = 5;
    this.capacity = 15;

};

util.inherits(FamilyCar, Vehicle);

module.exports = FamilyCar;
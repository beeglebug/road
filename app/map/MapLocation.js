/* jshint node: true */
'use strict';

var Point = require('lib/pixi/pixi').Point;

var MapLocation = function(x, y, name) {

    this.position = new Point(x,y);
    this.name = name;
    this.connections = [];

};

/**
 * @param {Location} location
 */
MapLocation.prototype.isConnectedTo = function(location) {

    return this.connections.indexOf(location) > -1;
};

MapLocation.prototype.distanceTo = function(location) {

    return 100;

};

module.exports = MapLocation;

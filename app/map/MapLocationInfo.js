'use strict';

var util = require('util');
var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Graphics = require('lib/pixi/pixi').Graphics;

var MapLocationInfo = function() {

    DisplayObjectContainer.call(this);

};

MapLocationInfo.prototype.update = function(location, state) {

    var distance = state.currentLocation.distanceTo(location);

};

util.inherits(MapLocationInfo, DisplayObjectContainer);

module.exports = MapLocationInfo;
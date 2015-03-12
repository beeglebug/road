/* jshint node: true */
'use strict';

var State = require('src/state/State');
var Graphics = require('lib/pixi/pixi').Graphics;

var TravelState = function() {

    State.call(this);
};

TravelState.prototype = Object.create(State.prototype);

TravelState.prototype.init = function() {

    var gfx = new Graphics();
    gfx.beginFill(0x000000);
    gfx.drawRect(0, 0, 100, 50);

    this.displayRoot.addChild(gfx);
};

TravelState.prototype.update = function(delta) {

};

module.exports = TravelState;
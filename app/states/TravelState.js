/* jshint node: true */
'use strict';

var State = require('src/state/State');
var Graphics = require('lib/pixi/pixi').Graphics;

/**
 * @extends State
 * @param game
 * @constructor
 */
var TravelState = function(game) {

    State.call(this, game);

    this.origin = null;
    this.destination = null;
    this.arrived = false;
    this.progress = 0;
};

TravelState.prototype = Object.create(State.prototype);

TravelState.prototype.setLocations = function(origin, destination) {
    this.origin = origin;
    this.destination= destination;
    this.arrived = false;
    this.progress = 0;
};

TravelState.prototype.enter = function() {

};

TravelState.prototype.create = function() {

    var gfx = new Graphics();
    gfx.beginFill(0x000000);
    gfx.drawRect(0, 0, 10, 10);

    gfx.position.set(0, 100);

    this.marker = gfx;

    this.displayRoot.addChild(gfx);
};

TravelState.prototype.update = function(delta) {

    var speed = 3;
    var max = 790;

    if(!this.arrived) {

        this.progress += speed;
        this.marker.position.x = this.progress;

        if (this.progress >= max) {
            this.arrived = true;
            this.emit('arrived', this.destination);
        }
    }
};

module.exports = TravelState;
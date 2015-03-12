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
};

TravelState.prototype = Object.create(State.prototype);

TravelState.prototype.init = function() {

    var gfx = new Graphics();
    gfx.beginFill(0x000000);
    gfx.drawRect(0, 0, 10, 10);

    gfx.position.set(0, 100);

    this.test = gfx;

    this.displayRoot.addChild(gfx);
};

TravelState.prototype.update = function(delta) {

    var speed = 3;
    var max = 790;
    this.test.position.x += speed;

    if(this.test.position.x >= max) {
        this.game.stateManager.setState('destination');
    }
};

module.exports = TravelState;
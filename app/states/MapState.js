/* jshint node: true */
'use strict';

var State = require('src/state/State');
var Graphics = require('lib/pixi/pixi').Graphics;

/**
 * @extends State
 * @param game
 * @constructor
 */
var MapState = function(game) {

    State.call(this, game);
};

MapState.prototype = Object.create(State.prototype);

MapState.prototype.init = function() {

    var callback = function() {
        this.game.stateManager.setState('travel');
    }.bind(this);

    var location1 = makeLocation(50, 300, callback);
    var location2 = makeLocation(250, 300, callback);
    var location3 = makeLocation(500, 300, callback);

    this.displayRoot.addChild(location1);
    this.displayRoot.addChild(location2);
    this.displayRoot.addChild(location3);
};

MapState.prototype.update = function(delta) {};

function makeLocation(x, y, callback) {

    var gfx = new Graphics();
    gfx.beginFill(0x880088);
    gfx.drawRect(0, 0, 20, 20);
    gfx.position.set(x,y);
    gfx.interactive = true;
    gfx.click = callback;

    return gfx;
}










module.exports = MapState;
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

    var location = makeLocation();

    location.click = function() {

        this.game.stateManager.setState('travel');

    }.bind(this);

    this.displayRoot.addChild(location);
};

MapState.prototype.update = function(delta) {};

function makeLocation() {

    var gfx = new Graphics();
    gfx.beginFill(0x333333);
    gfx.drawRect(0, 0, 10, 10);

    gfx.interactive = true;
    //gfx.hitArea = new Rectangle(0, 0, 800, 600);

    return gfx;
}










module.exports = MapState;
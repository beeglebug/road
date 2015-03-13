/* jshint node: true */
'use strict';

var State = require('src/state/State');
var Graphics = require('lib/pixi/pixi').Graphics;

/**
 * @extends State
 * @param game
 * @constructor
 */
var MapState = function (game) {

    State.call(this, game);

    this.reset();
};

MapState.prototype = Object.create(State.prototype);

MapState.prototype.reset = function() {

    this.active = 1;
    this.destination = 4;
};

MapState.prototype.init = function () {

    var line = new Graphics();
    line.lineStyle(1, 0x000000);
    line.moveTo(25, 300);
    line.lineTo(775, 300);

    var highlight = new Graphics();
    highlight.lineStyle(1, 0x888888);
    highlight.drawRect(-15, -15, 30, 30);

    switch (this.active) {
        case 1:
            highlight.position.set(25, 300);
            break;
        case 2:
            highlight.position.set(275, 300);
            break;
        case 3:
            highlight.position.set(525, 300);
            break;
        case 4:
            highlight.position.set(775, 300);
            break;
    }

    var callback = function () {
        this.game.stateManager.setState('travel');
        this.active++;
    }.bind(this);

    var location1 = makeLocation(25, 300, false, callback);
    var location2 = makeLocation(275, 300, this.active == 1, callback);
    var location3 = makeLocation(525, 300, this.active == 2, callback);
    var location4 = makeLocation(775, 300, this.active == 3, callback);

    this.displayRoot.addChild(line);
    this.displayRoot.addChild(location1);
    this.displayRoot.addChild(location2);
    this.displayRoot.addChild(location3);
    this.displayRoot.addChild(location4);
    this.displayRoot.addChild(highlight);
};

MapState.prototype.hasReachedDestination = function () {
    return this.active === this.destination;
};

MapState.prototype.update = function (delta) {};

function makeLocation(x, y, enabled, callback) {

    var gfx = new Graphics();

    if (enabled) {
        gfx.beginFill(0x880088);
        gfx.interactive = true;
        gfx.click = callback;
    } else {
        gfx.beginFill(0x222222);
    }

    gfx.drawRect(-10, -10, 20, 20);
    gfx.position.set(x, y);

    return gfx;
};


module.exports = MapState;
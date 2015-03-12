/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;

/**
 * @param {Game} game
 * @constructor
 */
var State = function(game) {

    /**
     * @type {Game}
     */
    this.game = game;

    this.displayRoot = new DisplayObjectContainer();
};

State.prototype.init = function() {

    console.log('state %s started', this.name);
};

State.prototype.update = function(delta) {};

module.exports = State;
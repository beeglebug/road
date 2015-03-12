/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;

var State = function(game) {

    this.game = game;
    
    this.displayRoot = new DisplayObjectContainer();
};

State.prototype.init = function() {

    console.log('state %s started', this.name);
};

State.prototype.update = function(delta) {};

module.exports = State;
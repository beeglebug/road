/* jshint node: true */
'use strict';

var PIXI = require('lib/pixi/pixi');
var StateManager = require('src/state/StateManager');

var Game = function(width, height) {

    this.stateManager = new StateManager();

    this.stage = new PIXI.Stage(0xDDDDDD, true);

    this.renderer = PIXI.autoDetectRenderer(width, height);

    // bind loop for raf
    this.loop = this._loop.bind(this);
};

Game.prototype.start = function() {

    this.loopId = requestAnimationFrame(this.loop);
};

Game.prototype.stop = function() {

    cancelAnimationFrame(this.loopId);
};

Game.prototype._loop = function(delta) {

    this.loopId = requestAnimationFrame(this.loop);

    this.update();

    this.renderer.render(this.stage);
};

module.exports = Game;
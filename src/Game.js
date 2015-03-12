/* jshint node: true */
'use strict';

var PIXI = require('lib/pixi/pixi');
var StateManager = require('src/state/StateManager');

var Game = function(width, height) {

    this.stage = new PIXI.Stage(0xDDDDDD, true);

    this.renderer = PIXI.autoDetectRenderer(width, height);

    this.stateManager = new StateManager();

    this.stage.addChild(this.stateManager.displayRoot);

    // bind loop for raf
    this.loop = this._loop.bind(this);
};

Game.prototype.addToDom = function(selector) {

    this.domElement = document.querySelector(selector);

    this.domElement.appendChild(this.renderer.view);

    // disable context menu
    this.domElement.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        return false;
    });
};

Game.prototype.start = function() {

    this.loopId = requestAnimationFrame(this.loop);
};

Game.prototype.stop = function() {

    cancelAnimationFrame(this.loopId);
};

Game.prototype._loop = function(delta) {

    this.loopId = requestAnimationFrame(this.loop);

    this.stateManager.update(delta);

    this.renderer.render(this.stage);
};

module.exports = Game;
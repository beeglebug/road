/* jshint node: true */
'use strict';

var Stage = require('lib/pixi/pixi').Stage;
var WebGLRenderer = require('lib/pixi/pixi').WebGLRenderer;
var StateManager = require('src/state/StateManager');
var AssetLoader = require('src/AssetLoader');

var Game = function(width, height, selector) {

    this.width = width;

    this.height = height;

    /**
     * @type {Stage}
     */
    this.stage = new Stage(0xDDDDDD, true);

    /**
     * @type {WebGLRenderer}
     */
    this.renderer = new WebGLRenderer(width, height);

    /**
     * @type {StateManager}
     */
    this.stateManager = new StateManager();

    /**
     * @type {AssetLoader}
     */
    this.loader = new AssetLoader();

    this.loader.addEventListener('onComplete', this._assetsLoaded.bind(this));

    this.stage.addChild(this.stateManager.displayRoot);

    this.addToDom(selector);

    // bind loop for raf
    this.loop = this._loop.bind(this);
};

/**
 * @private
 */
Game.prototype._assetsLoaded = function() {

    this.boot();

};

Game.prototype.boot = function() { };

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

    this.loader.load();

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
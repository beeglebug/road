/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;
var AssetLoader = require('src/AssetLoader');

/**
 * @param {Game} game
 * @constructor
 */
var State = function(game) {

    /**
     * @type {Game}
     */
    this.game = game;

    /**
     * @type {DisplayObjectContainer}
     */
    this.displayRoot = new DisplayObjectContainer();

    /**
     * @type {AssetLoader}
     */
    this.loader = new AssetLoader();

    this.loader.addEventListener('onComplete', this._assetsLoaded.bind(this));
};

/**
 * @private
 */
State.prototype._assetsLoaded = function() {

    this.init();
};

State.prototype.boot = function() {

    this.load();

    this.loader.load();
};

State.prototype.load = function() {};

State.prototype.init = function() {};

State.prototype.update = function(delta) {};

module.exports = State;
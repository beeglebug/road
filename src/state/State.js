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
     * @type {string}
     */
    this.name = '';

    /**
     * @type {DisplayObjectContainer}
     */
    this.displayRoot = new DisplayObjectContainer();

    /**
     * @type {AssetLoader}
     */
    this.loader = new AssetLoader();

    /**
     * @type {boolean}
     * @private
     */
    this._loaded = false;

    this.loader.addEventListener('onComplete', this._assetsLoaded.bind(this));
};

/**
 * @private
 */
State.prototype._assetsLoaded = function() {

    this._loaded = true;

    this.init();
};

/**
 * clean up the state before leaving
 */
State.prototype.shutdown = function() {

    this.displayRoot.removeChildren();
};

/**
 * start the state up
 */
State.prototype.boot = function() {

    if(!this._loaded) {

        this.load();

        this.loader.load();

    } else {

        this.init();

    }
};

State.prototype.load = function() {};

State.prototype.init = function() {};

State.prototype.update = function(delta) {};

module.exports = State;
/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;
var AssetLoader = require('src/AssetLoader');
var EventEmitterMixin = require('src/mixins/EventEmitterMixin');

/**
 * @param {Game} game
 * @mixes EventEmitterMixin
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

    /**
     * @type {boolean}
     * @private
     */
    this._created = false;

    this.loader.addEventListener('onComplete', this._assetsLoaded.bind(this));
};

EventEmitterMixin.call(State.prototype);

/**
 * @private
 */
State.prototype._assetsLoaded = function() {

    this._loaded = true;

    this.boot();
};

/**
 * start the state up
 */
State.prototype.boot = function() {

    if(!this._loaded) {

        this.preload();

        this.loader.load();

    } else if(!this._created) {

        this.create();

        this._created = true;

        this.enter();

    } else {

        this.enter();

    }
};

State.prototype.preload = function() {};
State.prototype.create = function() {};
State.prototype.update = function(delta) {};
State.prototype.enter = function() {};
State.prototype.exit = function() {};

module.exports = State;
/* jshint node: true */
'use strict';

var util = require('util');
var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;
var EventEmitter = require('events').EventEmitter;

/**
 * @param {Game} game
 * @inherits EventEmitter
 * @constructor
 */
var State = function(game) {

    EventEmitter.call(this);

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

};

util.inherits(State, EventEmitter);

State.prototype.update = function(delta) {};
State.prototype.enter = function() {};
State.prototype.exit = function() {};

module.exports = State;
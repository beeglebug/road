/* jshint node: true */
'use strict';

var util = require('util');
var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;
var EventEmitter = require('events').EventEmitter;

/**
 * StateManager
 * @constructor
 */
var StateManager = function() {

    EventEmitter.call(this);

    /**
     * @type {Object.<string, State>}
     */
    this.states = {};

    /**
     * @type {State}
     */
    this.currentState = null;

    /**
     * @type {DisplayObjectContainer}
     */
    this.displayRoot = new DisplayObjectContainer();
};

util.inherits(StateManager, EventEmitter);

/**
 * @param {String} key A unique identifier for the state
 * @param {State} state The state to add
 */
StateManager.prototype.addState = function(key, state) {

    state.name = key;

    return this.states[key] = state;
};

/**
 * @param {String} key The unique identifier of the state
 * @returns {State|undefined}
 */
StateManager.prototype.getState = function(key) {

    return this.states[key];

};


/**
 * @param {String} key The unique identifier of the state
 * @returns {boolean}
 */
StateManager.prototype.setState = function(key) {

    var state = this.states[key];

    if(!state) { return false; }

    if(this.currentState) {
        this.currentState.exit();
    }

    this.currentState = state;

    this.currentState.enter();

    this.emit('state-changed', state);

    this.displayRoot.removeChildren();

    this.displayRoot.addChild(this.currentState.displayRoot);
};

StateManager.prototype.update = function(delta) {

    if(this.currentState === null) { return; }

    this.currentState.update(delta);
};

module.exports = StateManager;
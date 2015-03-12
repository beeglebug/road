/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;

/**
 * StateManager
 * @constructor
 */
var StateManager = function() {

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

/**
 * @param {String} key A unique identifier for the state
 * @param {State} state The state to add
 */
StateManager.prototype.addState = function(key, state) {

    state.name = key;

    this.states[key] = state;
};

/**
 * @param {String} key The unique identifier of the state
 * @returns {boolean}
 */
StateManager.prototype.setState = function(key) {

    var state = this.states[key];

    if(!state) { return false; }

    if(this.currentState) {
        this.currentState.shutdown();
    }

    this.currentState = state;

    this.currentState.boot();

    this.displayRoot.removeChildren();

    this.displayRoot.addChild(this.currentState.displayRoot);
};

StateManager.prototype.update = function(delta) {

    if(this.currentState === null) { return; }

    this.currentState.update(delta);
};

module.exports = StateManager;
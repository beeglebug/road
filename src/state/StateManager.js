/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;

/**
 * StateManager
 * @constructor
 */
var StateManager = function() {

    this.states = {};

    this.currentState = null;

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

    this.currentState = state;

    this.currentState.init();

    this.displayRoot.removeChildren();

    this.displayRoot.addChild(this.currentState.displayRoot);
};

StateManager.prototype.update = function(delta) {

    if(this.currentState === null) { return; }

    this.currentState.update(delta);
};

module.exports = StateManager;
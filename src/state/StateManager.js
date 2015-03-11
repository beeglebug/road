/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;

var StateManager = function() {

    this.currentState = null;

    this.displayRoot = new DisplayObjectContainer();
};

StateManager.prototype.setState = function(state) {

    this.currentState = state;

    this.displayRoot.removeChildren();

    this.displayRoot.addChild(this.currentState.displayRoot);
};

StateManager.prototype.update = function(delta) {

    if(this.currentState === null) { return; }

    this.currentState.update(delta);
};

module.exports = StateManager;
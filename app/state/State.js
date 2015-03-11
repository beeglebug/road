/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('pixi/pixi').DisplayObjectContainer;

var State = function() {

    this.displayRoot = new DisplayObjectContainer();

};

module.exports = State;
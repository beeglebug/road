/* jshint node: true */
'use strict';

var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;

var State = function() {

    this.displayRoot = new DisplayObjectContainer();

};

module.exports = State;
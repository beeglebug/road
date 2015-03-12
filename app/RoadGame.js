/* jshint node: true */
'use strict';

var Game = require('src/Game');
var TravelState = require('app/states/TravelState');

var RoadGame = function(width, height, selector) {

    Game.call(this, width, height, selector);

    this.stateManager.addState('travel', new TravelState());

    this.stateManager.setState('travel');
};

RoadGame.prototype = Object.create(Game.prototype);

module.exports = RoadGame;
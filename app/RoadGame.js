/* jshint node: true */
'use strict';

var Game = require('src/Game');
var TravelState = require('app/states/TravelState');
var DestinationState = require('app/states/DestinationState');

var RoadGame = function(width, height, selector) {

    Game.call(this, width, height, selector);

    this.stateManager.addState('destination', new DestinationState(this));
    this.stateManager.addState('travel', new TravelState(this));

    this.stateManager.setState('travel');
};

RoadGame.prototype = Object.create(Game.prototype);

module.exports = RoadGame;
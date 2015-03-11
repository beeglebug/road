/* jshint node: true */
'use strict';

var Game = require('src/Game');
var TravelState = require('app/states/TravelState');

var RoadGame = function() {

    Game.call(this);

    var state = new TravelState();

    this.stateManager.setState(state);
};

RoadGame.prototype = Object.create(Game.prototype);

module.exports = RoadGame;
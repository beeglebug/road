/* jshint node: true */
'use strict';

var Game = require('src/Game');
var MainMenuState = require('app/states/MainMenuState');
var MapState = require('app/states/MapState');
var TravelState = require('app/states/TravelState');
var DestinationState = require('app/states/DestinationState');

/**
 * @extends Game
 * @param width
 * @param height
 * @param selector
 * @constructor
 */
var RoadGame = function(width, height, selector) {

    Game.call(this, width, height, selector);

    this.stateManager.addState('main-menu', new MainMenuState(this));
    this.stateManager.addState('map', new MapState(this));
    this.stateManager.addState('travel', new TravelState(this));
    this.stateManager.addState('destination', new DestinationState(this));

    this.stateManager.setState('main-menu');
};

RoadGame.prototype = Object.create(Game.prototype);

module.exports = RoadGame;
/* jshint node: true */
'use strict';

var Game = require('src/Game');
var MainMenuState = require('app/states/MainMenuState');
var MapState = require('app/states/MapState');
var TravelState = require('app/states/TravelState');
var LocationState = require('app/states/LocationState');
var CompleteState = require('app/states/CompleteState');

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
    this.stateManager.addState('location', new LocationState(this));
    this.stateManager.addState('complete', new CompleteState(this));

    this.stateManager.setState('main-menu');
};

RoadGame.prototype = Object.create(Game.prototype);

RoadGame.prototype.arriveAtLocation = function() {

    var mapState = this.stateManager.getState('map');

    if(mapState.hasReachedDestination()) {
        mapState.reset();
        this.stateManager.setState('complete');
    } else {
        this.stateManager.setState('location');
    }

};






module.exports = RoadGame;
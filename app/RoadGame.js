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
    var mapState = this.stateManager.addState('map', new MapState(this));
    var travelState = this.stateManager.addState('travel', new TravelState(this));
    var locationState = this.stateManager.addState('location', new LocationState(this));
    this.stateManager.addState('complete', new CompleteState(this));

    // tie the states together
    mapState.addEventListener('start-travel', function(origin, destination) {
        travelState.setLocations(origin, destination);
        this.stateManager.setState('travel');
    }.bind(this));

    travelState.addEventListener('arrived', function(location) {
        mapState.currentLocation = location;
        locationState.location = location;
        this.stateManager.setState('location');
    }.bind(this));

    this.stateManager.setState('main-menu');
};

RoadGame.prototype = Object.create(Game.prototype);




module.exports = RoadGame;
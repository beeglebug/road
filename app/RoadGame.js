/* jshint node: true */
'use strict';

var util = require('util');
var Game = require('src/Game');
var MainMenuState = require('app/states/MainMenuState');
var MapState = require('app/states/MapState');
var TravelState = require('app/states/TravelState');
var LocationState = require('app/states/LocationState');
var ConversationState = require('app/states/ConversationState');
var CompleteState = require('app/states/CompleteState');
var DialogueParser = require('src/dialogue/DialogueParser');
var Debug = require('src/Debug');

/**
 * @extends Game
 * @param width
 * @param height
 * @param selector
 * @constructor
 */
var RoadGame = function(width, height, selector) {

    Game.call(this, width, height, selector);

    this.loader.add([
        'fonts/basis33-white.fnt',
        'fonts/basis33-black.fnt'
    ]);

    // test dialog parsing
    var data = require('app/data/dialogue/test');
    var dialogue = DialogueParser.parse(data);
    console.log(dialogue);
};

util.inherits(RoadGame, Game);

RoadGame.prototype.boot = function() {

    var debug = new Debug(this);
    this.stage.addChild(debug);

    window.onkeyup = function(e) {
        if (e.keyCode == 223) {
            debug.toggle();
        }
    };

    var mainMenuState = this.stateManager.addState('main-menu', new MainMenuState(this));
    var mapState = this.stateManager.addState('map', new MapState(this));
    var travelState = this.stateManager.addState('travel', new TravelState(this));
    var locationState = this.stateManager.addState('location', new LocationState(this));
    var conversationState = this.stateManager.addState('conversation', new ConversationState(this));
    var completeState = this.stateManager.addState('complete', new CompleteState(this));

    // tie the states together

    mainMenuState.addListener('start-game', function() {

        this.stateManager.setState('map');

    }.bind(this));

    mapState.addListener('start-travel', function(origin, destination) {

        travelState.setLocations(origin, destination);

        this.stateManager.setState('travel');

    }.bind(this));

    travelState.addListener('arrived', function(location) {

        mapState.currentLocation = location;
        locationState.location = location;

        if(location === mapState.targetLocation) {

            this.stateManager.setState('complete');

        } else {

            this.stateManager.setState('location');

        }

    }.bind(this));

    locationState.addListener('leave', function() {

        this.stateManager.setState('map');

    }.bind(this));

    locationState.addListener('talk', function() {

        this.stateManager.setState('conversation');

    }.bind(this));


    conversationState.addListener('finish', function() {

        this.stateManager.setState('location');

    }.bind(this));

    completeState.addListener('restart', function() {

        mapState.reset();

        this.stateManager.setState('main-menu');

    }.bind(this));

    this.stateManager.setState('main-menu');
};


module.exports = RoadGame;
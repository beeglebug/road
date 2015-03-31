/* jshint node: true */
'use strict';

var util = require('util');
var State = require('src/state/State');
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Button = require('src/Button');

/**
 * @extends State
 * @param game
 * @constructor
 */
var LocationState = function(game) {

    State.call(this, game);

    this.name = 'location';

    this.location = null;

    this.locationLabel = new BitmapText('', { font: 'basis33-black' });
    this.locationLabel.position.set(400, 300);

    var mapButton = new Button('map', function() {

        this.emit('map');

    }.bind(this), 100, 50);

    mapButton.position.set(10, 10);

    var vehiclesButton = new Button('vehicles', function() {

        this.emit('vehicles');

    }.bind(this), 100, 50);

    vehiclesButton.position.set(120,10);

    this.displayRoot.addChild(vehiclesButton);


    var talkButton = new Button('talk', function() {

        this.emit('talk');

    }.bind(this), 100, 50);

    talkButton.position.set(500, 500);

    this.displayRoot.addChild(this.locationLabel);
    this.displayRoot.addChild(mapButton);
    this.displayRoot.addChild(talkButton);

};

util.inherits(LocationState, State);

LocationState.prototype.enter = function() {

    this.locationLabel.setText(this.location.name);
};

module.exports = LocationState;
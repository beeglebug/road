/* jshint node: true */
'use strict';

var util = require('util');
var State = require('src/state/State');
var Graphics = require('lib/pixi/pixi').Graphics;
var BitmapText = require('lib/pixi/pixi').BitmapText;

/**
 * @extends State
 * @param game
 * @constructor
 */
var TravelState = function(game) {

    State.call(this, game);

    this.origin = null;
    this.destination = null;
    this.arrived = false;
    this.progress = 0;
    this.max = 780;

    this.originLabel = new BitmapText('origin', {font: 'basis33'});
    this.originLabel.position.set(0, 80);

    this.destinationLabel = new BitmapText('destination', {font: 'basis33', align:'right'});
    this.destinationLabel.position.set(800, 80);

    var line = new Graphics();
    line.lineStyle(1, 0xAAAAAA);
    line.moveTo(0, 110);
    line.lineTo(800, 110);

    this.marker = new Graphics();
    this.marker.beginFill(0x444400);
    this.marker.drawRect(0, 0, 20, 10);
    this.marker.position.set(this.progress, 100);

    this.displayRoot.addChild(this.originLabel);
    this.displayRoot.addChild(this.destinationLabel);
    this.displayRoot.addChild(line);
    this.displayRoot.addChild(this.marker);

};

util.inherits(TravelState, State);

TravelState.prototype.setLocations = function(origin, destination) {
    this.origin = origin;
    this.destination = destination;
};

TravelState.prototype.enter = function() {

    this.arrived = false;
    this.progress = 0;
    this.originLabel.setText(this.origin.name);
    this.destinationLabel.setText(this.destination.name);

    // right align
    this.destinationLabel.position.x = 800 - this.destinationLabel.textWidth;
};

TravelState.prototype.update = function(delta) {

    var speed = 10;

    if(!this.arrived) {

        this.progress += speed;
        this.marker.position.x = this.progress;

        if (this.progress >= this.max) {
            this.arrived = true;
            this.emit('arrived', this.destination);
        }
    }
};

module.exports = TravelState;
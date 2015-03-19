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

    this.location = null;
};

util.inherits(LocationState, State);

LocationState.prototype.create = function() {

    this.locationLabel = new BitmapText('', { font: 'basis33' });
    this.locationLabel.position.set(400, 300);

    var leaveButton = new Button('leave', function() {

        this.emit('leave');

    }.bind(this), 100, 50);

    leaveButton.position.set(300, 500);

    var talkButton = new Button('talk', function() {

        this.emit('talk');

    }.bind(this), 100, 50);

    talkButton.position.set(500, 500);

    this.displayRoot.addChild(this.locationLabel);
    this.displayRoot.addChild(leaveButton);
    this.displayRoot.addChild(talkButton);
};

LocationState.prototype.enter = function() {

    this.locationLabel.setText(this.location.name);
};

module.exports = LocationState;
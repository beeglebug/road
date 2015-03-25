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
var ConversationState = function(game) {

    State.call(this, game);

    this.name = 'conversation';

    this.talkingToLabel = new BitmapText('talking to someone', { font: 'basis33-black' });
    this.talkingToLabel.position.set(400, 300);

    var talkButton = new Button('finish', function() {

        this.emit('finish');

    }.bind(this), 100, 50);

    talkButton.position.set(400, 500);

    this.displayRoot.addChild(talkButton);
    this.displayRoot.addChild(this.talkingToLabel);
};

util.inherits(ConversationState, State);

module.exports = ConversationState;
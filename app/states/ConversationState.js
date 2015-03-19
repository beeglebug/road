/* jshint node: true */
'use strict';

var util = require('util');
var State = require('src/state/State');
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Rectangle = require('lib/pixi/pixi').Rectangle;

/**
 * @extends State
 * @param game
 * @constructor
 */
var ConversationState = function(game) {

    State.call(this, game);
};

ConversationState.prototype = Object.create(State.prototype);

ConversationState.prototype.create = function() {

    this.displayRoot.interactive = true;
    this.displayRoot.hitArea = new Rectangle(0, 0, 800, 600);

    this.displayRoot.click = function() {

        this.emit('finished');

    }.bind(this);

};

ConversationState.prototype.enter = function() {

    this.displayRoot.removeChildren();

    var text1 = new BitmapText('talking', { font: 'basis33' });
    text1.position.set(400, 300);
    this.displayRoot.addChild(text1);

    var text2 = new BitmapText('click to finish', { font: 'basis33' });
    text2.position.set(400, 350);
    this.displayRoot.addChild(text2);

};

module.exports = ConversationState;
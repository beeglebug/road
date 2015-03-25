/* jshint node: true */
'use strict';

var util = require('util');
var State = require('src/state/State');
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Rectangle = require('lib/pixi/pixi').Rectangle;
var Button = require('src/Button');

/**
 * @extends State
 * @param game
 * @constructor
 */
var CompleteState = function(game) {

    State.call(this, game);

    var talkButton = new Button('restart', function() {

        this.emit('restart');

    }.bind(this), 100, 50);

    talkButton.position.set(300, 400);
    this.displayRoot.addChild(talkButton);

    var text1 = new BitmapText('finished', { font: 'basis33' });
    text1.position.set(300, 300);
    this.displayRoot.addChild(text1);

};

util.inherits(CompleteState, State);


module.exports = CompleteState;
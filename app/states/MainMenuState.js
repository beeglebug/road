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
var MainMenuState = function(game) {

    State.call(this, game);

    this.displayRoot.interactive = true;
    this.displayRoot.hitArea = new Rectangle(0, 0, 800, 600);

    // @todo replace with button
    this.displayRoot.click = function() {

        this.emit('start-game');

    }.bind(this);

    var text = new BitmapText('click to start', { font: 'basis33' });

    text.position.set(400,300);

    this.displayRoot.addChild(text);
};

util.inherits(MainMenuState, State);


module.exports = MainMenuState;
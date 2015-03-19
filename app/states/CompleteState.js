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
var CompleteState = function(game) {

    State.call(this, game);
};

util.inherits(CompleteState, State);

CompleteState.prototype.create = function() {

    this.displayRoot.interactive = true;
    this.displayRoot.hitArea = new Rectangle(0, 0, 800, 600);

    // @todo replace with button
    this.displayRoot.click = function() {

        this.game.stateManager.setState('main-menu');

    }.bind(this);

    var text1 = new BitmapText('finished', { font: 'basis33' });
    text1.position.set(400, 300);
    this.displayRoot.addChild(text1);

    var text2 = new BitmapText('click to return to menu', { font: 'basis33' });
    text2.position.set(400, 350);
    this.displayRoot.addChild(text2);
};

module.exports = CompleteState;
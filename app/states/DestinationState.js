/* jshint node: true */
'use strict';

var State = require('src/state/State');
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Rectangle = require('lib/pixi/pixi').Rectangle;

/**
 * @extends State
 * @param game
 * @constructor
 */
var DestinationState = function(game) {

    State.call(this, game);
};

DestinationState.prototype = Object.create(State.prototype);

DestinationState.prototype.init = function() {

    this.displayRoot.interactive = true;
    this.displayRoot.hitArea = new Rectangle(0, 0, 800, 600);

    this.displayRoot.click = function() {

        this.game.stateManager.setState('map');

    }.bind(this);

    var text1 = new BitmapText('arrived', { font: 'basis33' });
    text1.position.set(400, 300);
    this.displayRoot.addChild(text1);

    var text2 = new BitmapText('click to go to map', { font: 'basis33' });
    text2.position.set(400, 350);
    this.displayRoot.addChild(text2);
};

module.exports = DestinationState;
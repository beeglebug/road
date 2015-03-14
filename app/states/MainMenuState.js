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
var MainMenuState = function(game) {

    State.call(this, game);
};

MainMenuState.prototype = Object.create(State.prototype);

MainMenuState.prototype.preload = function() {

    this.loader.add('fonts/basis33.fnt');

};

MainMenuState.prototype.create = function() {

    this.displayRoot.interactive = true;
    this.displayRoot.hitArea = new Rectangle(0, 0, 800, 600);

    this.displayRoot.click = function() {

        this.game.stateManager.setState('map');

    }.bind(this);

    var text = new BitmapText('click to start', { font: 'basis33' });

    text.position.set(400,300);

    this.displayRoot.addChild(text);
};

module.exports = MainMenuState;
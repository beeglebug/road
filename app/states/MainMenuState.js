/* jshint node: true */
'use strict';

var util = require('util');
var State = require('src/state/State');
var Button = require('src/Button');

/**
 * @extends State
 * @param game
 * @constructor
 */
var MainMenuState = function(game) {

    State.call(this, game);

    this.name = 'main menu';

    var talkButton = new Button('start', function() {

        this.emit('start-game');

    }.bind(this), 100, 50);

    talkButton.position.set(300, 300);

    this.displayRoot.addChild(talkButton);
};

util.inherits(MainMenuState, State);


module.exports = MainMenuState;
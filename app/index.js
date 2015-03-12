/* jshint node: true */
'use strict';

var RoadGame = require('app/RoadGame');

var game = new RoadGame(800, 600);

game.addToDom(document.querySelector('#game'));

game.start();

// hoist for debugging
window.game = game;

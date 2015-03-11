var Game = require('Game');
var State = require('state/State');


var game = new Game();
var beginState = new State();

game.stateManager.setState(beginState);
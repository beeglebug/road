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
var VehiclesState = function(game) {

    State.call(this, game);

    this.name = 'vehicles';

    var backButton = new Button('back', function() {

        this.emit('back');

    }.bind(this), 100, 50);

    backButton.position.set(10, 10);

    this.displayRoot.addChild(backButton);
};

util.inherits(VehiclesState, State);


module.exports = VehiclesState;
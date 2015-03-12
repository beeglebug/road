/* jshint node: true */
'use strict';

var State = require('src/state/State');

var DestinationState = function(game) {

    State.call(this, game);
};

DestinationState.prototype = Object.create(State.prototype);

DestinationState.prototype.init = function() {

    console.log('got there');

};

DestinationState.prototype.update = function(delta) {


};

module.exports = DestinationState;
/* jshint node: true */
'use strict';

var State = require('src/state/State');

var TravelState = function() {

    State.call(this);
};

TravelState.prototype = Object.create(State.prototype);

module.exports = TravelState;
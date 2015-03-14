/* jshint node: true */
'use strict';

var State = require('src/state/State');
var Graphics = require('lib/pixi/pixi').Graphics;
var MapLocation = require('app/map/MapLocation');
var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;
var BitmapText = require('lib/pixi/pixi').BitmapText;

/**
 * @extends State
 * @param game
 * @constructor
 */
var MapState = function (game) {

    State.call(this, game);

    var l1 = new MapLocation(100, 300, 'location 1');
    var l2 = new MapLocation(300, 250, 'location 2');
    var l3 = new MapLocation(600, 320, 'location 3');

    l1.connections = [l2];
    l2.connections = [l1,l3];
    l3.connections = [l2];

    this.locations = [l1,l2,l3];

    this.currentLocation = this.locations[0];
};

MapState.prototype = Object.create(State.prototype);

MapState.prototype.draw = function () {

    this.displayRoot.removeChildren();

    var line = new Graphics();
    line.lineStyle(1, 0x000000);
    this.displayRoot.addChild(line);

    this.locations.forEach(function (location, ix) {

        if (ix == 0) {
            line.moveTo(location.position.x, location.position.y);
        } else {
            line.lineTo(location.position.x, location.position.y);
        }

        var container = new DisplayObjectContainer();

        var gfx = new Graphics();
        if (location == this.currentLocation) {
            gfx.beginFill(0x008800);
        } else {
            gfx.beginFill(0x888888);
        }

        gfx.drawRect(-10, -10, 20, 20);

        gfx.interactive = true;
        gfx.buttonMode = true;
        gfx.mouseover = function() {
            this.tint = 0x999999;
        };
        gfx.mouseout = function() {
            this.tint = 0xFFFFFF;
        };
        gfx.click = function() {
            if(location.isConnectedTo(this.currentLocation)) {
                this.emit('start-travel', this.currentLocation, location);
            }
        }.bind(this);

        container.addChild(gfx);

        var text = new BitmapText(location.name, {font: 'basis33'});
        container.addChild(text);
        text.position.set(0, 20);

        this.displayRoot.addChild(container);

        container.position.set(location.position.x, location.position.y);

    }, this);
};

MapState.prototype.enter = function () {

    this.draw();

};

MapState.prototype.hasReachedDestination = function () {
    return this.active === this.destination;
};

MapState.prototype.update = function (delta) {
};


module.exports = MapState;
/* jshint node: true */
'use strict';

var util = require('util');
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
};

util.inherits(MapState, State);

MapState.prototype.create = function() {

    var l1 = new MapLocation(100, 300, 'location 1');
    var l2 = new MapLocation(300, 250, 'location 2');
    var l3 = new MapLocation(500, 180, 'location 3');
    var l4 = new MapLocation(500, 320, 'location 4');
    var l5 = new MapLocation(700, 300, 'location 5');

    l1.connections = [l2];
    l2.connections = [l1,l3,l4];
    l3.connections = [l2,l5];
    l4.connections = [l2,l5];

    this.locations = [l1,l2,l3,l4,l5];

    this.currentLocation = l1;
    this.targetLocation = l5;
};

MapState.prototype.draw = function () {

    this.displayRoot.removeChildren();

    var line = new Graphics();
    line.lineStyle(1, 0x000000);
    this.displayRoot.addChild(line);

    this.locations.forEach(function (location, ix) {

        location.connections.forEach(function(connection) {
            line.moveTo(location.position.x, location.position.y);
            line.lineTo(connection.position.x, connection.position.y);
        });

        var container = new DisplayObjectContainer();

        var gfx = new Graphics();
        if (location == this.currentLocation) {
            gfx.beginFill(0x008800);
        } else {
            gfx.beginFill(0x888888);
        }

        gfx.drawCircle(0, 0, 10);

        gfx.interactive = true;
        gfx.buttonMode = true;
        gfx.mouseover = function() {
            this.tint = 0x999999;
        };
        gfx.mouseout = function() {
            this.tint = 0xFFFFFF;
        };
        gfx.click = function() {
            if(this.currentLocation.isConnectedTo(location)) {
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


module.exports = MapState;
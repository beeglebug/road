/* jshint node: true */
'use strict';

var util = require('util');
var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Graphics = require('lib/pixi/pixi').Graphics;

/**
 * @param text
 * @param callback
 * @param width
 * @param height
 * @constructor
 * @extends PIXI.DisplayObjectContainer
 */
var Button = function(text, callback, width, height) {

    DisplayObjectContainer.call(this);

    this.buttonMode = true;

    this.text = new BitmapText(text, { font: 'basis33-black' });

    var margin = 10;

    width = width || this.text.textWidth + (margin * 2);
    height = height || this.text.textHeight + (margin * 2);

    this.background = new Graphics();
    this.background.beginFill(0xCCCCCC);
    this.background.drawRect(0, 0, width, height);

    this.text.position.set(margin, margin);

    this.addChild(this.background);
    this.addChild(this.text);

    this.callback = callback;

    this.interactive = true;

    this.click = this.onClick;
    this.mouseover = this.onMouseOver;
    this.mouseout = this.onMouseOut;
    this.mousedown = this.onMouseDown;
    this.mouseup = this.onMouseUp;
};

util.inherits(Button, DisplayObjectContainer);

Button.prototype.setText = function(text) {
    this.text.setText(text);
};

Button.prototype.onClick = function(e) {
    this.callback();
};

Button.prototype.onMouseOver = function(e) {
    this.background.tint = 0xEEEEEE;
};

Button.prototype.onMouseOut = function(e) {
    this.background.tint = 0xFFFFFF;
};

Button.prototype.onMouseDown = function(e) {
    this.background.tint = 0xDDDDDD;
};

Button.prototype.onMouseUp = function(e) {
    this.background.tint = 0xEEEEEE;
};

module.exports = Button;
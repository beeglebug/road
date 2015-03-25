var util = require('util');
var DisplayObjectContainer = require('lib/pixi/pixi').DisplayObjectContainer;
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Graphics = require('lib/pixi/pixi').Graphics;

var Debug = function(game) {

    DisplayObjectContainer.call(this);

    this.stateName = new BitmapText('state: statename', { font: 'basis33-white' });

    this.background = new Graphics();
    this.background.beginFill(0x000000);
    this.background.alpha = 0.8;
    this.background.drawRect(0, 0, game.width, 50);

    game.stateManager.addListener('state-changed', function(state) {

        this.stateName.setText('state: ' + state.name);

    }.bind(this));

    this.visible = false;

    this.addChild(this.background);
    this.addChild(this.stateName);
};

util.inherits(Debug, DisplayObjectContainer);

Debug.prototype.toggle = function() {
    this.visible = !this.visible;
};

Debug.prototype.show = function() {
    this.visible = true;
};

Debug.prototype.hide = function() {
    this.visible = true;
};

module.exports = Debug;
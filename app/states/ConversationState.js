/* jshint node: true */
'use strict';

var util = require('util');
var State = require('src/state/State');
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Button = require('src/Button');
var clone = require('clone');

/**
 * @extends State
 * @param game
 * @constructor
 */
var ConversationState = function(game) {

    State.call(this, game);

    this.name = 'conversation';

    // temp fake game state
    this.state = {
        dialogue : {
            pc : {},
            npc : {
                friendly: false
            }
        }
    };

    this.title = new BitmapText('talking to someone', { font: 'basis33-black' });
    this.title.position.set(50, 50);

    this.text = new BitmapText('some text', { font: 'basis33-black' });
    this.text.position.set(50, 200);

    var self = this;

    this.buttons = [
        new Button('option 0', function() {
            self.selectOption(this.option);
        }, 100, 50),
        new Button('option 1', function() {
            self.selectOption(this.option);
        }, 100, 50),
        new Button('option 2', function() {
            self.selectOption(this.option);
        }, 100, 50),
    ];

    this.finishButton = new Button('finish', function() {
        this.emit('end-conversation');
    }.bind(this), 100, 50);

    this.finishButton.position.set(50, 400);
    this.buttons[0].position.set(50, 400);
    this.buttons[1].position.set(250, 400);
    this.buttons[2].position.set(450, 400);

    this.displayRoot.addChild(this.finishButton);
    this.displayRoot.addChild(this.buttons[0]);
    this.displayRoot.addChild(this.buttons[1]);
    this.displayRoot.addChild(this.buttons[2]);
    this.displayRoot.addChild(this.text);
    this.displayRoot.addChild(this.title);
};

util.inherits(ConversationState, State);

ConversationState.prototype.enter = function() {

    this.data = require('app/data/dialogue/test');

    this.state.dialogue.variables = clone(this.data._variables);

    this.setNode(this.data._root);
};

ConversationState.prototype.setNode = function(node) {

    if(typeof node === 'function') {
        node = node(this.state);
    }

    this.currentNode = node;

    this.text.setText(node.text);

    this.finishButton.visible = false;

    this.buttons.forEach(function(button) {
        button.visible = false;
    }.bind(this));

    if(node.options) {
        var option, text, i = 0;
        for(option in node.options) {
            text = node.options[option];
            this.buttons[i].setText(text);
            this.buttons[i].visible = true;
            this.buttons[i].option = option;
            i++;
        }

    } else {
        this.finishButton.visible = true;
    }
};

ConversationState.prototype.selectOption = function(option) {

    var node = this.data[option];

    this.setNode(node);
};

module.exports = ConversationState;
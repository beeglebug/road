/* jshint node: true */
'use strict';

var util = require('util');
var State = require('src/state/State');
var BitmapText = require('lib/pixi/pixi').BitmapText;
var Button = require('src/Button');
var DialogueNode = require('src/dialogue/DialogueNode');

/**
 * @extends State
 * @param game
 * @constructor
 */
var ConversationState = function(game) {

    State.call(this, game);

    this.name = 'conversation';

    // internal dialogue state
    this.state = {
        friendly: true
    };

    this.title = new BitmapText('talking to someone', { font: 'basis33-black' });
    this.title.position.set(50, 50);

    this.text = new BitmapText('some text', { font: 'basis33-black' });
    this.text.position.set(50, 200);

    this.buttons = [
        new Button('choice 1', function() {
            this.selectChoice(0);
        }.bind(this), 100, 50),
        new Button('choice 2', function() {
            this.selectChoice(1);
        }.bind(this), 100, 50),
    ];

    this.finishButton = new Button('finish', function() {
        this.emit('end-conversation');
    }.bind(this), 100, 50);

    this.finishButton.position.set(50, 400);
    this.buttons[0].position.set(50, 400);
    this.buttons[1].position.set(250, 400);

    this.displayRoot.addChild(this.finishButton);
    this.displayRoot.addChild(this.buttons[0]);
    this.displayRoot.addChild(this.buttons[1]);
    this.displayRoot.addChild(this.text);
    this.displayRoot.addChild(this.title);
};

util.inherits(ConversationState, State);

ConversationState.prototype.enter = function() {

    var data = require('app/data/dialogue/test');
    this.data = {};

    for (var key in data) {
        if (data.hasOwnProperty(key)) {

            this.data[key] = new DialogueNode(data[key], key);
        }
    }
    this.setNode(this.data[0]);
};

ConversationState.prototype.setNode = function(node) {

    this.currentNode = node;

    this.text.setText(node.text);

    this.finishButton.visible = false;

    this.buttons.forEach(function(button) {
        button.visible = false;
    }.bind(this));

    if(node.choices) {
        node.choices.forEach(function(choice, ix) {
            var text = this.data[choice].text;
            this.buttons[ix].setText(text);
            this.buttons[ix].visible = true;
        }.bind(this));
    }

    if(node.final) {
        this.finishButton.visible = true;
    }
};

ConversationState.prototype.selectChoice = function(choice) {

    var target = this.currentNode.choices[choice];

    var node = this.data[target];

    var next;

    if(node.next) {
        next = node.next;
    }

    if(node.test) {
        next = node.test(this.state);
    }

    this.setNode(this.data[next]);
};

module.exports = ConversationState;
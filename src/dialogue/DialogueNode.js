'use strict';

var DialogueNode = function(id, text) {

    this.id = id;
    this.text = text;
    this.choices = null;
    this.next = null;

};

module.exports = DialogueNode;
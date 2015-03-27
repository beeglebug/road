'use strict';

var DialogueNode = function(data, id) {

    this.id = id;
    this.text = data.text || null;
    this.choices = data.choices || null;
    this.next = data.next || null;
    this.final = data.final || false;

};

module.exports = DialogueNode;
'use strict';

var DialogueNode = require('src/dialogue/DialogueNode');

var DialogueParser = function() {};

DialogueParser.prototype.parse = function(data) {

    var parsed = {};

    Object.keys(data).forEach(function(id) {

        var fields = data[id];

        var node = new DialogueNode(id, fields[0]);

        if(fields[1] !== undefined) {

            if (Array.isArray(fields[1])) {

                node.choices = fields[1];

            } else {

                node.next = fields[1];
            }
        }

        parsed[id] = node;

    });

    return parsed;
};

module.exports = new DialogueParser();
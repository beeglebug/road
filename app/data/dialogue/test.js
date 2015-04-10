'use strict';

var self = module.exports = {

    _variables : {
        pardons : 0
    },

    _root : {
        text: 'hi how are you?',
        options: {
            good : 'fine thanks',
            notGood : 'not good',
            pardon : 'pardon?'
        }
    },

    pardon : function(state) {
        if(++state.dialogue.variables.pardons < 3) {
            return self._root;
        } else {
            return self.goAway;
        }
    },

    goAway : {
        text : 'go away'
    },

    good : {
        text : 'glad to hear it'
    },

    notGood : function(state) {
        if(state.dialogue.npc.friendly) {
            return self.sorry;
        } else {
            return self.neverMind;
        }
    },

    sorry : {
        text : 'sorry to hear that'
    },

    neverMind : {
        text : 'nevermind'
    }


};
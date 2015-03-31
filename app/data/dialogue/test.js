module.exports = {

    0: {
        text: 'how are you?',
        choices: [1, 2]
    },
    1: {
        text: 'fine thanks',
        next: 3
    },
    2: {
        text: 'not so good',
        test: function(state) {
            if(state.friendly) {
                return 4;
            }
            return 9;
        }
    },
    3: {
        text: 'cool, glad to hear it',
        final: true
    },
    4: {
        text: 'sorry to hear that, anything I can do?',
        choices: [5,6]
    },
    5: {
        text: 'nah, not really',
        next: 7
    },
    6: {
        text: 'give me free stuff?',
        next: 8
    },
    7: {
        text: 'oh well',
        final: true
    },
    8: {
        text: 'nice try',
        final: true
    },
    9 : {
        text: 'lol good',
        final: true
    }

};
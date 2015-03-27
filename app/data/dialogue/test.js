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
        next: 4
    },
    3: {
        text: 'good, have a nice day',
        final: true
    },
    4: {
        text: 'sorry to hear that',
        final: true
    }

};
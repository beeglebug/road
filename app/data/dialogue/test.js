module.exports = {

    0: {
        text: 'how are you?',
        choices: [1, 2]
    },
    1: {
        text: 'fine thanks',
        link: 3
    },
    2: {
        text: 'not so good',
        link: 4
    },
    3: {
        text: 'good, have a nice day',
        finish: true
    },
    4: {
        text: 'sorry to hear that',
        finish: true
    }

};
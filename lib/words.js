const wordList = require('./wordList');

function words() {
    const words = wordList.slice();
    const set = [];
    for(let i = 0; i < 25; i++) {
        set.push(words.splice((Math.floor(Math.random() * words.length)), 1)[0]);
    }
    return { set };
}

module.exports = words;
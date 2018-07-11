const wordList = require('./wordList');

function words() {
    const words = wordList.slice(0, 25);
    return { words };
}

module.exports = words;
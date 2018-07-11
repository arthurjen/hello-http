const facts = [
    'HTTP adds structure the bytes being sent through a TCP connection.',
    'Response status codes let the client know if a specific HTTP request was handled successfully.',
    'The HTTP method POST sends a request containing a body to the server!'
];

const randomFactoid = () => {
    let factoid = {};
    factoid.fact = facts[Math.floor(Math.random() * facts.length)];
    return factoid;
};

module.exports = randomFactoid;
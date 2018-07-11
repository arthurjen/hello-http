const { parse } = require('url');

const facts = [
    'something about http',
    'something else about http',
    'http rocks!'
];

const randomFactoid = () => {
    let factoid = {};
    factoid.fact = facts[Math.floor(Math.random() * facts.length)];
    return factoid;
};


module.exports = (req, res) => {
    const url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);

    if(parts[0] === 'happy-birthday') {
        const name = parts[1] || 'Stranger';
        const message = url.query.custom || '';
        res.setHeader('Content-Type', 'text/html');
        res.write(`<p>Happy birthday, <strong>${name}!</strong> ${message}</p>`);
        res.end();
    }
    else if(parts[0] === 'fact') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(randomFactoid()));
    }

};
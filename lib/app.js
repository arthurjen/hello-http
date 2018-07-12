const { parse } = require('url');
const randomFactoid = require('./randomFactoid');
const words = require('./words');
const bodyParser = require('./bodyParser');


module.exports = (req, res) => {
    const url = parse(req.url, true);
    const parts = url.pathname.split('/').slice(1);

    if(parts[0] === '') {
        res.end('<h1>H E L L O <br> W O R L D</h1>');
    }
    else if(parts[0] === 'happy-birthday') {
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
    else if(parts[0] === 'codenames') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(words()));
    }
    else if(parts[0] === 'caps' && req.method === 'POST') {
        bodyParser(req)
            .then(body => {
                let caps = '';
                if(url.query.option === 'all') {
                    caps = body[0].toUpperCase();
                }
                else if(url.query.option === 'last') {
                    caps = body[0]
                        .split(' ')
                        .map(n => n.slice(0, (n.length - 1)) + n.slice(n.length - 1).toUpperCase())
                        .join(' ');
                }
                else {
                    const index = url.query.option || 0;
                    caps = body[0]
                        .split(' ')
                        .map(n => {
                            if(n.length > index) {
                                const word = n.split('');
                                word[index] = word[index].toUpperCase();
                                return word.join('');
                            }
                            else return n;
                        })
                        .join(' ');
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ caps }));
            })
            .catch(() => {
                res.statusCode = 500;
                res.end();
            });
    }
    else {
        res.statusCode = 404;
        res.end(`CANNOT ${req.method} ${url.pathname}`);
    }

};
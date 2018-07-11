
module.exports = function bodyParser(req) {
    return new Promise((resolve, reject) => {
        // if(req.headers['Content-Type'] !== 'application/json') {
        //     return reject('not json');
        // }

        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            resolve(JSON.parse(body));
        });
        req.on('error', reject);
    });
};
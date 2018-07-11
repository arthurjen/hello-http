const http = require('http');
const app = require('./lib/app');

const server = http.createServer(app);

const PORT = 8888;

server.listen(PORT, () => {
    console.log('server running on', server.address().port);
});
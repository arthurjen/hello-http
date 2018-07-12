const { assert } = require('chai');
const EventEmitter = require('events');
const bodyParser = require('../lib/bodyParser');

describe('body parser', () => {
    it('returns a deserialized object from stream', () => {
        const obj = { name: 'test' };
        const req = new EventEmitter();
        req.headers = {
            'Content-Type': 'application/json'
        };

        const promise = bodyParser(req)
            .then(body => {
                assert.deepEqual(body, obj);
            });
        
        req.emit('data', JSON.stringify(obj));
        req.emit('end');

        return promise;
    });
});
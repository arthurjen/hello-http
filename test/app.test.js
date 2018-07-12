const chai = require('chai');
const { assert } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');

describe('http server', () => {

    it('greeting when no path', () => {
        return chai.request(app)
            .get('')
            .then(res => {
                assert.equal(res.text, '<h1>H E L L O <br> W O R L D</h1>');
            });
    });

    it('responds with happy birthday', () => {
        return chai.request(app)
            .get('/happy-birthday/Seymour?custom=You%20ROCK')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '<p>Happy birthday, <strong>Seymour!</strong> You ROCK</p>');
            });
    });

    it('responds with Stranger if no name is given', () => {
        return chai.request(app)
            .get('/happy-birthday')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '<p>Happy birthday, <strong>Stranger!</strong> </p>');
            });
    });

    it('returns a random fact that has "http" in it', () => {
        return chai.request(app)
            .get('/fact')
            .then(res => {
                assert.include(res.body.fact, 'HTTP');
            });
    });

    it('returns a list of 25 random words', () => {
        return chai.request(app)
            .get('/codenames')
            .then(res => {
                const words = res.body.set;
                assert.equal(words.length, 25);
                words.forEach(w => assert.isString(w));
            });
    });

    it('capitalizes the first letter of each word provided', () => {
        return chai.request(app)
            .post('/caps')
            .set('Content-Type', 'application/json')
            .send(['capitalize these words please'])
            .then(res => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { caps: 'Capitalize These Words Please' });
            });
    });

    it('capitalizes all the letters of the string if option=all', () => {
        return chai.request(app)
            .post('/caps?option=all')
            .set('Content-Type', 'application/json')
            .send(['zip zop zippadee doo!'])
            .then(res => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { caps: 'ZIP ZOP ZIPPADEE DOO!' });
            });
    });

    it('capitalizes the nth letter of the string when option=n', () => {
        return chai.request(app)
            .post('/caps?option=2')
            .set('Content-Type', 'application/json')
            .send(['i am the best worst player'])
            .then(res => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { caps: 'i am thE beSt woRst plAyer' });
            });
    });

    it('capitalizes the last letter when option=last', () => {
        return chai.request(app)
            .post('/caps?option=last')
            .set('Content-Type', 'application/json')
            .send(['this is too much'])
            .then(res => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { caps: 'thiS iS toO mucH' });
            });
    });

    it('returns 404 error', () => {
        return chai.request(app)
            .get('/food')
            .then(res => {
                assert.equal(res.status, 404);
                assert.equal(res.text, 'CANNOT GET /food');
            });
    });
});
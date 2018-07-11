const chai = require('chai');
const { assert } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');

describe('http server', () => {
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

    it('returns a list of 25 words', () => {
        return chai.request(app)
            .get('/codenames')
            .then(res => {
                assert.equal(res.body.set.length, 25);
            });
    });
});
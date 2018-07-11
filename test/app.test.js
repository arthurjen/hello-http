const chai = require('chai');
const { assert } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');

describe('http server', () => {
    it('responds with happy birthday', () => {
        return chai.request(app)
            .get('/happy-birthday/Seymour')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '<p>Happy birthday, <strong>Seymour!</strong></p>');
            });
    });

    it('responds with Stranger if no name is given', () => {
        return chai.request(app)
            .get('/happy-birthday')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '<p>Happy birthday, <strong>Stranger!</strong></p>');
            });
    });
});
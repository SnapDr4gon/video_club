const supertest = require('supertest');
const app = require('../app');

let token = '';

beforeAll((done) => {
  supertest(app)
    .post('/login/')
    .send({
      "email": "jaredfm24@gmail.com",
      "password": "abcd1234"
    })
    .expect(200)
    .end(function(err, res) {
      if (err) {
        done(err);
      } else {
        token = res.body.token;
        done();
      }
    });
});

module.exports = {
  token
};
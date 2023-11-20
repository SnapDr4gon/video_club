const supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de autenticacion", () => {
    it("Obtener un login correcto", (done) => {
        supertest(app).post('/login/')
        .send({
            "email": "jaredfm24@gmail.com",
            "password": "abcd1234"
        })
        .expect(200)
        .end(function(err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
    });
});
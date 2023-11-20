const supertest = require('supertest');

const app = require('../app');

describe("Probar el controlador de Actores", () => {
    it("Deberia crear un Actor", (done) => {
        supertest(app).post('/actors')
        .send({
            "name": "Bradd",
            "lastName": "Pitt"
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
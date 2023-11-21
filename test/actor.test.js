const supertest = require('supertest');
const app = require('../app');
const { token } = require('./index.test'); // Importar el token generado

describe("Probar el controlador de Actores", () => {
  it("Obtener una lista de Actores", (done) => {
    supertest(app)
      .get('/actors/list/1')
      .set('Authorization', `Bearer ${token}`)
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
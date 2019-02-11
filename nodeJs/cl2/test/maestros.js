'use strict'

module.exports.test = (req) => {
  describe('/api/pub/maestros', () => {
    it('GET respond with 200 ok to maestros ', (done) => {
      req
        .get('/api/pub/maestros')
        .expect(200, done)
    })
    it('GET respond with 404 not found to maestros2 ', (done) => {
      req
        .get('/api/pub/maestros2')
        .expect(404, done)
    })
    it('GET respond with JSON to maestros ', (done) => {
      req
        .get('/api/pub/maestros')
        .expect({
          categoriasIngresos: ['Nomina', 'Ventas', 'Intereses Depositos'],
          categoriasGastos: ['Hipoteca', 'Compras', 'Impuestos']
        }, done)
    })
  })
}
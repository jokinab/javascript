'use strict'

module.exports.test = (req) => {
  // eslint-disable-next-line no-undef
  describe('/api/pub/maestros', () => {
    // eslint-disable-next-line no-undef
    it('GET respond with 200 ok to maestros ', (done) => {
      req
        .get('/api/pub/maestros')
        .expect(200, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 404 not found to maestros2 ', (done) => {
      req
        .get('/api/pub/maestros2')
        .expect(404, done)
    })
    // eslint-disable-next-line no-undef
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

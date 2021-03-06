'use strict'

const url = '/api/priv/movimientos'
const urlSesiones = '/api/pub/sesiones'
let sessionId

module.exports.test = (req) => {
  // eslint-disable-next-line no-undef
  describe(url, () => {
    // eslint-disable-next-line no-undef
    before((done) => {
      req
        .post(urlSesiones)
        .send({ email: 'a@b.c', password: '1234' })
        .end((err, res) => {
          if (err) return done(err)
          sessionId = res.body
          return done()
        })
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 401 unauthorized to no authenticated users', (done) => {
      req
        .get(url)
        .expect(401, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 204 no content to a new authenticated user', (done) => {
      req
        .get(url)
        .set('sessionId', sessionId)
        .expect(204, done)
    })
    // eslint-disable-next-line no-undef
    it('POST respond with 201 created to a new movimiento by authenticated user', (done) => {
      req
        .post(url)
        .send({ esIngreso: 1, importe: 199, fecha: new Date() })
        .set('sessionId', sessionId)
        .expect(201, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 200 ok to a pos-write user', (done) => {
      req
        .get(url)
        .set('sessionId', sessionId)
        .expect(200, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 200 ok to a real movimiento id', (done) => {
      req
        .get(`${url}/0`)
        .set('sessionId', sessionId)
        .expect(200, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 404 not found to a non real movimiento id', (done) => {
      req
        .get(`${url}/999`)
        .set('sessionId', sessionId)
        .expect(404, done)
    })
    // eslint-disable-next-line no-undef
    it('PUT respond with 200 ok to a modification on movimiento by authenticated user', (done) => {
      req
        .put(`${url}/0`)
        .send({ esIngreso: 1, importe: 299, fecha: new Date() })
        .set('sessionId', sessionId)
        .expect(200, done)
    })
    // eslint-disable-next-line no-undef
    it('PUT respond with 404 not found to a modification on movimiento a movimiento not found', (done) => {
      req
        .put(`${url}/999`)
        .send({ esIngreso: 1, importe: 299, fecha: new Date() })
        .set('sessionId', sessionId)
        .expect(404, done)
    })
    // eslint-disable-next-line no-undef
    it('DELETE respond with 204 no content to a deletion on movimiento by authenticated user', (done) => {
      req
        .delete(`${url}/0`)
        .set('sessionId', sessionId)
        .expect(204, done)
    })
    // eslint-disable-next-line no-undef
    it('DELETE respond with 404 not found to a deletion on movimiento not found', (done) => {
      req
        .delete(`${url}/999`)
        .set('sessionId', sessionId)
        .expect(404, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 204 no content to a new authenticated user', (done) => {
      req
        .get(url)
        .set('sessionId', sessionId)
        .expect(204, done)
    })
  })
}

'use strict'
const url = '/api/priv/saldos'
const urlS = '/api/pub/sesiones'
const urlM = '/api/priv/movimientos'
let sessionId

module.exports.test = (req) => {
  // eslint-disable-next-line no-undef
  describe(url, () => {
    // eslint-disable-next-line no-undef
    before((done) => {
      req
        .post(urlS)
        .send({ email: 'a@b.c', password: '1234' })
        .end((err, res) => {
          if (err) return done(err)
          sessionId = res.body
          return done()
        })
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 401 unauthorized to non authenticated users', (done) => {
      req
        .get(url)
        .expect(401, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with 204 ok to an authenticated user', (done) => {
      req
        .get(url)
        .set('sessionId', sessionId)
        .expect(204, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with a correct cero json value', (done) => {
      req
        .get(url)
        .set('sessionId', sessionId)
        .expect({}, done)
    })
    // eslint-disable-next-line no-undef
    it('GET respond with a correct non cero json value', (done) => {
      req
        .post(urlM)
        .send({ esIngreso: 1, importe: 199, fecha: new Date() })
        .set('sessionId', sessionId)
        .end(() => {
          req
            .get(url)
            .set('sessionId', sessionId)
            .expect([{ _id: { esIngreso: 1 }, total: 199 }], done)
        })
    })
  })
}

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
  })
}

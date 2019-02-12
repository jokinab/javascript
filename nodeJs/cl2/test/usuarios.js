'use strict'

const url = '/api/pub/usuarios'

module.exports.test = (req) => {
  // eslint-disable-next-line no-undef
  describe(url, () => {
    // eslint-disable-next-line no-undef
    it('GET respond with 404 not found',
      (done) => {
        req
          .get(url)
          .expect(404, done)
      })
    // eslint-disable-next-line no-undef
    it('POST respond with 201 created to a new user',
      (done) => {
        req
          .post(url)
          .send({ email: 'a@b.c', password: '1234' })
          .expect(201, done)
      })
    // eslint-disable-next-line no-undef
    it('POST respond with 409 to a repeated user',
      (done) => {
        req
          .post(url)
          .send({ email: 'a@b.c', password: '1234' })
          .expect(409, done)
      })
  })
}
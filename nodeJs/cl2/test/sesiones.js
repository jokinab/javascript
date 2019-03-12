'use strict'

const url = '/api/pub/sesiones'

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
    it('POST respond with 201 created to a new session',
      (done) => {
        req
          .post(url)
          .send({ email: 'a@b.c', password: '1234' })
          .expect(201, done)
      })
    // eslint-disable-next-line no-undef
    it('POST respond with 401 unauthorized to an inocrrect password',
      (done) => {
        req
          .post(url)
          .send({ email: 'a@b.c', password: '12346' })
          .expect(401, done)
      })
    // eslint-disable-next-line no-undef
    it('POST respond with 401 unauthorized to an inocrrect email',
      (done) => {
        req
          .post(url)
          .send({ email: 'a@b.d', password: '1234' })
          .expect(401, done)
      })
  })
}

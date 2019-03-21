'use strict'

const url = '/api/pub/usuarios'
const urlLogin = '/api/pub/login'
const urlRegister = '/api/pub/register'

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

  // eslint-disable-next-line no-undef
  describe(urlRegister, () => {
    // eslint-disable-next-line no-undef
    it('POST respond with 201 created to a new user',
      (done) => {
        req
          .post(urlRegister)
          .send({ email: 'abc@d.e', password: '1234' })
          .expect(201, done)
      })
    // eslint-disable-next-line no-undef
    it('POST respond with 409 to a repeated user',
      (done) => {
        req
          .post(urlRegister)
          .send({ email: 'abc@d.e', password: '1234' })
          .expect(409, done)
      })
  })

  // eslint-disable-next-line no-undef
  describe(urlLogin, () => {
    // eslint-disable-next-line no-undef
    it('POST respond with 401 Unauthorized',
      (done) => {
        req
          .post(urlLogin)
          .send({ email: 'a2@b.c', password: '12345' })
          .expect(401, done)
      })
    // eslint-disable-next-line no-undef
    it('POST respond with 200 to a logged in user',
      (done) => {
        req
          .post(urlLogin)
          .send({ email: 'abc@d.e', password: '1234' })
          .expect(200, done)
      })
  })
}

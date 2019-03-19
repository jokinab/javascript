'use strict'

const jwt = require('jsonwebtoken')
const secreto = 'EscuelaIT'

/** cifra el usuario derante un margen de tiempo */
exports.generaToken = (usuario) => jwt.sign(usuario, secreto)

// exports.generaToken = (usuario) => '12341234123'

/** verifica al usuario a partir del token */
exports.verify = (token) => {
  try {
    return jwt.verify(token, secreto)
  } catch (err) {
    return false
  }
}

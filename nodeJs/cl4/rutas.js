'use strict'

const usuarios = require('./usuarios.js')
const sesiones = require('./sesiones.js')
const maestros = require('./maestros.js')
const movimientos = require('./movimientos.js')

module.exports = (app) => {
  // Estas son las rutas publicas a usar. no requieren autenticacion por parte del usuario
  usuarios(app, '/api/pub/usuarios')
  sesiones(app, '/api/pub/sesiones')
  maestros(app, '/api/pub/maestros')
  // Estas son las rutas privadas. Requieren autenticacion. En el midleware se requiere el modulo seguridad.js y se le llama
  movimientos(app, '/api/priv/movimientos', '/api/priv/saldos')
}

'use strict'

const mongodb = require('./mongodb')
const colName = 'usuarios'
const jwt = require('./jwt')

const usarSeguridad = (app, ruta) => {
  app.use(ruta, (req, res, next) => {
    let sessionId = req.get('sessionId')
    let sesion = jwt.verify(sessionId)
    if (sesion) {
      req.usuario = sesion.email
      next()
    } else {
      res.status(401).send('Credencial invalida')
    }
  })
}

const existeUsuario = (usuario) => mongodb.finding(colName, { email: usuario.email })

const crearUsuario = (usuario) => mongodb.inserting(colName, usuario)

const esUsuarioValido = (usuario) => mongodb.finding(colName, { email: usuario.email, password: usuario.password })

module.exports = {
  usarSeguridad: usarSeguridad,
  existeUsuario: existeUsuario,
  crearUsuario: crearUsuario,
  esUsuarioValido: esUsuarioValido,
  nuevaSesion: (usuario) => jwt.generaToken(usuario)
}

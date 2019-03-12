'use strict'

let usuarios = []
let sesiones = []

const usarSeguridad = (app, ruta) => {
  app.use(ruta, (req, res, next) => {
    let sessionId = req.get('sessionId')
    let sesion = getSesion(sessionId)
    if (sesion) {
      if (esSesionValida(sesion)) {
        sesion.timeStamp = new Date()
        req.usuario = sesion.email
        // console.log(`Sesion valida: ${sesion.sessionId}`)
        next()
      } else {
        console.log(`Sesion caducada: ${JSON.stringify(sesion)}`)
        res.status(419).send('Sesion caducada')
      }
    } else {
      // console.log('No existe')
      res.status(401).send('Credencial invalida')
    }
  })
}

const existeUsuario = (usuario) => usuarios.some(u => u.email == usuario.email)

const crearUsuario = (usuario) => usuarios.push(usuario)

const esUsuarioValido = (usuario) => usuarios.filter(u => u.email == usuario.email && u.password == usuario.password)[0]

const esSesionValida = (sesion) => (new Date() - sesion.timeStamp) < 20 * 60 * 1000

const getSesionValida = () => {}

const getSesion = (sessionId) => sesiones.filter(s => s.sessionId == sessionId)[0]

const nuevaSesion = (email) => {
  let sessionId = Math.random() * (88888) + 11111
  let timeStamp = new Date()
  sesiones.push({
    sessionId: sessionId,
    email: email,
    timeStamp: timeStamp
  })
  return sessionId
}

module.exports = {
  usarSeguridad: usarSeguridad,
  existeUsuario: existeUsuario,
  crearUsuario: crearUsuario,
  esUsuarioValido: esUsuarioValido,
  esSesionValida: esSesionValida,
  getSesionValida: getSesionValida,
  getSesion: getSesion,
  nuevaSesion: nuevaSesion
}

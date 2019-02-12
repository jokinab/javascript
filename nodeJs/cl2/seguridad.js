'use strict'

let usuarios = []
let sesiones = []

const usarSeguridad = () => {}

const existeUsuario = (usuario) => usuarios.some(u => u.email === usuario.email)

const crearUsuario = (usuario) => usuarios.push(usuario)

const esUsuarioValido = (usuario) => usuarios.filter(u => u.email === usuario.email && u.password === usuario.password)[0]

const esSesionValida = () => {}

const getSesionValida = () => {}

const getSesion = (sessionId) => sesiones.filter(s => s.sessionId === sessionId)[0]

const nuevaSesion = () => {}

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

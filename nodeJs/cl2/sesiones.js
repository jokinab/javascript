'use strict'

const seguridad = require('./seguridad')

module.exports = (app, ruta) => {
  // Gestion de sesiones: listado y login
  app.route(ruta)
    .post((req, res) => {
      let sesion = req.body
      if (seguridad.esUsuarioValido(sesion)) {
        console.log(`aceptado: ${sesion.email}`)
        let nuevoSessionId = seguridad.nuevaSesion(sesion.email)
        res.status(201).json(nuevoSessionId)
      } else {
        console.log(`Credencial invalida: ${sesion.email}`)
        res.status(401).send('Credencial invalida')
      }
    })
}



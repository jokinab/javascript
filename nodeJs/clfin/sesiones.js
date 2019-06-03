'use strict'

const seguridad = require('./seguridad')

module.exports = (app, ruta) => {
  // Gestion de sesiones: listado y login
  app.route(ruta)
    .post(async (req, res) => {
      let sesion = req.body
      try {
        let validUser = await seguridad.esUsuarioValido(sesion)
        if (validUser.length > 0) {
          // console.log(`aceptado: ${sesion.email}`)
          let nuevoSessionId = seguridad.nuevaSesion(sesion)
          res.status(201).json(nuevoSessionId)
        } else {
          // console.log(`Credencial invalida: ${sesion.email}`)
          res.status(401).send('Credencial invalida')
          res.send()
        }
      } catch (err) {
        console.log(err.stack)
      }
    })
}

'use strict'

const seguridad = require('./seguridad.js')

module.exports = (app, ruta) => {
  // Gestion de sesiones: lisado y login
  app.route(ruta)
    .post(async (req, res) => {
      let usuario = req.body
      try {
        let result = await seguridad.existeUsuario(usuario)
        if (result.length > 0) {
          console.log(`email ya registrado: ${usuario.email}`)
          res.status(409).send(`email ${usuario.email} ya registrado`)
        } else {
          console.log(`ok registrando: ${usuario.email}`)
          try {
            let newUsuario = await seguridad.crearUsuario(usuario)
            if (newUsuario) {
              let nuevoSessionId = seguridad.nuevaSesion(usuario.email)
              console.log(nuevoSessionId)
              res.status(201).json(nuevoSessionId)
            }
          } catch (err) {
            console.log(err)
          }
        }
      } catch (err) {
        console.log(err.stack)
      }
    })
}

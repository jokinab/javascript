'use strict'

const seguridad = require('./seguridad.js')

module.exports = (app, rutaUsuarios, rutaLogin, rutaRegister) => {
  // Gestion de sesiones: listado y login
  app.route(rutaUsuarios)
    .post(async (req, res) => {
      let usuario = req.body
      try {
        let searchUser = await seguridad.existeUsuario(usuario)
        if (searchUser.length > 0) {
          // console.log(`email ya registrado: ${usuario.email}`)
          res.status(409).send(`email ${usuario.email} ya registrado`)
        } else {
          // console.log(`ok registrando: ${usuario.email}`)
          try {
            let newUsuario = await seguridad.crearUsuario(usuario)
            if (newUsuario) {
              let nuevoSessionId = seguridad.nuevaSesion(usuario.email)
              // console.log(nuevoSessionId)
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

  app.route(rutaLogin)
    .post(async (req, res) => {
      let usuario = req.body
      try {
        let searchUser = await seguridad.existeUsuario(usuario)
        if (searchUser.length > 0) {
          console.log(`Login de: ${usuario.email}`)
          let nuevoSessionId = seguridad.nuevaSesion(usuario.email)
          res.status(200).json(nuevoSessionId)
        } else {
          console.log(`Login Error. Usuario ${usuario.email} no existe. `)
          res.status(401).send(`email ${usuario.email} no registrado`)
        }
      } catch (err) {
        console.log(err.stack)
      }
    })

  app.route(rutaRegister)
    .post(async (req, res) => {
      let usuario = req.body
      try {
        let searchUser = await seguridad.existeUsuario(usuario)
        if (searchUser.length > 0) {
          // console.log(`email ya registrado: ${usuario.email}`)
          res.status(409).send(`email ${usuario.email} ya registrado`)
        } else {
          // console.log(`ok registrando: ${usuario.email}`)
          try {
            let newUsuario = await seguridad.crearUsuario(usuario)
            if (newUsuario) {
              let nuevoSessionId = seguridad.nuevaSesion(usuario.email)
              // console.log(nuevoSessionId)
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

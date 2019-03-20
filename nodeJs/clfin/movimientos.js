'use strict'
const mongodb = require('./mongodb')
const colName = 'movimientos'

module.exports = (app, rutaMovimientos, rutaSaldos) => {
  // Temdremos dos mega-rutas por recurso

  // una para ir a la coleccion
  app.route(rutaMovimientos)
    .get(async (req, res) => {
      try {
        let searchUser = await mongodb.finding(colName, { usuario: req.usuario })
        searchUser.length > 0 ? res.json(searchUser) : res.status(204).send()
      } catch (err) {
        resError(err, res)
      }
    })
    .post(async (req, res) => {
      let nuevoMovimiento = req.body
      nuevoMovimiento.usuario = req.usuario
      try {
        let insertMov = await mongodb.inserting(colName, nuevoMovimiento)
        res.status(201).json(insertMov.ops[0])
      } catch (err) {
        resError(err, res)
      }
    })

  // otra a nivel de movimiento
  // api/priv/movimientos/159
  app.route(`${rutaMovimientos}/:id`)
    .get(async (req, res) => {
      try {
        let searchMov = await mongodb.finding(colName, { usuario: req.usuario }, req.params.id)
        searchMov.length > 0 ? res.json(searchMov) : res.status(404).send()
      } catch (err) {
        resError(err, res)
      }
    })
    .put(async (req, res) => {
      try {
        let updatedMov = await mongodb.updating(colName, { usuario: req.usuario }, req.params.id, req.body)
        parseInt(updatedMov.result.n) > 0 ? res.status(200).json(updatedMov) : res.status(404).send()
      } catch (err) {
        resError(err, res)
      }
    })
    .delete(async (req, res) => {
      try {
        let deletedMov = await mongodb.deleting(colName, { usuario: req.usuario }, req.params.id)
        parseInt(deletedMov.result.n) > 0 ? res.status(204).json(deletedMov) : res.status(404).send()
      } catch (err) {
        resError(err, res)
      }
    })

  // si la ruta es simple, se puede manterner el verbo original
  // Manteniendo la Precedencia
  // api/priv.saldos
  app.get(rutaSaldos, async (req, res) => {
    // Las consultas mas complejas se resuelven con el framework de agregacion
    let query = [
      {
        $match: {
          usuario: req.usuario
        }
      },
      {
        $group: {
          _id: {
            esIngreso: '$esIngreso'
          },
          total: {
            $sum: '$importe'
          }
        }
      }
    ]
    try {
      let agregateMovs = await mongodb.aggregating(colName, query)
      agregateMovs.length > 0 ? res.json(agregateMovs) : res.status(204).send()
    } catch (err) {
      resError(err, res)
    }
  })
}

/** Respuesta comun a errores **/
const resError = (err, res) => {
  console.error(err)
  res.status(500).send(err)
}

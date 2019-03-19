'use strict'
const mongodb = require('./mongodb')
const colName = 'movimientos'

module.exports = (app, rutaMovimientos, rutaSaldos) => {
  // Temdremos dos mega-rutas por recurso

  // una para ir a la coleccion
  app.route(rutaMovimientos)
    .get((req, res) => {
      mongodb.finding(colName, { usuario: req.usuario })
        .then(result => result.length > 0 ? res.json(result) : res.status(204).send())
        .catch(err => resError(err))
    })
    .post((req, res) => {
      let nuevoMovimiento = req.body
      nuevoMovimiento.usuario = req.usuario
      mongodb.inserting(colName, nuevoMovimiento)
        .then(result => res.status(201).json(result.ops[0]))
        .catch(err => resError(err, res))
    })

  // otra a nivel de movimiento
  // api/priv/movimientos/159
  app.route(`${rutaMovimientos}/:id`)
    .get((req, res) => {
      mongodb.finding(colName, { usuario: req.usuario }, req.params.id)
        .then(result => result.length > 0 ? res.json(result) : res.status(404).send())
        .catch(err => resError(err, res))
    })
    .put((req, res) => {
      mongodb.updating(colName, { usuario: req.usuario }, req.params.id, req.body)
        .then(result => parseInt(result.result.n) > 0 ? res.status(200).json(result) : res.status(404).send())
        .catch(err => resError(err, res))
    })
    .delete((req, res) => {
      mongodb.deleting(colName, { usuario: req.usuario }, req.params.id)
        .then(result => parseInt(result.result.n) > 0 ? res.status(204).json(result) : res.status(404).send())
        .catch(err => resError(err, res))
    })

  // si la ruta es simple, se puede manterner el verbo original
  // Manteniendo la Precedencia
  // api/priv.saldos
  app.get(rutaSaldos, (req, res) => {
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
    mongodb.aggregating(colName, query)
      .then(result => result.length > 0 ? res.json(result) : res.status(204).send())
      .catch(err => resError(err, res))
  })
}

/** Respuesta comun a errores **/
const resError = (err, res) => {
  console.error(err)
  res.status(500).send(err)
}

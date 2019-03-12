'use strict'

let movimientos = []

module.exports = (app, rutaMovimientos, rutaSaldos) => {
  // Temdremos dos mega-rutas por recurso

  // una para ir a la coleccion
  app.route(rutaMovimientos)
    .get((req, res) => {
      // filtro para el usuario actual
      let movimientosUsuario = movimientos.filter(m => m.usuario == req.usuario)
      // console.log(`Situacion movimientos: ${JSON.stringify(movimientosUsuario)}`)
      if (movimientosUsuario && movimientosUsuario.length > 0) {
        res.json(movimientosUsuario)
      } else {
        res.status(204).send()
      }
    })
    .post((req, res) => {
      let nuevoMovimiento = req.body
      nuevoMovimiento.id = movimientos.length
      // firma del movimiento en el servidor
      nuevoMovimiento.usuario = req.usuario
      movimientos.push(nuevoMovimiento)
      res.status(201).json(nuevoMovimiento)
      // console.log(`Movimientos actuales: ${JSON.stringify(movimientos)}`)
    })

  // otra a nivel de movimiento
  // api/priv/movimientos/159
  app.route(`${rutaMovimientos}/:id`)
    .get((req, res) => {
      let movimientosUsuario = getMovimientoUsuario(req.params.id, req.usuario)
      if (movimientosUsuario && movimientosUsuario.length > 0) {
        res.json(movimientosUsuario[0])
      } else {
        res.status(404).send()
      }
    })
    .put((req, res) => {
      let movimientosUsuario = getMovimientoUsuario(req.params.id, req.usuario)
      if (movimientosUsuario && movimientosUsuario.length > 0) {
        movimientosUsuario[0] = req.body
        res.json(movimientosUsuario[0])
      } else {
        res.status(404).send()
      }
    })
    .delete((req, res) => {
      let movimientosUsuario = getMovimientoUsuario(req.params.id, req.usuario)
      if (movimientosUsuario && movimientosUsuario.length > 0) {
        movimientos.splice(req.params.id, 1)
        res.status(204).send()
      } else {
        res.status(404).send()
      }
    })

  // si la ruta es simple, se puede manterner el verbo original
  // Manteniendo la Precedencia
  // api/priv.saldos
  app.get(rutaSaldos, (req, res) => {
    let totales = {
      ingresos: 0,
      gastos: 0,
      balance: 0
    }
    if (movimientos && movimientos.length > 0) {
      movimientos.forEach((movimiento) => {
        if (movimiento.usuario == req.usuario) {
          if (movimiento.esIngreso) {
            totales.ingresos += movimiento.importe
          } else {
            totales.gastos += movimiento.importe
          }
        }
      })
      totales.balance = totales.ingresos - totales.gastos
      res.json(totales)
    } else {
      res.status(200).json({
        ingresos: 0,
        gastos: 0,
        balance: 0
      })
    }
  })
}

const getMovimientoUsuario = (id, usuario) => movimientos.filter(m => m.usuario == usuario && m.id == id)

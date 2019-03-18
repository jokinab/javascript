'use strict'
module.exports = (app, ruta) => {
  // Vamos a rsponder emitiendo un JSON
  app.get(ruta, (req, res) => {
    res.json({
      categoriasIngresos: ['Nomina', 'Ventas', 'Intereses Depositos'],
      categoriasGastos: ['Hipoteca', 'Compras', 'Impuestos']
    })
  })
}

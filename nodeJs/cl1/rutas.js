module.exports = (app) => {
  const matematicas = require('./matematicas')
  // La reqes suelen enviar parámetros
  // se declaran precedidos de :
  // se recuperan en la coleccción params de la petición
  app.get('/saludame/:nombre', (req, res) => {
    console.log(req)
    return res.send('Hola ' + req.params.nombre)
  })

  app.get('/sayhello/:name', (req, res) => res.send(`Hello ${req.params.name}`))

  // Las expresiones de las rutas puede ser complejas
  // Express determinará la función que mejor encaja con una ruta determinada
  // Se pueden usar restricciones para 'validar los parámetros'
  app.get('/mates/:operacion/:numero1/:numero2([0-9])', (req, res) => {
    const operacion = req.params.operacion
    const numero1 = req.params.numero1
    const numero2 = req.params.numero2
    var resultado = 'Desconocido'
    if (operacion === 'sumar') {
      resultado = matematicas.sumar(numero1, numero2)
    } else if (operacion === 'restar') {
      resultado = matematicas.restar(numero1, numero2)
    }
    res.send(`El resultado de ${operacion} ${numero1} y ${numero2} es ${resultado}`)
  })

  // Además de las espresiones de rutas, tambien podemos ejecutar acciones específicas con un parámatro
  // Este es un buen sitio para sanear la entrada
  app.param('numero1', (req, res, next, value) => {
    console.log(`numero1 vale  ${value}`)
    if (isNaN(value)) {
      console.log('numero1 no es un número !!!! ')
      // podemos hacer distintas acciones correctoras o preventivas
      // req.params.numero1 = 0
      // next(new Error('numero1 no es un número'))
      // podemos retornar directamente el error
      res.status(400).send('numero1 no es un número')
      // ... pero en ese caso hay que terminar la ejecución
      return
    }
    next()
  })
}

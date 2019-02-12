'use strict'

/**
 * Modulo de logica intermedia
 * @module middleware
*/
/**
 * @param {object} app - aplicacion de express
 * @param {object} express - el propio framework express
 * @return configura la aplicacion
 */

var path = require('path')

module.exports.useMiddleware = (app, express) => {
  // body-parser es un modulo de express que parsea todos los parametros de las llamadas GET, POST, PUT y DELETE
  const bodyParser = require('body-parser')
  //const seguridad = require('./seguridad')
  const options = {
    extensions: ['html', 'htm'],
    maxAge: '1d',
    setHeaders: res => res.set('x-timestamp', Date.now())
  }
  
  // Otr uso comun es la monitorizacion de la app. Interceptar llamadas
  app.use((req, res, next) => {
    console.log(`Peticion recibida: ${req.url}`)
    // Imoortante continuar e flujo hacia l siguiente funcion. Si no, se colgaria la llamada
    next()
  })
  // Un uso muy frecuente es reservar una serie de rutas para derivarlas al disco
  // Tendremos asi un directorio para contenido estatico
  app.use(express.static(path.join(__dirname, 'static'), options))

  // Permite recuperar como objetos JS el contenido emitido por el cliente
  // tanto en parametros
  app.use(bodyParser.urlencoded({
    exended: true
  }))
  // como en el body
  app.use(bodyParser.json())

  // Este middleware se encaragara de vigilar la entrada
  // Para las rutas que cumplan on el esquema '/api/priv/' se usara el metodo usarSeguridad del modulo seguridad
  //seguridad.usarSeguridad(app, '/api/priv/')
}
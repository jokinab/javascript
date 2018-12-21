/**
 * Modulo de logica intermedia
 * @module middleware
 */

/**
 * @param {object} app - la aplicacion de express
 * @param {object} express - el propio framework express
 * @return configura la aplicacion
 */

var path = require('path')

module.exports.useMiddleware = (app, express) => {
  const options = {
    extensions: ['html', 'html'],
    maxAge: '1d',
    setHeaders: res => res.set('x-timestap', Date.now())
  }

  // Otro uso comun es la monitorizacion de la app. Interceptar llamadas
  app.use((req, res, next) => {
    console.log(`recibida peticion: ${req.url}`)
    // Importante continuar el flujo hacia la siguiente funcion. si no se colgaria la llamada
    next()
  })

  // Un uso frecuente es reservar una serie de rutas para derivarlas al disco
  // Tendremos asi un directorio para contenido estatico. En este directorio se pondran los ficheros estaticos a sevir
  // Todas las modificaciones que se hacen con express sobre el middleware se hacen con el verbo use (recibe una funcion, no una ruta)
  app.use(express.static(path.join(__dirname, '/static'), options))
}

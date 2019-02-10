'use strict'

const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('Hola!'))

// Configuracion logica intermedia
const middleware = require('./middleware')

// el middlewrare deberia crear y devolver la app configrurada
middleware.useMiddleware(app, express)

// Respondemos a las peticiones mediante un mecanismo de suscripcion y callbacks
app.get('/about', (req, res) => res.send('Res de About'))

require('./rutas')(app)

// Configuramos la app para que escuche en el puerto 3000
app.listen(3000)

'use strict'

const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('Hola!'))

// Configuracion logica intermedia
const middleware = require('./middleware')

middleware.useMiddleware(app, express)

app.get('/about', (req, res) => res.send('Res de About'))

app.listen(3000)

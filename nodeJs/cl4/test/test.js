'use strict'

var request = require('supertest')

request = request('http://localhost:3000')

// llamadas publicas
require('./maestros').test(request)

// llamadas de autenticacion
require('./usuarios').test(request)
require('./sesiones').test(request)

// llamadas privadas
require('./movimientos').test(request)
require('./saldos').test(request)

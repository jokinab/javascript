'use strict'

var request = require('supertest')

request = request('http://localhost:3000')

// llamadas publicas
require('./maestros').test(request)

// llamadas de autenticacion
require('./usuarios').test(request)
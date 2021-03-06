'use strict'
/**
 * Módulo Matemático.
 * @module matematicas
 */

// let is new var ... más o menos :-)
// tiene que declararse antes de usarse
// funciones flecha
/**
 * @param {number} x - el número.
 * @return el cuadrado del número
 */
let cuadrado = x => x * x

var raizCuadrada = Math.sqrt

module.exports = {
  /** Raiz cuadrada de un número */
  raizCuadrada: raizCuadrada,
  /** Cuadrado de un número */
  cuadrado: cuadrado,
  /** Diagonal de un cuadrado conocidos sus lados */
  diagonal: diagonal,
  /** Suma dos números */
  sumar: (x, y) => obtenerNumero(x) + obtenerNumero(y),
  /** Resta dos números */
  restar: (x, y) => obtenerNumero(x) - obtenerNumero(y)
}

// las funciones con nombre se siguen declarando en cualquier lugar
/**
* @param {number} base - base del cuadrado.
* @param {number} altura - altura del cuadrado.
* @return la diagonal de dicho cuadrado
*/
function diagonal (base, altura) {
  return raizCuadrada(cuadrado(base) + cuadrado(altura))
}

function obtenerNumero (texto) {
  return texto * 1
}

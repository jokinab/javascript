'use strict';

var _console;

var _templateObject = _taggedTemplateLiteral(['Hola ', ''], ['Hola ', '']),
    _templateObject2 = _taggedTemplateLiteral(['Hello!\n'], ['Hello!\\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*******************************/
/******* Template Strings ******/
/*******************************/

// Las template strins se escriben con acento grave (`) 
// Es un string que sirve de plantilla

// Ejm: 
var holaMundo = 'Hola, mundo!';

// Permite esscribir en diferentes lineas sin necesidad del caracter de escape \n
var LOREM = 'Lorem ipsum dolor sit amet, \nconsectetur adipisicing elit, \nsed do eiusmod tempo incididunt \nut labore et dolore magna aliqua.';

// Interpolacion por medio de ${}
var COLOR = 'blue';
var CAPTAIN_OBVIOUS = 'The heaven is ' + COLOR;

/*******************************/
/*** Funciones de etiquetado ***/
/*******************************/

// function( arrayDeStringDePlantilla, arrayDeArgumentosDeInterpolacion ) 

var tag = function tag(string, args) {
    // ...
};

var NAME = 'Dani';

tag(_templateObject, NAME);

// Ejm: 
var raw = function raw(strings, args) {
    return strings.raw[0];
};

console.log(raw(_templateObject2)); // Si ponemos strings.raw[0], lo que nos devolvera sera el string 
// introducido sin la interpretacion de los caracteres de escape 
// log - `Hello!\n`                            


/*******************************/
/******** Destructering ********/
/*******************************/

// Podemos pillar array/objetos y crear variables por cada una de sus propiedades, es decir:
// Teniendo un array 
var numbers = ['1', '2', '3', '4'];
// Creamos 4 variables-constantes llamadas uno, dos, tres, cuatro
var uno = numbers[0],
    dos = numbers[1],
    tres = numbers[2],
    cuatro = numbers[3];

// Con objetos pasa igual

var object = { one: 1, dos: 2 };
var one = object.one,
    two = object.two;

/******************************/
/*** Parametros por defecto ***/
/******************************/

function sayHello() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === undefined ? 'Joan' : _ref$name,
        _ref$surname = _ref.surname,
        surname = _ref$surname === undefined ? 'Leon' : _ref$surname;

    console.log('Hello', name, surname);
};

sayHello({ name: 'jokin' });

/*************************************************/
/*** Spread Operator / Operador de Propagacion ***/
/*************************************************/

// El operador de propagacion (...) lo que hace es: dado un array, lo descompone devolviendo los valores del mismo sin el formato del array 
// Esta sintaxis esta en stage 2, pero lo expicamos porque es muy util
var values = [1, 2, 3, 4];

console.log(values); // [1, 2, 3, 4]
(_console = console).log.apply(_console, values); // 1 2 3 4  


/************************************************/
/****** Arrow Functions / Funciones Flecha ******/
/************************************************/

var echo = function echo(text) {
    return text;
};
console.log(echo('Hello, arrow funtions!'));
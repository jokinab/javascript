
/*******************************/
/******* Template Strings ******/
/*******************************/

// Las template strins se escriben con acento grave (`) 
// Es un string que sirve de plantilla

// Ejm: 
let holaMundo = `Hola, mundo!`;

// Permite esscribir en diferentes lineas sin necesidad del caracter de escape \n
const LOREM = `Lorem ipsum dolor sit amet, 
consectetur adipisicing elit, 
sed do eiusmod tempo incididunt 
ut labore et dolore magna aliqua.`;

// Interpolacion por medio de ${}
const COLOR = 'blue';
const CAPTAIN_OBVIOUS = `The heaven is ${COLOR}`;



/*******************************/
/*** Funciones de etiquetado ***/
/*******************************/

// function( arrayDeStringDePlantilla, arrayDeArgumentosDeInterpolacion ) 

const tag = function(string, args) {
    // ...
};

const NAME = 'Dani';

tag `Hola ${NAME}`;

// Ejm: 
const raw = function(strings, args) {
    return strings.raw[0];
}

console.log(raw`Hello!\n`); // Si ponemos strings.raw[0], lo que nos devolvera sera el string 
                            // introducido sin la interpretacion de los caracteres de escape 
                            // log - `Hello!\n`                            



/*******************************/
/******** Destructering ********/
/*******************************/ 

// Podemos pillar array/objetos y crear variables por cada una de sus propiedades, es decir:
// Teniendo un array 
const numbers = ['1','2','3','4'];
// Creamos 4 variables-constantes llamadas uno, dos, tres, cuatro
const [uno,dos,tres,cuatro] = numbers;

// Con objetos pasa igual
let object = { one: 1, dos: 2 };
let { one, two } = object;

                            

/******************************/
/*** Parametros por defecto ***/
/******************************/ 

function sayHello({
        name = 'Joan',
        surname = 'Leon'
    } = {}) {
    console.log('Hello',name,surname)    
};

sayHello({name:'jokin'});



/*************************************************/
/*** Spread Operator / Operador de Propagacion ***/
/*************************************************/

// El operador de propagacion (...) lo que hace es: dado un array, lo descompone devolviendo los valores del mismo sin el formato del array 
// Esta sintaxis esta en stage 2, pero lo expicamos porque es muy util
const values = [1,2,3,4];

console.log(values);    // [1, 2, 3, 4]
console.log(...values); // 1 2 3 4  


/************************************************/
/****** Arrow Functions / Funciones Flecha ******/
/************************************************/

const echo = text => text;
console.log(echo('Hello, arrow funtions!'));



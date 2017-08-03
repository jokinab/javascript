
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




/*******************************/
/****     Propiedad raw     ****/
/*******************************/

// raw lo que hace es devolver un string sin escapar
/* La propiedad especial raw, disponible en el primer argumento de las plantillas de cadenas de texto postprocesadas, nos permite acceder a las cadenas de texto tal como fueron ingresadas.

function tag(strings, ...values) {
  console.log(strings.raw[0]); 
  // "linea 1 de cadena de texto \\n línea 2 de cadena de texto"
}

tag`línea 1 de cadena de texto \n línea 2 de cadena de texto`;
 */

 console.log(`Hello \n`.raw[0]);

let newRaw = function(strings, args) {
    console.log( typeof strings );
    console.log( strings );
    return strings.raw[0];
};
let prueba_var = `popo \n`.raw;

console.log(newRaw`Hello \n`);
console.log(`next line`);

// Tambien se puede usar como metodo de String
String.raw`Hola\n${2+3}!`; // "Hola\\n5!"





// Ejm: 
const raw = function(strings, args) {
    return strings.raw[0];
}

console.log(raw`Hello!\n`); // Si ponemos strings.raw[0], lo que nos devolvera sera el string 
                            // introducido sin la interpretacion de los caracteres de escape 
                            // log - `Hello!\n`                            






/*************************************************/
/********** Ejemplos de String Tempates **********/
/*************************************************/

// Ejm 1:

// Poner un punto detras de cada caracter de un string

// map() y split()

var str = "How are you doing today?";
var res = str.split(" "); // resultado es un array con los valores separados por el parametor pasado " " ['How','are','you','doing','today?']
console.log(res);


function doble(e) {
  return e * 2;
}
 
var arreglo = [1, 2, 3, 4, 5];
var resultado = arreglo.map(doble);
console.log(resultado); // [2, 4, 6, 8, 10];



let newTag = function(strings, args) {
    return strings.map(function(s){             // strings es un array que mapeamos y por cada valor del array (string) hacemos
        return s.split('').map(function(s){     // creamos un array con cada uno de los caracteres (split), y por cada caracter (map)
            return `${s}.`;                     // anadimos al caracter un punto
        }).join('');                            // el array de caracteres lo volvemos string ya que lo que map espera es un string como return
    }).join('');
};

console.log('aki');
console.log(newTag`Aupa ahi!`);


// Ejm 2:

// Crear una especie de diccionario de trduccion por idioma con variables

let dictionary = {
    es: {
        'days ago': 'hace %{count} dias'
    },
    en: {
        'days ago': '%{count} days ago'
    }

};


let currentLanguage = 'es'; 

let numeroDeDias = 8;

let i18n = function(strings, args){
    let key = strings.join('').trim('');
    return dictionary[currentLanguage][key].replace('%{count}',args); 
};

console.log(i18n`${numeroDeDias} days ago`);
currentLanguage = 'en';
console.log(i18n`${numeroDeDias} days ago`);






// Para pasar multiples argumentos hay que hacerlo por medio del operador de propagacion

let hello = 'hello';

let world = 'world';

let tag = function(strings, ...args) {
    console.log(strings);
    console.log(args);
};

let example = tag`${hello}, ${world}`;

console.log(example);


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


// Ejm:



/* let numbers = ['1', '2', '3'];

let [one,two,three] = numbers;
let ichi, ni, san;

[ichi,ni,san] = numbers;

// o tambien

[ichi,ni,san] = [ 1, 2, 3 ];

console.log( ichi,ni,san );

//let objeto = { one: 1, two: 2 };
//let {one,two} = objeto;

let objeto = { oneso: 1, doseso: 2 };
let { oneso, doseso } = objeto;

console.log(oneso,doseso);

function sumaer({aer, ber} = {}){
    return aer + ber; 
}

const threes = 3;
const four = 4;


console.log(sumaer({aer: threes, ber: four}));
 */




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





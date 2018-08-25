/*****************************************************************/
/***** ------ Modulos, Estructuras de datos, Promesas ------ *****/
/*****************************************************************/


// Literal de Objeto --> No es mas que una lista de par clave/valor metida entre corchetes

// ES5

var myObject = {
    name: 'jo',
    age: '36',
    images: ["one.gif","two.png"],
    location: {
        x:1,
        y:2
    },
    move: function(x,y){
        this.location.x+=1;
        this.location.y+=1;
    }
};


// ES6

const myES6Objet = {
    foo() {
        // .....
    },
    bar() {
        // .....    
    }
};

// Antes, los nombres de las propiedades solo se podian aplicar de manera estatica. 
// Ahora, los nombres de las funciones pueden ser computados

let propertyKey = 'foo';
let keyWord = 'a';
let methodKey = 'greeting';

let objectES6 = {
    [propertyKey] : true,
    [`b${keyWord}r`] : 'mola',
    [methodKey]() {
        return 'Aupa ahi!!!';
    }
};

console.log(objectES6);
console.log(objectES6.greeting());



/* Iteradores */
// https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Iterators_and_Generators

var colors = [ 'red', 'green', 'blue' ];

// En ES6 se ha propuesto solucion a tener que recorrer los objetos de forma ordenada

let numbers = [1,2,3,4];

// los iterables son objetos implementan un metodo next que devuelve un objeto con dos valores, value y done
// value con el valor actual y done true/false para ver si se ha terminado con las iteraciones.

// un iterador es algo que me permite hacer iterables. Para hacerlo, se hace por medio de la interfaz Symbol.iterator
let numberIterator = numbers[Symbol.iterator](); 

console.log(numberIterator.next());     // { value: 1, done: false }
console.log(numberIterator.next());     // { value: 2, done: false }
console.log(numberIterator.next());     // { value: 3, done: false }
console.log(numberIterator.next());     // { value: 4, done: false }
console.log(numberIterator.next());     // { value: undefined, done: true }

/* 
    En JavaScript un iterador es un objeto que proporciona un método next() que devuelve el siguiente elemento en la secuencia. 
    Este método devuelve un objeto con dos propiedades: done y value.
    Una vez creado, un objeto iterador puede utilizarse explícitamente llamando repetidamente al método  next(). 
*/
/* 
    Con el fin de ser iterable, un objeto debe implementar el método @@iterator, lo que significa que 
    el objeto (or one of the objects up its prototype chain) debe tener una propiedad con la clave Symbol.iterator:
*/


// Ejm: Keremos hacer un objeto que itere sobre las palabras de un string de longitud variable. Lo que kiero es recoger todas las palabras del 
// string y devolver un array con todas esas palabras. Para ello vamos a usar un iterador, pero ese iterador no va a ser sobre un array, si no que va 
// a ser sobre un metodo de una clase.

class LoremIpsum{

    constructor(text) {
        this._text = text;
    }

    // Creamos un metodo con [Symbol.iterator] como nombre. Esto kiere decir que cualquier instancia de LoremIpsum va a ser iterable, ya que va a implementar
    // este metodo    
    [Symbol.iterator]() {
        const re = /\S+/g; //Esta Regular Expression lo que hace es encontrar cada una de las palaras dentro de un string 
        const text = this._text;
        return {
            next() {
                const match = re.exec(text);
                //console.log('este: ',match);
                if (match) {
                    return { value: match[0], done: false };
                }
                return { value: undefined, done: true };
            }
        }
    }
}

const loremText = new LoremIpsum('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor metus hendrerit, faucibus eros vitae, semper mauris. Curabitur pellentesque nisl ut sagittis auctor. Curabitur molestie, mi eu lacinia blandit, tellus nibh laoreet est, vel porttitor odio elit a tellus. Phasellus auctor massa in odio rhoncus maximus. Quisque lorem odio, hendrerit vitae porttitor eu, aliquet vitae sem. Fusce facilisis tristique quam nec pulvinar. Proin posuere lorem dolor, ac suscipit erat rutrum vitae. Praesent mi velit, fringilla commodo velit sed, elementum congue metus. Maecenas vel justo tincidunt, viverra tortor egestas, sollicitudin ipsum. In ut urna dolor. Morbi consectetur finibus hendrerit. Fusce at est mauris. Pellentesque bibendum ex non felis commodo, a condimentum magna mattis.');

let loremIterator = loremText[Symbol.iterator](); 
console.log(loremIterator.next());
console.log(loremIterator.next());


// Para iterarlo, vamos a usar for of que permite iterar sobre iteradores

for( let word of loremText ){    
    console.log(word);
}

console.log([...loremText]);



// Generadores
// Los generadores no son mas que un tipo de funcion que puede devolver mas de un valor. 
// Un generador lo que hace es pausar la ejecucion de una funcion hasta que se le vuelve a llamar de nuevo.


import "babel-polyfill";


 
function* generatorFunction() {
    console.log('Hola');
    yield 1;
    console.log('Que tal?');
    yield 2;
}


let objectGenerator = generatorFunction();

//  console.log(objectGenerator.next().value); // 0
//  console.log(objectGenerator.next().value); // 1
//  console.log(objectGenerator.next().value); // 2
  
 
function* idMaker(){
    var index = 0;
    while(true)
        yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2 



function* abc() {
    yield 'a';
    yield 'b';
    yield 'c';
    yield 'd';
    yield 'e';
}

var char = abc();
//console.log([...char]);
console.log(char.next().value);
console.log(char.next().value);
console.log(char.next().value);

 

for (let characters of abc()){
    console.log(characters);
} 


// Ejemplo del lorem ipsum con generadores



class LoremIpsumGen {
    
    constructor(text) {
        this._text = text;
    }

    *words() {
        const re = /\S+/g;
        let match;
        while( match = re.exec(this._text) ){
            yield match[0];
        }
    }

}

const loremText = new LoremIpsumGen('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor metus hendrerit, faucibus eros vitae, semper mauris. Curabitur pellentesque nisl ut sagittis auctor. Curabitur molestie, mi eu lacinia blandit, tellus nibh laoreet est, vel porttitor odio elit a tellus. Phasellus auctor massa in odio rhoncus maximus. Quisque lorem odio, hendrerit vitae porttitor eu, aliquet vitae sem. Fusce facilisis tristique quam nec pulvinar. Proin posuere lorem dolor, ac suscipit erat rutrum vitae. Praesent mi velit, fringilla commodo velit sed, elementum congue metus. Maecenas vel justo tincidunt, viverra tortor egestas, sollicitudin ipsum. In ut urna dolor. Morbi consectetur finibus hendrerit. Fusce at est mauris. Pellentesque bibendum ex non felis commodo, a condimentum magna mattis.');

let wordsLorem = loremText.words();

console.log(...wordsLorem);


// Imprimir por pantlla Mr si es hombre o Mrs si es mujer = el nombre del usuario

const users = [
    {   sex: 'M',   name:   'John'  },
    {   sex: 'W',   name:   'Lucia'  }
];

class Users {
    constructor(people) {
        this._people = people;
    }

    *alias() {
        for ( let person of this._people ) {
            yield person.sex === 'M' ? `Mr. ${person.name}` : `Mrs. ${person.name}`;
        }
    }
}

let displayUsers = new Users(users);

let usersObj = displayUsers.alias();

for ( let usersItem of usersObj) {
    console.log(usersItem);
}





/*****************************/
/*** ----- Promesas ------ ***/
/*****************************/

// ES una funcionalidad que te permite usar un valor que sabes en el momento de la escritura del codigo que puedes no tener, pero que en un 
// futuro si tendras

// Tiene un ciclo de vida copuesto por dos estados:
//  - Fulfilled: la operacion asincrona de la promesa se ha completado con exito
//  - Rejected: la operacion asincrona no se ha completado con exito, ya sea por un error o por otra causa

// La sintaxis de la declaracion de la promesa es la siguiente:
 
const doPromise = () => {
    return new Promise( (resolve, reject) => {
        // Do something
        if (error) {
            reject(error);
        } 
        // If success
        resolve(result);
    });
}
  
// Uso
 
let promiseResult = doPromise();

promiseResult.then((result) => {
    // fullfillment
}).catch((err) => {
    // rejection
}); 

 
function runAnimation(position) {
    console.log('Moving to position...',position);
}

function delay(interval) {
    return new Promise( function(resolve) {
        setTimeout(resolve, interval);
    });
}

runAnimation(0);
delay(1000)
    .then( function() {
        runAnimation(1);
        return delay(1000);
    })
    .then( function() {
        runAnimation(2);
    }); 




// generar tiempos aleatorios 
function getRandomTimeout() {
    return Math.floot(Math.random() * (1 - 5) + 5) * 1000;
}


function animation(position) {
    return new Promise( function(resolve) {
        setTimeout(resolve, getRandomTimeout());
    });
}


// Promise.all sirve para esperar a todas las promesas que se le pasa por array antes de ejecutar el then
Promise.all([
    animation(1),
    animation(2),
    animation(3),
    animation(4),
    animation(5),
    animation(6),
    animation(7),
    animation(8)
]).then(function() {
    animation(9);
});





// Export e import

const square = (n) => n*n;
console.log(square(3));

import { Calculator } from './modules/calculator';

let miCalculadora = new Calculator('Jokin');

// console.log(miCalculadora.sumar(4,9,7,1));
// console.log(miCalculadora.dividir(4,2,'3'));


// Se puede importar todo el módulo y cada una de las clases serán métodos del objetos con nombre "alias" definido en la importación 

import * as lib from './modules/calculator';

let miOtraCalculadora = new lib.Calculator('Otra');

// console.log(miOtraCalculadora.sumar(4,9,7,2));
// console.log(miOtraCalculadora.dividir(4,2,1));


// Se puede importar el módulo dándole un alias
// import { member1 , member2 as alias2 , [...] } from "module-name";
import { Calculator as miAliasCalculadora  } from './modules/calculator';


let miOtraMasCalculadora = new miAliasCalculadora('Alias');

// console.log(miOtraMasCalculadora.sumar(4,0));
// console.log(miOtraMasCalculadora.dividir(4,1,1));


// Cuando se exporta algo con default
/*  Exportación:
    
        En ejem.js
            export default function (obj) {
                ...
            };

            
    Importación:
        
        En index.js ( Las dos siguientes importaciones son equivalentes )
            import { default as foo } from 'ejem';
            import foo from 'ejem';    
*/    

// Export e import
/*
    https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export
    https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import
*/




/*****************************/
/*** ----- Promesas ------ ***/
/*****************************/

function runAnimation(position) {
    console.log('Moving to position...',position);
}

function getRandomTimeout() {
    return Math.floor(Math.random() * (1 - 5) + 5) * 300;
};

function delay(interval) {
    return new Promise( function(resolve) {
        setTimeout(resolve, getRandomTimeout());
    });
}
/*
runAnimation(0);

delay(1000)
    .then( function() {
        runAnimation(1);
        return delay(1000);
    })
    .then( function() {
        runAnimation(2);
        return delay(1000);
    })
    .then( function() {
        runAnimation(3);
        return delay(1000);
    })
    .then( function() {
        runAnimation(4);
    }); 

*/


/*******************************************************/
/*** ----- Nuevos métodos añadidos a Objetos  ------ ***/
/*******************************************************/



/****************************/
/*** ----- Strings ------ ***/
/****************************/

console.log('++++++++++ Strings +++++++++++');  

let loremText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.'; 

console.log(loremText.startsWith('Lorem'));

// .startWith puede recibir un parámetro que será el índice a partir del cual queremos ver si el texto empieza por 'Lorem'
console.log(loremText.startsWith('ipsum',6));

console.log(loremText.endsWith('tincidunt.'));

console.log(loremText.includes('sociis'));

console.log('x'.repeat(3)); // xxx



/***************************/
/*** ----- Number ------ ***/
/***************************/

console.log('++++++++++ Numbres +++++++++++');  

console.log(Number.isInteger(25,9));  //true
console.log(Number.isInteger(25,9));  //false
console.log(Number.isInteger(25.0));  //true

console.log(Number.isNaN(NaN));       //true

console.log(Number.isNaN('asd'));     //false



/**************************/
/*** ----- Array ------ ***/
/**************************/

// new Array(element0, element1[, ...[, elementN]])
// [ 1, 2 ]

let items = new Array(1,2); 

console.log(items.length);          // 2
console.log(items[0]);              // 1
console.log(items[1]);              // 2
console.log("mapeo");
console.log(items.map( a => 2*a )); // [ 2, 4 ]
console.log("fin mapeo");    



// new Array(arrayLength-N )
// [ undefined, undefined, undefined, ..., elementN ]

let items2 = new Array(2);   
console.log(items2.length);  // 2
console.log(items2[0]);      // undefined
console.log(items2[1]);      // undefined
  

// The Array.of() method creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.

let items3 = Array.of(2);
console.log(items.length);  // 1 
console.log(items[0]);      // 2



// Convertir en Array los objetos que parecen arrays pero que no lo son
// Por ejemplo, arguments

function doSomething() {
    
    console.log(arguments);                     // { '0': 'a', '1': 'b', '2': 'c', '3': 'd' }
    console.log(typeof arguments);              // object
    
    
    // The Array.from() method creates a new Array instance from an array-like or iterable object.
    //console.log(arguments.map( a => 2 * a ));     // TypeError: arguments.map is not a function
    
    let args = Array.from(arguments);           // Convierte arguments en un array
    console.log(args);                          // [ 'a', 'b', 'c', 'd' ]
    console.log(args.map( a => '2'+a ));        // [ '2a', '2b', '2c', '2d' ]
}

doSomething('a','b','c','d');


let numberArray = [ 25, 30, 12, 55, 23, 45 ];

// Array.prototype.find()
// The find() method returns the value of the first element in the array that satisfies the provided testing function. 
// Otherwise undefined is returned.

// Buscar en un Array el primer item con numero mayor de 28

console.log(numberArray.find(item => item > 28)); // Devuelve el primer elemento del array que sea mayor de 28

// Array.prototype.findIndex()
// The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. 
// Otherwise -1 is returned.

// Buscar el indice en el Array del primer item con numero mayor de 28

console.log(numberArray.findIndex(item => item > 28)); // 1





/**************************/
/*** ------ Sets ------ ***/
/**************************/

// Son parecidos a los arrays y permiten almacenar valor unicos, tanto valores primitivos como objetos referenciales
// The Set object lets you store unique values of any type, whether primitive values or object references.
// new Set([iterable]);

let mySet = new Set();
mySet.add('foo');

for ( let item of mySet ) {
    console.log(item);
} 

// min 40

// Article interesnte sobre set en: http://www.etnassoft.com/2016/09/13/el-objeto-set-en-javascript-los-nuevos-arrays-en-es6-teoria-ejemplos-y-rendimiento-comparado/

// Para declarar una nueva instancia del objeto Set, utilizamos el opeador new. Por el momento, no tenemos una notación literal o abreviada.

var fooSet = new Set( [iterable] );

// Como parámetro, el constructor solo acepta un objeto de tipo iterable: Array, Map, String, arguments… El propio objeto Set, al ser un iterable, puede utilizarse como argumento en el momento de crear uno nuevo.

var str = 'Hello World',
    arr = [ 'foo', 'bar' ],
    map = new Map();
 
var set1 = new Set( str );
var set2 = new Set( arr );
var set3 = new Set( map );
var set4 = new Set( set1 );
 
console.info( set1, set2, set3, set4 );
// Set {} Set {} Set {} Set {}
// Métodos básicos
// Para poder trabajar de forma efectiva con una colección, necesitaremos métodos que permitan acceder a sus elementos. Estos serían los básicos:

// add: añade un elemento al Set
// delete: elimina un elemento del Set
// forEach: permite aplicar una función sobre cada elemento del Set (según su orden de insercción)

// Add
// Para añadir un elemento a nuestro Set, utilizamos el método add:

var mySet = new Set();
 
mySet.add( 1 );
mySet.add( 'foo' );


// Además de valores, podemos añadir expresiones a nuestro Set para que sean evaluadas en tiempo de ejecución:

mySet.add( 4 * 2 ); // 8
 
var fn = () => 'Hello World';
 
mySet.add( fn() ); // Hello World

// También podemos encadenar los métodos consiguiendo un flujo más funcional:

var mySet = new Set().add( 'foo' ).add( 'bar' );
 
console.info( mySet.size ); // 2

// Si añadimos un valor dos veces, éste se ignora:

var mySet = new Set( [ 'foo', 'foo', 'bar' ] );
console.info( mySet.size ); // 2


// La igualdad de valores se realiza mediante una comparación interna de tipo estricto (===), lo que significa que ésta no aplica a objetos (los cuales, por definición, son siempre diferentes en Javascript):

var objA = {},
    objB = {};
 
console.info( objA === objB ); // false
 
var mySet = new Set( [ objA, objB ] );
console.info( mySet.size ); // 2

// Delete
// Para borrar un elemento, utilizamos el método delete. Javascript devuelve un Boolean indicando el resultado de la operación:

mySet.delete( 'foo' ); // true
mySet.delete( 'foobar' ); // false
 
var result = mySet.delete( 'bar' );
 
console.info( result ); // false
console.info( typeof result ); // boolean


// Igual que en el caso anterior, también podemos operar con expresiones:

var fn = ( x ) => Math.pow( x, 2 );
 
mySet.delete( fn( 12 ) ); // false (144)


// Esta sí resulta una novedad con respecto al objeto Array el cual, como bien sabemos, no incorpora un método nativo para eliminar un elemento.

// forEach
// Al igual que el objeto Array y otros iterables, el objeto Set permite recorrer sus elementos para aplicar una función (callback) sobre cada valor. El orden utilizado es estrictamente el de inserción:

var mySet = new Set();
 
mySet.add( 1 );
mySet.add( 'foo' );
 
mySet.forEach( ( ele ) => console.info( ele ) );
// 1
// foo


// El callback del forEach recoge hasta tres valores: los dos primeros (idénticos) son el elemento sobre el que se itera mientras que el tercero apunta al propio objeto Set:

mySet.forEach( ( ele, n, obj ) => console.info( ele ) );
// 1 1 Set {}
// foo foo Set {}
// NOTA: Desconozco porque los dos primeros argumentos referencian al mismo valor. Ya en la especificación, se establece de dicho modo: “the first two arguments are a value contained in the Set. The same value is passed for both arguments.”

// La propiedad size
// La propiedad size, tal y como su nombre sugiere, permite obtener el número de elementos que componen un conjunto dado. El valor devuelto se corresponde con el instante en que se realiza la consulta:

var mySet = new Set();
 
mySet.add( 1 );
mySet.add( 'foo' );
mySet.add( 'foobar' );
 
console.info( mySet.size ); // 3
 
mySet.delete( 'foo' );
console.info( mySet.size ); // 2


// Iteración
// Al estar trabajando con objetos iterables, podemos recorrer su contenido utilizando un bucle de tipo for…of:

var mySet = new Set().add( 'foo' ).add( 'bar' ).add( 'foobar' );
 
for ( let ele of mySet ) {
    console.info( ele );
}
 
// foo
// bar
// foobar


// Otros métodos
// Completando la API de este nuevo objeto tenemos los siguientes métodos:

// clear: elimina todos los elementos de un conjunto.
// has: comprueba que un valor, o el resultado de una expresión, se encuentra en el Set. Devuelve un valor true o false.
// entries: devuelve un objeto de tipo iterable que contiene a su vez un array con los valores de cada elemento del Set.
// values: devuelve un objeto de tipo iterable con el valor de cada uno de los elementos del Set.
// keys: idéntico al método values.
// var mySet = new Set( [ 'foo', 'bar', 'foobar' ] );
 
// has
console.info( mySet.has( 'bar' ) ); // true
console.info( mySet.has( 'xxx' ) ); // false
 
// entries
for ( let value of mySet.entries() ) {
    console.info( value );
}
 
// values
for ( let value of mySet.values() ) {
    console.info( value );
}
 
// keys
for ( let value of mySet.keys() ) {
    console.info( value );
}
 
// Clearing
mySet.clear();
console.info( mySet.size ); // 0


// Límite de elementos
// Tal y como ocurre con el objeto Array, el límite de elementos de un conjunto de tipo Set se define en gran medida por el escenario sobre el que se ejecuta el código.

// Según la especificación, este límite se corresponde con el máximo valor de un entero en 32 bits, lo que evivale a un 2 elevado a la 32 potencia. Esto se comprueba utilizando la operación abstracta interna ToInt32, quedando como valor máximo posible el 4.294.967.295.

// Conversiones
// Como se ha comentado más arriba, un array puede convertirse en un objeto Set con tan solo referenciarlo en su constructor:

var myArr = [ 'foo', 'bar', 'foobar' ],
    mySet = new Set( myArr );
 
console.info( mySet.size ); // 3
 
mySet.forEach( x => console.info( x ) );
// foo
// bar
// foobar
// Si añadimos el array a un Set ya declarado utilizando el método add, lo que se añade es la referencia al array como objeto, no a sus valores independientes:

var myArr = [ 'foo', 'bar', 'foobar' ],
    mySet = new Set();
 
mySet.add( myArr );
 
console.info( mySet.size ); // 1
mySet.forEach( x => console.info( x ) );
// ["foo", "bar", "foobar"]


// Para añadir cada uno de los elementos de un array a un Set ya declarado, se pueden utilizar los métodos nativos de Array como por ejemplo map:

var myArr = [ 'foo', 'bar', 'foobar' ],
    mySet = new Set();
 
myArr.map( i => mySet.add( i ) );
 
console.info( mySet.size ); // 3


// La acción contraria, convertir un Set en un array, puede conseguirse de varias formas. Tomemos un Set de ejemplo:

var mySet = new Set();
 
mySet.add( 'foo' );
mySet.add( 'bar' );
mySet.add( 'foobar' );


// Y apliquemos distintos métodos de conversión:

// Operador de propagation
var myArr = [ ...mySet ];
 
console.info( myArr );
// ["foo", "bar", "foobar"]
 
console.info( myArr instanceof Array ); // true

// Método Array.from
var myArr = Array.from( mySet );
 
console.info( myArr );
// ["foo", "bar", "foobar"]
 
console.info( myArr instanceof Array ); // true


// Filtrado y mapeado
// A diferencia del objeto Array, Set no dispone de los métodos filter() y map(). Para conseguir esta funcionalidad, debemos realizar una conversión previa, operar, y después reconvertir de nuevo nuestro conjunto:

var mySet = new Set().add( 'foo' ).add( 'bar' ).add( 'foobar' );
 
mySet = new Set( [ ...mySet ].map( ele => ele.toUpperCase() ) );
 
mySet.forEach( ele => console.info( ele ) );
// FOO
// BAR
// FOOBAR
 
mySet = new Set( [ ...mySet ].filter( ele => ele.length < 4 ) );
mySet.forEach( ele => console.info( ele ) );
// FOO
// BAR


// Operando entre conjuntos: intersección y diferencia
// Las operaciones básicas entre conjuntos (intersección y diferencia) se consiguen a través del anteriormente mencionado método filter. Para ello, debemos realizar esa conversión previa mencionada más arriba:

// Intersección
// Para obtener los elementos del conjunto A repetidos en el conjunto B:

var setA = new Set( [ 'Monday', 'Tuesday', 'Friday', 'Saturday' ] ),
    setB = new Set( [ 'Tuesday', 'Sunday', 'Wednesday', 'Thursday' ] );
 
var setC = new Set( [ ...setA ].filter( x => setB.has( x ) ) );
console.info( setC.size ); // 1
 
setC.forEach( x => console.info( x ) ); // Tuesday


// Diferencia
// Para obtener los elementos del conjunto A no presentes en el conjunto B:

var setC = new Set( [ ...setA ].filter( x => ! setB.has( x ) ) );
 
console.info( setC.size ); // 3
 
setC.forEach( x => console.info( x ) );
// Monday
// Friday
// Saturday


// Unión
// Dado que un objeto Set es un conjunto de valores únicos, la suma de un conjunto A y B resulta de la agregación natural de ambos:

var setC = new Set( [ ...setA, ...setB ] );
 
console.info( setC.size ); // 7
 
setC.forEach( x => console.info( x ) );
// Monday
// Tuesday
// Friday
// Saturday
// Sunday
// Wednesday
// Thursday


// A esto se le llama Strong Set. Se le llama strong porque permite almacenar una referencia a un objeto a pesar de que este deje de exsitir, es decir:

let set = new Set();
let key = {};
set.add(key);
console.log(set.size);      // 1

key = null;
console.log(set.size);      //1
key [...set][0];
console.log(key);           // [object Object] { ... }



// Para no almacenar referencias a objetos que ya no existen, se han creado los WeakSet:

let weakSet = new WeakSet();
let weakKey = {};

set.add(weakKey);
console.log(weakSet.has(weakKey));      // true

weakKey = null;
console.log([...weakSet]);              // [] Da como resultado un array vacio







/*************************/
/*** ------ Map ------ ***/
/*************************/

// Un Map es como un set pero con clave: valor

let course = new Map();
course.set('title', 'Aprende ES6');
course.set('sessions', 6);

console.log(course.get('title'));
console.log(course.get('sessions'));

let map = new map(), 
    key1 = {},          // Se pueden crear key con objetos, al almacenarse la direccion del puntero
    key2 = {};
    
map.set(key1, 5);
map.set(key2, 42);

console.log(map.get(key1));
console.log(map.get(key2));


// De la misma forma que antes, existen los WeakMaps

let map = new WeakMap();
let element = {};

map.st(element, 'Original');

let value = map.get(element);
console.log(value);                 // Original

element = null;

console.log(map.get(element));      // undefined






/******************************/
/*** ------ Symbols ------ ***/
/******************************/

// LSymbol es un tipo de datos cuyos valores son únicos e immutables. Dichos valores pueden ser utilizados como identificadores (claves) de las 
// propiedades de los objetos.  Cada valor del tipo Symbol tiene asociado un valor del tipo String o Undefined que sirve únicamente como descripción del símbolo.

// La función Symbol primitive data type es el constructor de valores del tipo Symbol. Cuando Symbol es llamado como función nos devuelve una nuevo valor del tipo Symbol. 
// El constructor Symbol no debe ser usado con el operador new. Tampoco debe ser extendido mediante clases.

// Sintaxis --- Symbol([description])

let mySymbol = new Symbol('mySymol');


// Imaginemos

var COLOR_RED       = 'Red';
var COLOR_ORANGE    = 'Orange';
var COLOR_YELLOW    = 'Yellow';

var COLOR_RED_DARK  = 'Red';


function printColor ( color ) {
    
    switch ( color ) {
        case COLOR_RED:
            console.log('Rojo');
            break;
        case COLOR_RED_DARK:
            console.log('Rojo Oscuro');
            break;
        case COLOR_ORANGE:
            console.log('Naranja');
            break;
        case COLOR_YELLOW:
            console.log('Amarillo');
            break;
    }

}

printColor(COLOR_RED);           // Rojo
printColor(COLOR_RED_DARK);      // Rojo, Como se esta evaluando el valor 'Red' y tanto COLOR_RED como COLOR_RED_DARK tienen ese vlor, el switch suelta el primero que pilla.


var COLOR_RED       = Symbol();
var COLOR_ORANGE    = Symbol();
var COLOR_YELLOW    = Symbol();

var COLOR_RED_DARK  = Symbol();


function printColor ( color ) {
    
    switch ( color ) {
        case COLOR_RED:
            console.log('Rojo');
            break;
        case COLOR_RED_DARK:
            console.log('Rojo Oscuro');
            break;
        case COLOR_ORANGE:
            console.log('Naranja');
            break;
        case COLOR_YELLOW:
            console.log('Amarillo');
            break;
    }

}

printColor(COLOR_RED);           // Rojo
printColor(COLOR_RED_DARK);      // Rojo Oscuro


// min 1:07:00
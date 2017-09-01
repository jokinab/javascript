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


var colors = [ 'red', 'green', 'blue' ];

// En ES6 se ha propuesto solucion a tener que recorrer los objetos de fora ordenada

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
    el objeto  (or one of the objects up its prototype chain) debe tener una propiedad con la clave Symbol.iterator:
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
};


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
    animation(9)
})



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
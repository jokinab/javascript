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
   // console.log(word);
}
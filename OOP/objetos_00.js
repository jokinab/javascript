// Tipos de datos en JS
/*
    String
    Number
    Boolean
    Object
*/

// Tipos de objetos en JS
/*
    String()
    Number()
    Boolean()
    Object()
    Function()
    Date()
    RegExp()
    Error()
*/


//Valores Primitivos 

var saludo = "Hola clase";
var nAsistentes = 100;
var onAir = true;
var nulo = null;
var indefinida;

console.log(typeof saludo); //string
console.log(typeof nAsistentes); // number
console.log(typeof onAir); // boolean
console.log(typeof nulo); // null
console.log(typeof indefinida); // undefined


//Crear objeto en javascript

// 1 Object Literals

var gatito = {
    vidas: 7,
    edad: 1,
    raza: 'egipcio',
    convida: true,
    getRaza: function() {
        return this.raza;
    }
};

console.log( gatito.vidas );
console.log( gatito.getRaza() );

// 2 Object Constructors 

var politico = new Object();

politico.honrado = true;
politico.sobres = 0;
politico.honradez = function() {
    return politico.honrado;
};

console.log(politico.sobres);
console.log(politico.honradez());

//Valor primitivo
var strSaludo = String("Nuevo Saludo creado sin new");
console.log(strSaludo+' --> '+typeof strSaludo);

//Objeto nativo
var newSaludo = new String("Nuevo Saludo creado con new");
console.log(newSaludo+' --> '+typeof newSaludo);

var newNUmber = new Number(100);
console.log(newNUmber);
var newBoolean = new Boolean(true);
console.log(newBoolean);

var miTexto = 'Hola';
var miTextoClonado = miTexto;

miTexto = null;
console.log('tipo de miTexto: '+typeof miTexto); // Object
console.log('tipo de miTextoClonado: '+typeof miTextoClonado); //String

var edad1 = 20;
var edad2 = 20;
var edad3 = new Number('20');
var edad4 = edad3;
var edad5 = new Number(edad1);

console.log( edad1 == edad3); // true
console.log( edad1 === edad3); // false
console.log( typeof edad5); // false


// Cuando se compara objetos con '===' es una comparación de referncia, es decir, se compara si es el mismo objeto en memoria. 

var miObjeto = {};
var miObjetoClonado = miObjeto; // miObjetoClonado es una referencia de miObjeto

console.log(miObjeto === miObjetoClonado); // true

var miObjeto1 = { prop1: 'Prop' };
var miObjeto2 = { prop1: 'Prop' };

console.log(miObjeto1 === miObjeto2); // false. -> A pesar de tener mismas popiedades y valores, no es el mismo objeto en memoria. 

miObjetoClonado.prop1 = 'Attr';
console.log(miObjeto.prop1);
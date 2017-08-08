/******************************************************************/
/***** -------------- ES6 Orientado a Objetos --------------- *****/
/******************************************************************/

// ES5

//Dada una function 
var Vehicle = function Vehicle() {
    console.log('Soy una fucion!');
};

// Si la llamamos por medio de new, se convierte en una fucnion consructora
 
var motorcycle = new Vehicle();

console.log(typeof Vehicle);        // function
console.log(typeof Vehicle());      // Undefined porke no devuelve nada 
console.log(typeof new Vehicle());  // Object


// El objeto creado va a tener una propiedad constructor que sera Vehicle
// Tiene una propiedad constructor que contiene a la funcion a la que se ha llamado 
// por medio de new, por lo que esa propiedad es del tipo de dicha funcion 
console.log(motorcycle.constructor); // [function: Vehicle] 
console.log(motorcycle.constructor === Vehicle); // true 

// Por lo que podemos decir que motorcicle es una instancia de Vehicle 
console.log(motorcycle instanceof Vehicle); //true 

console.log(motorcycle);


var Postman = function Postman(){}
motorcycle.constructor = Postman;

console.log(motorcycle.constructor === Postman)  // true
console.log(motorcycle instanceof Vehicle); // true

// No es instancia de Postman, sino de Vehicle. 
// Un objeto creado, va a ser una instancia de la funcion por la cual se ha 
// creado hasta el dia que s muera, independientemente de que se le cambe despues 
// la propiedad constructora.

var Persona = function Persona(name) {
    this.name = name;
}

var myself = new Persona('jokin');

//console.log(typeof name); // undefined
console.log(myself.name); //jokin

Persona('Joan');
//console.log(name);




// ES5

var Vehiculo = function Vehiculo() {
    console.log('Solo soy una funcion!');
}


Vehiculo.prototype.wheelCount = 4;

var camion = new Vehiculo();

console.log(camion.wheelCount); // 4

Vehiculo.prototype.wheelCount = 6;

console.log(camion.wheelCount); // 6

camion.wheelCount = 10;

console.log(Vehiculo.prototype.wheelCount); // 6
console.log(camion.wheelCount); // 10

Vehiculo.prototype.go = function go() { return 'Broooommm!'};

console.log(camion.go());


// ES6

var Vehicle = function Vehicle( color, model) {
    //Initialization
    this.color = color;
    this.model = model;
} 

Vehicle.prototype = {
    go: function go(){
        return 'brooooom';
    },
    whoami: function whoami() {
        return 'I am '+this.color+' '+this.model;
    }
};

var Car = function() {};
Car.prototype = new Vehicle('red','Ford');
Car.prototype.honk = function() {return 'meeeeck!'; };

var ford = new Car();
console.log(ford.honk());
console.log(ford.go());
console.log(ford instanceof Car);       //true
console.log(ford instanceof Vehicle);   //true




/*********************************/
// Clonado o funcion de factoria //
/*********************************/

// Imagina qu lo unico que kieres es heredar propiedades de un objeto a otro, 
// sin lios de instancias de clases ni este tipo de cosas

function clone(parent) {
    var Clone = function() {};
    Clone.prototype = parent;
    return new Clone();
}

var car = { color: 'white' };

var ibiza = clone(car);
var toledo = clone(car);
var leon = clone(car);
toledo.color = 'red';

console.log(toledo.color); // red





// ES6

class Point {
    
    constructor( x, y ) {
        this.x = x;
        this.y = y;
    }

    toString() {
        // (x, y)
        return `(${this.x}, ${this.y})`;
    }
}

var p = new Point(25,26);

console.log(p.toString()); 
console.log(typeof Point);                      // function. Point es la funcion constructora de toda la vida con otra sintaxis

// Metodos estaticos 

//console.log( Point( 25, 26) );                //Error porke no se puede usar la funcion constructora Point coo una funcion normal


class Sample {
    constructor(value){
        this.value = value;
    }
    static staticMethod() {
        return 'Puedes llamar al metodo sin instanciar la clase';
    }
    prototypeMethod() {
        return 'Solo puedes llamar al metodo de protoptipo mediante una instancia de la clase';
    }
}   

let ejemplo = new Sample(123); 
console.log(ejemplo);

console.log(Sample.staticMethod());
//console.log(Sample.prototypeMethod());        // TypeError: Sample.prototypeMethod is not a function
                                                // Todas las instancias pueden acceder al metodo de protoptipo, pero no son accesibles fuera de la instancia
console.log(ejemplo.prototypeMethod());
//console.log(ejemplo.staticMethod());          // TypeError: ejemplo.staticMethod is not a function
                                                // Puedes llamar al metodo sin instanciar la clase pero no puedes llamarlo por medio de las instancias de la clase

console.log(Sample.prototype.prototypeMethod);  // [Function: prototypeMethod] --> El metodo prototype esta dentro del prtotipo de la clase
console.log(Sample.prototype.staticMethod);     // undefined --> El metodo statico no esta dentro del prototipo de las clase  


// Subclases

// Herencia en ES6

class Colorpoint extends Point {
   
    constructor(x,y,color) {
        super(x,y);                             // La llamada a super debe ser lo primero, si no, da error en tiempo de ejecucion
        this.color = color; 
    }
    
    toString() {
        return `Punto dibujado en coordenadas ${super.toString()} de color ${this.color}`;
    }

}

let puntoRojo = new Colorpoint(24,33,'azul');

console.log(puntoRojo.toString());              // Punto dibujado en coordenadas (24, 33) de color azul
console.log(puntoRojo instanceof Colorpoint);   // true 
console.log(puntoRojo instanceof Point);        // true



// Valores por defecto en constructores


class DefaultPoint extends Point {
   
    constructor( { x = 0, y = 1, color = 'amarillo' } = {} ) {
        super(x,y);                             // La llamada a super debe ser lo primero, si no, da error en tiempo de ejecucion
        this.color = color; 
    }
    
    toString(...parameters) {
        console.log(parameters);
        return `Punto dibujado en coordenadas ${super.toString()} de color ${this.color}`;
    }

}

let puntoPorDefecto = new DefaultPoint();
console.log(puntoPorDefecto.toString());        // Punto dibujado en coordenadas (0, 1) de color amarillo


let otroPorDefecto = new DefaultPoint({x:10,y:20});
console.log(otroPorDefecto.toString());         // Punto dibujado en coordenadas (10, 20) de color amarillo


let otroMasPorDefecto = new DefaultPoint({x:10,y:20,color:'azul'});
console.log(otroMasPorDefecto.toString('po','1',2));     // Punto dibujado en coordenadas (10, 20) de color azul




/* --- Concepto de Mixing --- */

// Es un tipo peculiar de Herencia Multiple: JS no soporta Mixing de forma nativa, pero se puede simular por medio del cambio de contexto.
// Un mixing es una clase incompleta, no está pensada para crear objetos de una clase, sino que está pensada para ser agregada a otra clase.
// Es decir que teniendo un objeto, el mixing lo que hace es añadir funcionalidad por medio de otro objeto. Injecta funcionalidad. 

var circleFns = {
    area: function(){
        return Math.PI*this.radius*this.radius;
    },
    grow: function(){
        this.radius++;
    },
    shrink: function(){
        this.radius--;
    }
};

var RoundButton = function(r,l){
    this.radius = r;
    this.label = l;
};

var button1 = new RoundButton(10,"Text 1");

// Tenemos button1, que tiene radius y label como propiedades. Lo que queremos hacer es que pueda usar las funciones area, grow y shrink que están definidas 
// en circleFns. Para ello usamos mixing. Por ejemplo, deberíamos poder usar button1.area(), button1.grow(), etc...


// Hay varios métodos:

// 1.- A fuerza bruta (backbone):copia toda función de circleFns una a una y las añade como propiedades en button1

function extend(destination, source){
    for (var k in source){
        if ( source.hasOwnProperty(k) ){
            destination[k] = source[k];
        }
    }
    return destination;
}

//extend(button1,circleFns);
//console.log(button1.area());

// Pero para no tener la función extend metida de forma global pero sí accesible para todos los objetos, lo podemos hacer añadiéndolo al prototype de Object

Object.prototype.extend = function( source ){
    for ( var k in source ){
        if ( source.hasOwnProperty(k)){
            this[k] = source[k];
        }
    }
    return this;
};

button1.extend(circleFns);

console.log(button1.area());


// Misma forma pero código más sofisticado para hacer el mixing. Esto esta pillado del tutorial de patrones de diseño que esta en 
// http://clientes.coexia.net/jstutorial/patrones-de-diseno/javascript-design-patterns/the-mixin-pattern/

// Define a simple Car constructor
var Car = function ( settings ) {
    this.model = settings.model || "no model provided";
    this.color = settings.color || "no colour provided";
};
// Mixin
var Mixin = function () {};
Mixin.prototype = {
    driveForward: function () {
        //console.log( "drive forward" );
    },
    driveBackward: function () {
        //console.log( "drive backward" );
    },
    driveSideways: function () {
        //console.log( "drive sideways" );
    }
};
// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {
    
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
            // Alternatively (check prototype chain as well):
            // if ( !receivingClass.prototype[methodName] ) {
            // receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
}
// Augment the Car constructor to include "driveForward" and "driveBackward"
augment( Car, Mixin, "driveForward", "driveBackward" );
// Create a new Car
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});
// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();
// Outputs:
// drive forward
// drive backward
// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment( Car, Mixin );
var mySportsCar = new Car({
    model: "Porsche",
    color: "red"
});
mySportsCar.driveSideways();
// Outputs:
// drive sideways



/*++++++++++++++++++++*/
// Mixing funcionales //
/*++++++++++++++++++++*/

// Esta es la función que usamos como objeto de mixing, es decir, aquel que va a tener los métodos que querremos añadir al objeto destino 
 
var asCirculo = function(){
    this.area = function(){
        return Math.PI*this.radius*this.radius;
    };
    this.grow = function(){
        this.radius++;
    };
    this.shrink = function(){
        this.radius--;
    };
    return this;
};

var asBoton = function(){
    this.click = function(){
        console.log("clicked");
        return this;
    };
    return this;
};

var Circulo = function(r){
    this.radius = r;
    return this;
};

var c1 = new Circulo(10);
var foo = new asCirculo();

console.log(foo);

// Llamamos a la ejecución de asCirculo pero le pasamos el contexto de otro objeto ya existente.
// La función, al ejecutarse, añadirá a c1 las propiedades/métodos area, grow y shrink
// El tema aki va a estar en crear un mixing que pueda extender los objetos, pero que todos los objetos de tipo Circulo hereden a su vez todas las propuedades extendidas, 
// por lo tanto, el mixing lo hacemos contra el prototype de los objetos.

asCirculo.apply(Circulo.prototype);
console.log(Circulo.prototype);
 
asBoton.apply(Circulo.prototype);
console.log(Circulo.prototype);

console.log(c1.area());
console.log(c1.click());

var c2 = new Circulo(234);

console.log(c2.area());
console.log(c2.click());


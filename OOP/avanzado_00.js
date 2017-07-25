// Definición de una función constructora

var Rect = function(w,h) {
    this.width = w;
    this.height = h;
};

Rect.prototype.area = function() {
    return this.width * this.height;
};

// Un objeto de tipo función tiene un prototipo tipo prototype console.log(Rect.prototype); que es de la forma standar
// Un objeto NO función tiene una propiedad __proto__ console.log(ret1.__proto__); Esto me permite ver en cada momento cual es el prototipo asignado al objeto 

//El hecho de que Rect sea una función constructora lo define la forma en la que es llamada ---> mediante el operador "new"
var rect1 = new Rect(10,10);
console.log(rect1.area());

// Para crear objetos de tipo Rect usamos new Rect(param1,param2). El valor de this en esta función es el objeto que estamos creando con new. 
// EL valor de this es el contexto asociado a uan función, el ambito que marca el objeto propietario que lo contiene, en este caso rect1
// Pero en JS hay maneras de cambiar el contexto asociado a una función 

// Creamos rect2 usando JS Object Notation
var rect2 = {
    width:10,
    height:10,
    area1:this.width*this.height,   // NaN -> Esto no funciona porque this se define como el contexto dentro de una función
    area2: function(){
        return this.width*this.height;
    }                               // 100 -> Aquí si funciona porque this está dentro de una función
};

console.log(rect2.area1);       // NaN
console.log(rect2.area2());     // 100

var rect3 = {
    width:30,
    height:10
};

console.log("Salidas para comparar los objetos: ");
console.log(rect1.__proto__); // Rect { area: [Function] }  
console.log(rect3.__proto__); // {} Un obejto object vacio

// El prototipo de rect1 es Rect { area: [Function] }. Vemos que tiene el método area. Sin embargo, el prototipo de rect3 no tiene el método area. 
// El tema es que JS nos perimte cambiar el contexto, es decir, el valor de this. Para qué sirve esto?
// En el prototype de Object existen apply y call, por lo que estarán displonibles para todas las funciones. permiten ejecutar la función que los invoca en 
// el contexto de un objeto pasado como parámetro.

// Por ejemplo: 
/*  Queremos ejecutar 
    Rect.prototype.area = function() {
        return this.width * this.height;
    };
    pero en el contexto de rect3, es decir, que al ejectutar el método, this será el contexto de rect3.  
    var rect3 = {
        width:30,
        height:10
    };
*/ 
console.log(Rect.prototype.area.apply(rect3)); //300

// A esto se le llama cambiar el contexto de una función de JS. El valor de this en una función es el valor que tiene el contexto. El valor por defecto del contexto 
// es el objeto propietario de una función, es decir, el objeto dentro del cual está definida la función. Apply lo que nos permite es cambiar el contexto de una función  
// El método bind serviría para cambiar permanentemente el contexto de la invocaión de la función. Habría que mirar cómo ya que esto lo ha dicho en plan por encima sin especificar nada

// Apply y call estaría bien por ejemplo para temas de eventos: creamos una librería con una función de click (que se va a ejecutar cuando se apriete  un botoón) que 
// tiene una función de callback. yo kiero que los desarrolladores que utilicen mi librería usen la función de callback con un "this" que sea el del botón que sea pulsado. 




/* ++++++++++ Otra forma de tener herencia por prottipo ++++++++++++ */

// ¿Cómo puedo heredar el prototpipo de un objeto pero sin querer hacerlo por medio de la función constructora?

var RoundButton = function(radius, text){
    this.radius = radius;
    this.text = text;
};

var rb = new RoundButton(10, "hola");
rb.extraProperty = "extra";
// Lo que queremos hacer es crear un objeto que sea hijo de rb: que tenga su prototipo pero que también todas sus propiedades.

// Es decir, lo que quería sería esto más o menos
// var rbchild = {};
// rbchild.__proto__ = rb; // Pero __proto__ no está en el standar

// La forma oficial de crearlo sería mediante Object.create(prototipo)
var rbchild = Object.create(rb);

console.log(JSON.stringify(rb.__proto__));
console.log(JSON.stringify(rbchild.__proto__));



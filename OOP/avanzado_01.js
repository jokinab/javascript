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

extend(button1,circleFns);
console.log(button1.area());



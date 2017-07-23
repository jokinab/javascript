// Diferentes formas de declarar funciones
function hola (saludo) {
    return saludo;
};

var miSaludo = hola("aki tamos!!!");
console.log(miSaludo);

// LLamando al constructor del objeto Function 

var sumarDeUnModo = new Function('numero1','numero2','return numero1 + numero2');
console.log(sumarDeUnModo(2,2));


// Cuando se hace llamando al constructor new Function ([arg1[, arg2[, ...argN]],] functionBody)
// se crea una función en el global scope, por lo que podrá acceder a sus variables locales y a aquellas variables que estén en el global scope

var x = 10;

function createFunction1() {
    var x = 20;
    return new Function('return x;'); // esta x se refiere a la x global
}

function createFunction2() {
    var x = 20;
    function f() {
        return x; // esta x se refiere a la x de dos lineas más arria
    }
    return f;
}

var f1 = createFunction1();
console.log(f1());          // 10
var f2 = createFunction2();
console.log(f2());          // 20


//Si no se especifica un return, el tipo de valor retornado por una función siempre va a ser undefined

function holaSinReturn (saludo) {
    console.log(saludo);
};
console.log(typeof holaSinReturn === undefined);
console.log(typeof hola());




//Info de this buena en http://www.etnassoft.com/2012/01/12/el-valor-de-this-en-javascript-como-manejarlo-correctamente/
// this -  Se refiere al ambito de ejecución de una función (scope), this se refiere al obeto en el que está contenido


var suma = function() {
    return arguments[0] + arguments[1];
}; 

console.log(suma(2,2)); //devuelve 4

var miObjeto1 = {
    nombre: 'miObjeto1',
    metodo1: function() {
        console.log(this); 
    }
};

miObjeto1.metodo1(); //log 'miObjeto1'

var miObjeto2 = function() {
        console.log(this); 
};

miObjeto2(); //log window

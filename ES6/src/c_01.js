/*   Scope   */

(function() {
    var x = "prueba";
    console.log(x);
    if(true) {
        let x = "hola mundo";
    }   
    console.log(x);
})();

/*   Contexto   */

var obj = {
    foo: function() {
        console.log( this === obj );
    }
};

obj.foo();


let a = 'I am global';

function foo() {
    var b = 'I am local';
    console.log('existe a en el alcance local? ',!!a);
    console.log('existe b en el alcance local?s ',!!b);
    
    if (true) {
        console.log('existe c dentro de if? ',typeof c);
        var c = 'Soy una variable de la condicion if';
        console.log('existe c dentro de if? ',typeof c);

        b = 'b vale otra cosa.'
    }

    console.log('cuanto vale ahora b?',b)    
    // console.log('existe c fuera de if? ',!!c);

    for (let d = 0; d < 10; d++) {
        // ...
        if (!!d) {
            console.log('existe d dentro del for/if?', !!d);
            break;
        }
    }

    // console.log('existe d fuera de for? ', !!d);
}


foo();
console.log('Existe a en el alcance global?', !!a);
// console.log('Existe b en el alcance global?', !!b);


// Las constantes se deben se deben declarar como const y asignarles valor en el momento de la declaracion

const THIRTEEN = 45;
// THIRTEEN = 56; 
console.log(THIRTEEN);


// Si las declaramos como objetos, el objeto es una constante, pero no sus propiedades, que son accesibles.
const USER = {
    name: 'jokin',
    surname: 'arnal',
    age: '36'
};

// Tambien se pueden anadir nuevas propiedades al objeto
USER.newProp = 'nueva propiedad';
console.log('anadida propiedad newProp: ',USER);

// O eliminarlas 
delete USER.age;
console.log('eliminada propiedad age: ',USER);

// o cambiarlas
USER.name = 'bilbao';
console.log('cambiada propiedad name: ',USER);
// Definir funciones

    // Declaración de funciones
    function sumar(numero1, numero2) {
        return numero1 + numero2;
    }
    sumar(2,2); // 4
    console.log(sumar(4,3));
   
    // Expresiones
    var add = function(numero1, numero2) {
        return numero1 + numero2;
    };

        /***********************************************************************************************************/
        //Cuidado
            // Hoisting  de JS
/*
            var resul = sumar(4,3);
            console.log(resul); // 7
        
            function sumar(numero1, numero2) {
                return numero1 + numero2;
            }

            var result = sumarNuevo(4,3);
            console.log(result); // Error -> funciones_01.js:25 Uncaught TypeError: sumarNuevo is not a function
        
            var sumarNuevo = function(numero1, numero2) {
                return numero1 + numero2;
            }
*/  
            /***********************************************************************************************************/    
 
            

// Funciones constructoras y su uso

    // Constructores de objetos
    
    //El patrón común oara construir objetos es con funtion
    function CuentaBancaria() {
        /* Numero de cuenta, saldo inicial, inversiones */ 
    }
    var cuentaMarta = new CuentaBancaria();
    var cuentaRamon = new CuentaBancaria();
    console.log(cuentaMarta.constructor)


    var party = {
        nombre: "Fin de Año",
        aforo: 200,
        cocktail: true,
        musica: ["Rock", "Pop", "House"],
        
        verNombre: function() {
            console.log("Fiesta: "+this.nombre);
        },
        
        musicaFavorita: function() {
            this.musica.forEach(function(genero){
                console.log("Preferencias: "+genero);
            });
        }
    }

    //Si queremos hacer diferentes objetos party, en vez de copy/paste podríamos usar un contructor

    function Party( nombre, aforo, cocktail, musica){
    
        this.nombre = nombre;
        this.aforo = aforo;
        this.cocktail = cocktail;
        this.musica = musica;
    
        this.verNombre = function() {
            console.log("Nombre "+this.nombre);
        };
    
        this.musicaFavorita = function() {
            this.musica.forEach(function(genero){
                console.log("Preferencias: "+genero);
            });
        }
    }   
    
    var party_endyear = new Party("Fin de año", 200, true, ["Soul","Jazz","Hip-Hop"]);
    
    console.log(party_endyear);

    party_endyear.verNombre();
    party_endyear.musicaFavorita();

    var party_halloween = new Party("Halloween", 1250, false, ["Pop","Electro","Hip-Hop"]);
    
    party_halloween.verNombre();
    party_halloween.musicaFavorita();


// Prototipos y funciones constructoras

    // Prototype Constructor. Sirve para construir Objetos basados en el prototype
    // Vamos a construir nuestros objetos a través del prototype

    function Fiesta() {

    }

    Fiesta.prototype.nombre = "Fiesta";
    Fiesta.prototype.aforo = 200;
    Fiesta.prototype.cocktail = 200;
    Fiesta.prototype.musica = ["Flamenco", "Latino"];

    Fiesta.prototype.verNombre = function() {
        console.log("Nombre "+this.nombre);
    };
    Fiesta.prototype.musicaFavorita = function() {
        this.musica.forEach(function(genero){
            console.log("Preferencias: "+genero);
        });
    }
    var endYear = new Fiesta();
    endYear.verNombre()
    console.log("nombre de endYear heredado de su prototipo: "+endYear.nombre);
    endYear.fecha = "03/09/2017";
    console.log(endYear);


    //Propiedades propias y heredadas

    var escuela = {nombre: "EscuelaIT"};

    console.log("nombre" in escuela);                   // true porque es una propiedad propia
    console.log("tipo" in escuela);                     // false porque no es una propiedad propia ni heredada
    console.log("toString" in escuela);                 // true porque es una propiedad heredada
    
    console.log(escuela.hasOwnProperty("nombre"));      // true porque es una propiedad propia
    console.log(escuela.hasOwnProperty("toString"));    // fasle porque no es una propiedad pr0pia
    
    //Para recorrer propiedades en un objeto

    var escuelaNueva = {
        nombre: "EIT",
        online: true,
        topics:['html5','JS','SEO','PHP']
    };

    for (var propEscuela in escuelaNueva) {
        console.log(propEscuela);
        console.log(escuelaNueva[propEscuela]);
    }


    // Eliminar propiedades
    
    var cartaRRMM = {papa:"Corbata", mama:"Colonia"};

    delete cartaRRMM.papa; // Solo se pueden borrar las propiedades propias del objecto

    for (var personas in cartaRRMM) {
        console.log(personas);
    } // Solo muestra mama

    delete cartaRRMM.toString; //Devuelve true, pero toString es un método heredado por lo que no se puede borrar
    
    console.log(cartaRRMM.toString()); // "[object Object]"


    // Serializar y deserializar objetos

    console.log("-----------------");    
    var cartaRRMM = {papa:"Libro", mama:"Bufanda", macarena:"iPad"};
    console.log(JSON.stringify(cartaRRMM));

    // Con formato
    console.log("Con formato: ");    
    console.log(JSON.stringify(cartaRRMM, null,4));
    
    var cartaRRMMString = '{"papa":"Libro", "mama":"Bufanda", "macarena":"iPad"}';

    // Convertimos ese texto en un objeto
    var cartaRRMMObject = JSON.parse(cartaRRMMString);

    // Ahora que es un objeto podemos acceder a sus propiedades
    console.log("Acceso a la propiedad papa");
    console.log(cartaRRMMObject.papa);


// Qué es el prototipo de un objeto

    function Comer(alimentos) {
        this.alimentos = alimentos;
        this.cantar = function() {
            console.log("Y también puedo cantar.");
        }; 
    }

    // Añadimos una método al prototipo de Comer, por lo que todas las instancias que hereden ese protoptipo heredarán el méodo digerir
    Comer.prototype.digerir = function() {
        console.log(this.alimentos);
    };

    // Desayunar hereda todas las propiedades y métodods de Comer.
    var desayunar = new Comer("Me como una tostada y la puedo digerir.");
    
    //No hace falta crear un método para digerir el desayuno ya que lo hereda de comer
    desayunar.cantar();
    desayunar.digerir();
    console.log(Comer.prototype);


// Herencia basada en prototipos: Sería como hacer extends?

    function NuevoCurso() {
        this.profesores = ['Miguel Angel','Kike', 'Sara'];
        this.level = 5;
        this.nuevisima = "Griego";
    }

    // Añadimos in método a la propiedad prototype
    NuevoCurso.prototype.mostrarTitulo = function() {
        console.log("El curso se titula: " + this.nombre + " y es " + this.online);
    };

    NuevoCurso.prototype.seraOnline = function() {
        if (this.online) {
            console.log("Es online! Yeah!");
        }
    };    

    function Curso (nombre, online) {
        this.nombre = nombre;
        this.online = online;
    }

    // Establecemos el constructor Nuevo Curso como prototype de Curso
    // Así se heredan las propiedades

    Curso.prototype = new NuevoCurso();
    Curso.prototype.nuevaClase = "Frances";

    // Creamos un nuevo Curso empleando el constructor Curso
    // Este nuevo objeto contiene las proppiedades propias, las de NuevoCurso y las de Object  
    
    var htmlCurso = new Curso("Curso de HTML","Online");


    // Todos los objetos heredan de object los siguientes métodos:
    /*
        constructor()
        hasOwnProperty()
        isPrototypeOf()
        propertyIsEnumerable()
        toLocaleString()
        toString()
        valueOf()
    */    

    function Gente() {
        this.vip = "Bill Gates";
    }

    Gente.prototype.futbolista = "Cristiano Ronaldo";

    var genteFamosa = new Gente();
    genteFamosa.vip = "Obama";

    console.log(genteFamosa.vip);
    console.log(genteFamosa.futbolista);
    console.log(genteFamosa.toString());
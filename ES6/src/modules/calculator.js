export class Calculator{
    
    constructor(text) {
        this._text = text;
        console.log(`Creada la calculadora ${this._text} en tu puta cara.` );
    }

    sumar(...numeros) {
        
        let valor = 0;
        
        for ( let numero of numeros ) {
            if ( typeof numero === 'number' ) {
                valor += parseFloat(numero);
            }else{
                console.log('No number --> ',numero);
            }
        }
        
        return valor;    
    }

    multiplicar(...numeros) {
        let valor = 1;
        
        for ( let numero of numeros ) {
            if ( typeof numero === 'number' ) {
                valor *= parseFloat(numero);
            }else{
                console.log('No number --> ',numero);
            }
        }
        
        return valor;
    }

    restar(...numeros) {
        let valor = 0;
        
        for ( let numero of numeros ) {
            if ( typeof numero === 'number' ) {
                valor -= parseFloat(numero);
            }else{
                console.log('No number --> ',numero);
            }
        }
        
        return valor;
    }

    dividir(...numeros) {
        
        if ( numeros.length < 2 ){
            return "Hay que mínimo 2 números para empezar.";
        }
        
        let numeIterator = numeros[Symbol.iterator](); 
        let nextObject = numeIterator.next();
        let objectValue; 
        let valor;
        let validOperation = false;
        
        do{

            objectValue = nextObject.value;
            console.log(" - "+typeof objectValue);
            nextObject = numeIterator.next();
            
            if ( (typeof objectValue !== 'number' )||( objectValue === 0 ) ) {
                console.log(`Aki se ha pasado ${objectValue} de tipo ${typeof objectValue} en vez de un numero positivo.`);
                continue;
            }
            
            if ( ( typeof valor === 'undefined')&&( typeof objectValue === 'number') ) {
                valor =  objectValue;
                continue;
            }
            
            if ( ( typeof valor !== 'undefined')&&( typeof objectValue === 'number')&&( objectValue !== 0 ) ) {
                validOperation =  true;
            }
          
            valor = valor / objectValue;
            
        }while(!nextObject.done);

        if ( validOperation ) {
            return valor;
        }    
        return "No se han introducido al menos dos números válidos.";

    }
    
}

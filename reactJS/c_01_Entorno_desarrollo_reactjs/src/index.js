import React from 'react';
import ReactDOM from 'react-dom';


// Si solo se va a retornar un elemento en un componente stateless
// la arrow function lo permite hacer en linea, sin especificar return
const HelloWorld = (props) => <h1>{props.heading}</h1>


// Si se va a retornar más de un elemento en un componente stateless
// la arrow function lo permite hacer especificando el return
const Gatito = (props) => {
    return (
        <div>
            <img src={props.img} />
            <h1>{props.heading}</h1>
        </div>
    );
    
}

ReactDOM.render(
    <HelloWorld heading='Hello from props!' img="image.jpg" />, 
    document.getElementById('app')
);

ReactDOM.render(
    <Gatito heading='Hello from props!' img="../img/gato.jpg" />, 
    document.getElementById('app2')
);
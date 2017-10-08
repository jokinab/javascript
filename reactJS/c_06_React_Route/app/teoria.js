//Importacion de modulos necesarios:

import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch 
} from 'react-router-dom';



<BrowserRouter                          // Router que usa la history API de HTML5 (pushState, replaceState y popstate event)
  basename={optionalString}             // :string URL base de todas las locations.
  forceRefresh={optionalBool}           // :bool Para forzar el refresco de la pagina en navegadores que no soporten el history navigation
  getUserConfirmation={optionalFunc}    // :func funcion para usar la confirmacion del user al navegar
  keyLength={optionalNumber}            // :number longitud del location key. por defecto 6
>
  <App/>                                // Children node
</BrowserRouter>




<Link
  to={string/object}                    // Ejm: <Link to="/courses"/>   o     <Link to={{ pathname: '/courses',  search: '?sort=name', hash: '#the-hash',  state: { fromDashboard: true }}}/>
  replace={bool}                        // Cuando es true, clickando sobre el link hara un replace de la entrada actual del historial en vez de anyadir una nueva
>


<NavLink>                               // Version especial de link que incorpora estilos al elemento renderizado cuando haga match la url actual
activeClassName: string                 // clase a anyadir cuando es active
activeStyle: object                     // estilo a anyadir cuando es activo
exact: bool                             // si es true, la activeclass/style se activaran cuando el match sea exacto
strict: bool                            // si es true, la trailin slash '/' se tendra en cuenta para evaluar si hace match o no
isActive: func                          // funcion que anyade mas logica para establecer si un link es activo no. 
location: object                        // compara el current history location 



<Redirect>                              // Renderizando redirect se navegara a una nueva location, que sobreescribira el history stack, como las redirecciones del lado del servidor
to: string                              // url a dirigirse
to: object                              // objeto al que redirigirse <Redirect to={{ pathname: '/login', search: '?utm=your+face', state: { referrer: currentLocation } }}/>
push: bool                              // si es true, la redireccion incorporara una nueva entrada en el history en vez de sobreescribir la actual  
from: string                            // la deireccion desde la que se redirije. Solo valido cuando se renderiza dentro de un switch 



<Route>                                 // Lo mas importante. Es el responsable de renderizar las interfazes cuando se hace un match
Route render methods                    // tres metodos para renderizar:
                                            
                                            // <Route component>
                                                
                                                //  Componente React a renderizar cuando el location hace match. Se renderizara con las route props
                                                //  Se usa React.createElement, por lo que cuando se renderiza, se crea un nuevo componente 
                                                
                                                <Route path="/user/:username" component={User}/>

                                                const User = ({ match }) => {
                                                  return <h1>Hello {match.params.username}!</h1>
                                                }
                                                
                                            // <Route render>

                                                //  Se puede usar para 

                                                //  renderizar sin crea un nuevo componente
                                                //  <Route path="/home" render={() => <div>Home</div>}/>

                                                //  wrapping/composing

                                                    const FadingRoute = ({ component: Component, ...rest }) => (
                                                      <Route {...rest} render={props => (
                                                        <FadeIn>
                                                          <Component {...props}/>
                                                        </FadeIn>
                                                      )}/>
                                                    )

                                                    <FadingRoute path="/cool" component={Something}/>


                                            // <Route children>
                                                // A veces se querra renderizar dependiendo si el path hace un match o no. En esos casos, se usara la proppiedad children function. Funciona igual que 
                                                   render salvo que se llama soo en caso de que haya un match. El metodo children recibe, al igual que render y component, todas las propiedades del route
                                                   excepto cuando el route no hace match con la url, cuando match es un null. Esto permite ajustar la interfaz basandonos en el matcheo. En este ejemplo
                                                   anyadimos la clase aciva si el route hace el match:
                                                   
                                                   <ul>
                                                      <ListItemLink to="/somewhere"/>
                                                      <ListItemLink to="/somewhere-else"/>
                                                    </ul>

                                                    const ListItemLink = ({ to, ...rest }) => (
                                                      <Route path={to} children={({ match }) => (
                                                        <li className={match ? 'active' : ''}>
                                                          <Link to={to} {...rest}/>
                                                        </li>
                                                      )}/>
                                                    )




Route props                               //  a los tres metodos de renderizado se les van a pasar las siguientes props:
                                         
                                          // match: es un objeto con informacion a cerca de como <Route path> hace match con la url. 
                                                * params (object) pares de key/valor parseadas de la url correspondientes a los segmentos dinamicos del path  
                                                * isExact (bolean) true si la url hace match
                                                * path (string) patron de path usado para hacer el match
                                                * url (string) la parte de la url matcheada. util para hacer links anidados
                                         
                                          // location: representa donde esta la app en el momento, donde se quiere ir, o donde estuvo.
                                                El enrutador proporcionará un objeto location en algunos lugares:    
                                                  * Route component as this.props.location
                                                  * Route render as ({ location }) => ()
                                                  * Route children as ({ location }) => ()
                                                  * withRouter as this.props.location
                                                Se puede proveer de location a:
                                                  * Web Link to
                                                  * Native Link to
                                                  * Redirect to
                                                  * history.push
                                                  * history.replace
                                                  Se puede proveer un string, pero si queremos hacer volver a la app a un lugar donde ya ha estado, podemos usar location:
                                                  // usually all you need
                                                    <Link to="/somewhere"/>

                                                    // but you can use a location instead
                                                    const location = {
                                                      pathname: '/somewhere'
                                                      state: { fromDashboard: true }
                                                    }

                                                    <Link to={location}/>
                                                    <Redirect to={location}/>
                                                    history.push(location)
                                                    history.replace(location)    
                                                Se puede pasar location a:
                                                  * Route
                                                  * Switch
                                          //  history: historico de sesiones 
                                                Hay tres tipos dependiendo el entorno:
                                                    * “browser history” - A DOM-specific implementation, useful in web browsers that support the HTML5 history API
                                                    * “hash history” - A DOM-specific implementation for legacy web browsers
                                                    * “memory history” - An in-memory history implementation, useful in testing and non-DOM environments like React Native
                                                Propiedades y metodos:
                                                    * length - (number) Numero de entradas en la pila del historial 
                                                    * action - (string) Accion actual a llevar a cabo (PUSH, REPLACE, or POP)
                                                    * location - (object) Localizacion actual. Debe tener las siguientes propiedades:
                                                        - pathname - (string) path de la url
                                                        - search - (string) el string de la consulta de url
                                                        - hash - (string) el fragmento hash de la url
                                                        - state - (string) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
                                                    * push(path, [state]) - (function) Anade una nueva entrada a la pila del historial
                                                    * replace(path, [state]) - (function) Sobreescribe la entrada actual de la pila del historial
                                                    * go(n) - (function) Mueve el puntero en la pila del historial n entradas
                                                    * goBack() - (function) Equivalente a go(-1)
                                                    * goForward() - (function) Equivalente a go(1)
                                                    * block(prompt) - (function) Bloquea la navegacion

component                                 // Metodos de renderizado. Explicado arriba
                                                   
render: func                              // Metodos de renderizado. Explicado arriba 

children: func                            // Metodos de renderizado. Explicado arriba 

path: string                              // Url valida que sea entendible por path-to-regexp

                                         

exact: bool                               // Cuando es true solo hara match si el path hace match con el location.pathname
                                          
                                          path	location.pathname	exact	matches?

                                          /one	/one/two	        true	  no
                                          /one	/one/two	        false	  yes
                                          
strict: bool                              //  el macthing se hace sensible al trailing slash '/'

                                          path	location.pathname	matches?
                                          /one/	/one	            no
                                          /one/	/one/	            yes
                                          /one/	/one/two	        yes
                                                    
location: object                          // ???

                                          A <Route> element tries to match its path to the current history location (usually the current browser URL). However, a location with a different 
                                          pathname can also be passed for matching. This is useful in cases when you need to match a <Route> to a location other than the current history location, 
                                          as shown in the Animated Transitions example. If a <Route> element is wrapped in a <Switch> and matches the location passed to the <Switch> (or the current 
                                          history location), then the location prop passed to <Route> will be overridden by the one used by the <Switch> (given here).



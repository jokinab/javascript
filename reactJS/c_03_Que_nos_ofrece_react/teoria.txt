Los componentes statefull tienen un ciclo de vida.

En cada etapa del ciclo de vida un componente puede hacer diferentes cosas. 

Ciclo de vida: diferentes etapas de ejecucion, renderizado, destruccion, actualizacion... Son 7 en total. 

Te permiten capturar la ejecucion de los componentes en diferentes etapas. Se podra hacer algo antes de que se renderice,
o cuando se actualice, etc... 

info: https://facebook.github.io/react/docs/react-component.html

Se dividen en tres tipos:

  -Montaje (Mounting):
    
    These methods are called when an instance of a component is being created and inserted into the DOM:
      
      constructor()
      componentWillMount()
      render()
      componentDidMount()

  -Actualizacion (Updating):
  
    An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
      
      componentWillReceiveProps()
      shouldComponentUpdate()
      componentWillUpdate()
      render()
      componentDidUpdate()
  
  -Desmontaje (Unmounting):
    
    This method is called when a component is being removed from the DOM:
      
      componentWillUnmount()
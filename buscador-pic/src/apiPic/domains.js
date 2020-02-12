export default class Domains {

  static getDomainToFetch() {
    
    let currentDomain = window.location.hostname;
    let domainToFetch;

    switch ( currentDomain ) {

      case 'testing.picnegre.com':
      case 'www.picnegre.com':
      case 'testing.shusski.com':
      case 'shusski.com':
        domainToFetch = `https://${currentDomain}`;
        break;
      case 'rentaski.coexia.net':
        domainToFetch = `https://testing.shusski.com`;
        break;
      case 'www.renta-ski.com':
        domainToFetch = `https://shusski.com`;
        break;   
      case '':
        domainToFetch = `https://testing.picnegre.com`;
        break;
      case 'localhost':
        domainToFetch = `https://testing.picnegre.com`;
        break;          
      default:
        break;
        
    }

    return domainToFetch;

  }

  static getDomainStyles() {
    
    let currentDomain = window.location.hostname;
    let domainStyles;

    switch ( currentDomain ) {

      case 'testing.picnegre.com':
      case 'www.picnegre.com':
        domainStyles = 'rojo';
        break; 
      case 'testing.shusski.com':
      case 'shusski.com':
      case 'rentaski.coexia.net':
      case 'www.renta-ski.com':
        domainStyles = 'azul';
        break;   
      case '':
        domainStyles = 'azul';
        break;
      case 'localhost':
        domainStyles = 'azul';
        break;          
      default:
        break;
        
    }

    return domainStyles;

  }

  
}
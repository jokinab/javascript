export default class Domains {

  static getDomainToFetch() {
    
    let currentDomain = window.location.hostname;
    let domainToFetch;

    switch ( currentDomain ) {

      case 'testing.picnegre.com':
        domainToFetch = `https://${currentDomain}`;
        break;
      case 'www.picnegre.com':
        domainToFetch = `https://${currentDomain}`;
        break; 
      case 'testing.shusski.com':
        domainToFetch = `https://${currentDomain}`;
        break;
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
  
}
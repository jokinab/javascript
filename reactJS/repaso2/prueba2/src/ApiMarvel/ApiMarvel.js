const API_URL = 'https://gateway.marvel.com:443/v1/public';
const APIKEY_QUERYSTRING = 'apikey=1746232ad739a6d56e75f025d04655f9';


export default class ApiMarvel {


    static getMarvelCharacters( offset ) {
      const url = `${API_URL}/characters?offset=${offset}&${APIKEY_QUERYSTRING}`;
      return  fetch(url);

    }

}

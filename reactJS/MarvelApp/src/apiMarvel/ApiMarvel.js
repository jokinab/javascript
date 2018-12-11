const API_URL = 'https://gateway.marvel.com:443/v1/public';
const APIKEY_QUERYSTRING = 'apikey=1746232ad739a6d56e75f025d04655f9';

export default class ApiMarvel {

    static getMarvelCharactersPage( page = 1 ) {

      const offset =  ( page - 1 ) * 20;
      const url = `${API_URL}/characters?offset=${offset}&${APIKEY_QUERYSTRING}`;

      return  fetch(url);

    }

    static getMarvelCharacter( id = 1011334 ) {

      const url = `${API_URL}/characters/id?${APIKEY_QUERYSTRING}`;

      return  fetch(url);
    }

}

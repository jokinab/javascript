  
const API_URL = 'https://testing.picnegre.com/alquiler/';
const ESTACIONES_LIST = 'getAllEstacionesTiendas';
const USER_INFO = 'getBuscadorInitInfo';


export default class ApiPic {

    static getEstacionesList() {
      return fetch(`${API_URL}${ESTACIONES_LIST}`);
    }

    static getInitInfo() {
      return fetch(`${API_URL}${USER_INFO}`);
    }

}
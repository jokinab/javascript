  
const API_URL = 'https://testing.picnegre.com/alquiler/';
const SKI_ESTACIONES_LIST = 'getAllEstacionesTiendasSki';
const BICI_ESTACIONES_LIST = 'getAllEstacionesTiendasBici';
const USER_INFO = 'getBuscadorInitInfo';

export default class ApiPic {

    static getSkiEstacionesList() {
      return fetch(`${API_URL}${SKI_ESTACIONES_LIST}`);
    }

    static getInitInfo() {
      return fetch(`${API_URL}${USER_INFO}`);
    }

    static getBiciEstacionesList() {
      return fetch(`${API_URL}${BICI_ESTACIONES_LIST}`);
    }

}
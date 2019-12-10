  
const API_URL = 'https://testing.picnegre.com/alquiler/getAllEstacionesTiendas';

export default class ApiPic {

    static getEstacionesList() {
      return  fetch(API_URL);
    }

}
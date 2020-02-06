const API_DOMAIN = 'https://testing.picnegre.com';  
const API_URL = '/alquiler/';
const SKI_ESTACIONES_LIST = 'getAllEstacionesTiendasSki';
const BICI_ESTACIONES_LIST = 'getAllEstacionesTiendasBici';
const USER_INFO = 'getBuscadorInitInfo';
const SEND_SKI_URL = '/alquiler/paso1_action';
const SEND_BICI_URL = '/alquiler_bici/paso1_action';
const TIENDAS_FORM_ESTACION_URL = '/alquiler/getAvailableStoresFromStation';

export default class ApiPic {

    static getSkiEstacionesList() {
      return fetch(`${API_DOMAIN}${API_URL}${SKI_ESTACIONES_LIST}`);
    }

    static getInitInfo() {
      let currentType = this.isHome();
      return fetch(`${API_DOMAIN}${API_URL}${USER_INFO}?currentType=${currentType}`);
    }

    static getBiciEstacionesList() {
      return fetch(`${API_DOMAIN}${API_URL}${BICI_ESTACIONES_LIST}`);
    }

    static sendSkiData( dataToSend = { fecha_inicio: '', fecha_fin: '', sector_id: '', estacionId: '', forfait_select: false }, lang = 'es' ) {
      
      let sendUrl = `${API_DOMAIN}/${lang}${SEND_SKI_URL}`;

      this.openPost(sendUrl, dataToSend);
      return;
    }

    static sendBiciData( dataToSend = { fecha_inicio: '', cuantos_dias: '', sector_id: '', store_id: '', estacionId: '' }, lang = 'es' ) {
      
      let sendUrl = `${API_DOMAIN}/${lang}${SEND_BICI_URL}`;

      this.openPost(sendUrl, dataToSend);
      return;

    }

    static openPost( url, params ){
      var formElement = document.createElement("form");
      formElement.setAttribute("method", "post");
      formElement.setAttribute("action", url);
      formElement.setAttribute("target", "_parent");
      formElement.setAttribute('style','visibility:hidden');
  
      for (let param in params) {
          
        var hiddenField = document.createElement("input");

        if ( param !== 'forfait_select' ) {
          hiddenField.setAttribute("name", param);
          hiddenField.setAttribute("value", params[param]);
          formElement.appendChild(hiddenField);
        } else {
          if ( params[param] === true ) {
            hiddenField.setAttribute("name", param);
            hiddenField.setAttribute("value", 1);
            formElement.appendChild(hiddenField);
          }
        }

      }        
      document.body.appendChild(formElement);
      
      formElement.submit();
    }   
    
    static getTiendasBiciFromEstacion(tiendaId, sectorId, estacionId) {
      return fetch(`${API_DOMAIN}${TIENDAS_FORM_ESTACION_URL}?id_store=${tiendaId}&id_sector=${sectorId}&my_lang=es&bici=bici&onlyoneshop=false`);
    }

    static getLoadingImageUrl() {
      return `${API_DOMAIN}/public/img/loading_buscador.gif`;
    }

    static isHome() {
      let currentPath = typeof window.currentUrlPathCustom !== 'undefined' ? window.currentUrlPathCustom : '/home/home';
      return currentPath;
    }

}
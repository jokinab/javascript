export default class DateTools {
  
  static calcManydays(bloquedDays = [], firstDay = '' ) {
    
    let manyDaysAvailable = [];
    
    for (let i=0; i<12; i++) {

      let inNDays = new Date(firstDay);
      inNDays.setDate(inNDays.getDate() + i);
      let formatedDate = this.formatDateToString(inNDays);
      if ( !bloquedDays.includes(formatedDate) ){
        manyDaysAvailable.push(formatedDate);
      } else {
        break;
      }
    }
    return manyDaysAvailable;
  
  }  

  static formatDateToString ( date = new Date() ) {
    
    let year = date.getFullYear();
    let month = date.getMonth();
    month = month + 1 > 12 ? 1 : month + 1;
    month = parseInt(month) < 10 ? '0'+month : month;
    let day = date.getDate();
    day = parseInt(day) < 10 ? '0'+day : day;

    return `${year}-${month}-${day}`;

  }

  static hasBloquedDaysInSelected( startDate, endDate, bloquedDays ) {
    
    let hasBloquedDay = false;
    let day = new Date(startDate);
    day.setHours(0,0,0,0);
    let endDay = new Date(endDate);
    endDay.setHours(0,0,0,0);
    let firstLoop = true;

    do{
      
      if ( firstLoop ) {
        day.setDate(day.getDate()+0); 
        firstLoop = false;
      } else {
        day.setDate(day.getDate() + 1); 
      }
      
      if ( bloquedDays.includes(this.formatDateToString(day) ) ) {
        hasBloquedDay = true;
      }

    }while( day.getTime() < endDay.getTime() && !hasBloquedDay );
    
    if ( bloquedDays.includes(this.formatDateToString(endDay) ) ) {
      hasBloquedDay = true;
    }

    return hasBloquedDay;

  }


  /* // Mirar si las condiciones de hora de reserva son necesarias
  // Devuelve el dia de posible alquiler dependiendo si es agencia o no, teniendo en cuenta las horas limites de reserva y el primer dia disponible dado por el servidor

  const getStartDate = ( isNotAgencia = true, firstDayAvailable ) => {

    // Miramos primero si es agencia para comparar con las horas limite de reserva. 
    // Para agencia, si es antes de las 13:00 se puede reservar el mismo dia
    // Para quien no es agencia, si se reserva antes de las 07:00, se puede reservar el mismo dia. 
    // En caso contrario, el primer deia disponible sera el dia siguiente

    let today = new Date();
    let currentHour = today.getHours();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    let availableDayByBookingHour = ''; 
    console.log('hora', currentHour);
    if (isNotAgencia) {
      availableDayByBookingHour = currentHour < 20 ? formatDateToString(today) : formatDateToString(tomorrow);
    } else {
      availableDayByBookingHour = currentHour < 13 ? formatDateToString(today) : formatDateToString(tomorrow);
    }
    console.log(availableDayByBookingHour)
    // Comparamos el dia calculado con el primer dia disponible calculado en el servidor.
    // Si el que hemos calculado nosotros es mayor que el del servidor, devolvemos el nuestro, si no, el suyo

    let availableFirstDayDate = new Date(`${firstDayAvailable}T00:00:00Z`);
    let availableDayByBookingHourDate = new Date(`${availableDayByBookingHour}T00:00:00Z`);

    console.log(availableDayByBookingHourDate.getTime())
    console.log(availableFirstDayDate.getTime())
      
    return  availableDayByBookingHourDate.getTime() > availableFirstDayDate.getTime() ? availableDayByBookingHour : availableDayByBookingHour;

  }
  */




}
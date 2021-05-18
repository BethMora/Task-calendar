export function numberToStringMonth(month) {
  let monthString = -1;
  switch (month) {
    case 1:
      monthString = "January";
      break;
    case 2:
      monthString = "February";
      break;
    case 3:
      monthString = "March";
      break;
    case 4:
      monthString = "April";
      break;
    case 5:
      monthString = "May";
      break;
    case 6:
      monthString = "June";
      break;
    case 7:
      monthString = "July";
      break;
    case 8:
      monthString = "August";
      break;
    case 9:
      monthString = "September";
      break;
    case 10:
      monthString = "October";
      break;
    case 11:
      monthString = "November";
      break;
    case 12:
      monthString = "December";
      break;
    default:
      monthString;
  }
  return monthString;
}
export function toMonthNumber(month) {
  let monthNumber = -1;
  switch (month) {
    case "January":
      monthNumber = "01";
      break;
    case "February":
      monthNumber = "02";
      break;
    case "March":
      monthNumber = "03";
      break;
    case "April":
      monthNumber = "04";
      break;
    case "May":
      monthNumber = "05";
      break;
    case "June":
      monthNumber = "06";
      break;
    case "July":
      monthNumber = "07";
      break;
    case "August":
      monthNumber = "08";
      break;
    case "September":
      monthNumber = "09";
      break;
    case "October":
      monthNumber = "10";
      break;
    case "November":
      monthNumber = "10";
      break;
    case "December":
      monthNumber = "12";
      break;
    default:
      monthNumber;
  }
  return monthNumber;
}

function addOneDay(date) {
  //2021-03-16 this formart
  const day = date.substr(8, 9);
  const sumDay = parseInt(day) + 0;
  if (sumDay < 10) {
    date = date.replace(day, "0" + sumDay);
  } else {
    date = date.replace(day, sumDay);
  }
  return date;
}

export function formatDateToLocal(date, time) {
  const dateModified = addOneDay(date);
  const dateTime = dateModified + " " + time;
  const dateLocal = new Date(dateTime);
  return dateLocal;
}

export function getFormatDate(dateWithTime) {
  try {
    let day = dateWithTime.split(" ");
    return day[0];
  } catch (error) {
    return onlyDate(dateWithTime);
  }
}

export function getFormatTime(time) {
  try {
    let day = time.split(" ");
    return day[1];
  } catch (error) {
    return timeEcuador(time)
  }
}

export function onlyDate(date) {
  try {
    const dateFormat = new Date(date);
    return dateFormat.toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch (error) {
    console.log(error);
  }
}

function convertAccordingHorary(time){
  switch(time) {
    case 1:
      return 13
    case 2:
      return 14
    case 3:
      return 15
    case 4:
      return 16
    case 5:
      return 17
    case 6:
      return 18
    case 7:
      return 19
    case 8:
      return 20
    case 9:
      return 21
    case 10:
      return 22
    case 11:
      return 23
    case 12:
      return 12
    default:
      // code block
  } 
}
//transformar de toISOString() a hora actual
// a toLocaleDateString() a toLocaleTimeString()
export function timeEcuador(dateTimeComplete) {
  
  try {
    const dateFormat = new Date(dateTimeComplete);
    const dateTime = dateFormat.toLocaleTimeString();
    if(dateTime.length>5){
      const horary = dateTime.substring(dateTime.length ,dateTime.length - 2);

      let hour = parseInt(dateTime.split(":")[0])
      let minute = parseInt(dateTime.split(":")[1])
      if(horary === "PM"){
       hour = convertAccordingHorary(hour)
      }else{
        if(hour === 12){
          hour= 0
        }
      }
      if(hour+"".length<2){
        hour = "0"+hour
      }
      if(minute+"".length<2){
        minute = "0"+minute
      }
      const timeOk = hour+":"+minute
      return timeOk

    }else{
      return dateFormat.toLocaleTimeString();
    }
  } catch (error) {
    console.log(error);
  }
}

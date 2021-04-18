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
  let day = dateWithTime.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = dateWithTime.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  return dateWithTime.getFullYear() + "-" + month + "-" + day;
}

function convertAccordingHorary(time){
  switch(time) {
    case 12:
      return 12
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
    default:
      // code block
  } 
}

export function getFormatTime(time) {
  let timeFormated = time.toLocaleTimeString();
  timeFormated =  timeFormated.split(":");
  let hour = timeFormated[0];
  let minute = timeFormated[1];
  let horary = timeFormated[2];
  horary =horary.substr(3,4)

  if(horary === "PM"){
    hour = convertAccordingHorary(parseInt(hour))
  }else{
    if(parseInt(hour) === 12 ){
      hour = 0;
    }
  }
  if (parseInt(hour)< 10 ) {
    hour = "0" + hour;
  }
  return hour + ":" + minute;
}

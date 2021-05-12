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
  let day = dateWithTime.split(" ");
  return day[0];
}

export function getFormatTime(time) {
  let day = time.split(" ");
  return day[1];
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

//transformar de toISOString() a hora actual
// a toLocaleDateString() a toLocaleTimeString()
export function timeEcuador(dateTime) {
  try {
    const dateFormat = new Date(dateTime);
    return dateFormat.toLocaleTimeString();
  } catch (error) {
    console.log(error);
  }
}

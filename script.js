// function momentGenerator() {
//   var h1Text = $("h1.text");
//   var mom = moment();
//   mom.month(7);
//   mom.date(15);
//   mom.year(2032)
//   // var myBirthday = mom.format("DD/MM/YYYY");
//   //l'iesimo giorno dell'anno
//   var day = mom.format("DDD")
//   var nom = mom.format("dddd")
//   var year = mom.format("YYYY")
//   h1Text.text(day + " " + nom + " " + year );
// }
//
//
// function init() {
//   var btn = $("#my-btn");
//   btn.click(momentGenerator);
// }
//
// $(document).ready(init)
function getMonthName(month) {
  var mom = moment();
  mom.month(month);
  var monthName = mom.format("MMMM");
  return monthName;
}

function printTitle(year, month) {
  var h1MonthName = $("#month-name");
  var monthName = getMonthName(month);
  var dayCount = monthDayCount(year, month);
  h1MonthName.text(monthName + ": 1 - " + dayCount);
}


function monthDayCount(year, month) {
  var mom = moment();
  mom.year(year)
  mom.month(month);
  var dayCount = mom.daysInMonth();
  return dayCount;
}

function getHumanDate(year, month, date) {
  var mom = moment();
  mom.year(year)
  mom.month(month);
  mom.date(date)
  var date = mom.format("DD-MM-YYYY")
  return date;
}

function machine(year, month, date) {
  var mom = moment();
  mom.year(year)
  mom.month(month);
  mom.date(date)
  var date = mom.format("YYYY-MM-DD")
  return date;
}

function printDays(year, month) {
  var dayCount = monthDayCount(year, month);
  var ulDayList = $("#lista");
  var template = $("#day-template").html();
  var compiled = Handlebars.compile(template);


  for (var day = 1; day <= dayCount; day++) {

    var template = {
      machineDate : machine(year, month, day),
      date : getHumanDate(year, month, day)
    }

    var liDay = compiled(template)
    ulDayList.append(liDay)

  }
}

function printHolidays(year, month) {

  var outData = {
    year : year,
    month : month
  }

  $.ajax({
    url : "https://flynn.boolean.careers/exercises/api/holidays",
    data : outData,
    method : "GET",
    success : function (inData, state) {
      if (inData.success == true) {
        var holidays = inData.response
        addHolidays(holidays)
        console.log(holidays);
      } else {
        console.log("errore");
      }
    },
    error : function (request, state, error) {
      console.log("request", data)
      console.log("state", state)
      console.log("error", error)
    }
  })
}


function addHolidays(holidays) {

  for (var i = 0; i < holidays.length; i++) {
    var holiday = holidays[i];
    var holiMachine = holiday.date;
    var holiName = holiday.name;
    var selector = "li[data-date= '"  + holiMachine +  "']"
    console.log(selector);
    var liHoli = $(selector)
    // liHoli.text(liHoli.text() + " - " + holiName)
    liHoli.addClass("holiday")
  }

}

function init() {
  var year = 2018;
  var month = 0;
  printTitle(year, month);
  printDays(year, month);
  printHolidays(year, month);
}

$(document).ready(init)

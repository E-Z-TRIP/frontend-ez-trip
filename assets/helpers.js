export function getMonthName(month){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const name = monthNames[month - 1];;
    return name;
  }

  export function convertDate(utc) {
    console.log(utc)
    let date = new Date(utc*1000);
    let dayLowerCase = date.toLocaleString("fr", {weekday:"long"})
    let day = dayLowerCase.charAt(0).toUpperCase() + dayLowerCase.slice(1);
    let nb = date.toLocaleString("en", {day: "numeric"})
     let month = date.toLocaleString("en", {month: "long"})
     return ({day, nb, month})
 
 //    let day = days.find((e, i) => i===date.getDay())
   }
 
   export function convertibleStartDate(iso) {
    const date = iso.substr(0, 10);
    return date
  }
  export function convertibleEndDate(iso) {
    const date = iso.substr(5, 5);
    return date
  }

  export function getnbDays(date1, date2) {
    let datest = new Date(date1)
    let dateen = new Date(date2)
    const Diff_temps  = dateen.getTime() - datest.getTime(); 
    var Diff_jours = Diff_temps / (1000 * 3600 * 24);
    console.log('dif', Diff_jours)
    return Math.round(Diff_jours)
  }

  export function getNbNights(number) {
    return number-1
  }
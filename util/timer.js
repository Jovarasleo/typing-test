import backdrop from "../component/backdrop";

let seconds = 60;
let timer;
const countToDate = new Date();
let previousTimeBetweenDates;

function Timer() {
  if (seconds > 0) {
    seconds--;
    document.querySelector(".card--timer").innerHTML = seconds;
  } else {
    clearInterval(timer);
    backdrop();
  }
}
function startTimer() {
  if (!timer) {
    timer = setInterval(function () {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil((currentDate - countToDate) / 1000);
      if (previousTimeBetweenDates !== timeBetweenDates) {
        Timer();
      }
      previousTimeBetweenDates = timeBetweenDates;
    }, 250);
  }
  return seconds;
}
document.querySelector(".card--timer").innerHTML = seconds;
export default startTimer;

var seconds = 59;
var timer;
function Timer() {
  if (seconds < 60) {
    // I want it to say 1:00, not 60
    document.querySelector(".timer").innerHTML = seconds;
  }
  if (seconds > 0) {
    // so it doesn't go to -1
    seconds--;
  } else {
    clearInterval(timer);
  }
}
document.querySelector(".input").addEventListener("keydown", () => {
  (function () {
    if (!timer) {
      document.querySelector(".timer").innerHTML = seconds;
      timer = window.setInterval(function () {
        Timer();
      }, 1000); // every second
    }
  })();
});

document.querySelector(".timer").innerHTML = "60";
export default Timer;

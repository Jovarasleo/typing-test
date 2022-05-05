import backdrop from "../component/backdrop";
const selectTimer = document.querySelector(".card--timer");

const defaultTime = 60;
let interval = defaultTime;

function timer(timeInterval) {
  let timeout;
  let expected;
  const start = () => {
    expected = Date.now() + timeInterval;
    timeout = setTimeout(round, timeInterval);
  };
  const stop = () => {
    if (interval < 1) {
      clearTimeout(timeout);
    }
  };
  const reset = () => {
    interval = defaultTime;
    selectTimer.textContent = defaultTime;
  };
  //method to adjust time drift
  const round = () => {
    if (interval > 0) {
      interval--;
    }
    selectTimer.textContent = interval;
    let drift = Date.now() - expected;
    expected += timeInterval;
    timeout = setTimeout(round, timeInterval - drift);
    if (interval === 0) {
      stop();
      backdrop();
    }
  };
  return {
    start,
    interval,
    reset,
  };
}
selectTimer.textContent = defaultTime;
export default timer;

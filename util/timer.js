const selectTimer = document.querySelector(".card--timer");
let interval;
export default function timer(defaultTime, backdrop) {
  let timeout;
  let expected;

  const start = () => {
    expected = Date.now() + 1000;
    timeout = setTimeout(round, 1000);
    interval = defaultTime;
  };
  const stop = () => {
    if (interval < 1) {
      clearTimeout(timeout);
    }
  };
  const round = () => {
    if (interval > 0) {
      interval--;
    }
    selectTimer.textContent = interval;
    let drift = Date.now() - expected;
    expected += 1000;
    timeout = setTimeout(round, 1000 - drift);
    if (interval === 0) {
      stop();
      backdrop();
    }
  };
  return {
    start,
    interval,
  };
}

import words from "../data/data";
export function randomArrayShuffle() {
  var currentIndex = words.length;
  let temporaryValue;
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = words[currentIndex];
    words[currentIndex] = words[randomIndex];
    words[randomIndex] = temporaryValue;
  }
  return words;
}
const shuffled = randomArrayShuffle();
export default shuffled;

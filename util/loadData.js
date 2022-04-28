import shuffled from "./shuffledArray";
function loadArray(selectDataArray, wordIndex) {
  shuffled.slice(0 + wordIndex, 20 + wordIndex).map((word) => {
    const element = document.createElement("span");
    element.classList = "word";
    element.textContent = word;
    selectDataArray.append(element);
  });
}
export default loadArray;
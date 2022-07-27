import createElement from "./createElement";
function loadArray(selectDataArray, wordIndex, shuffled) {
  shuffled.slice(0 + wordIndex, 20 + wordIndex).map((word) => {
    const wordEl = createElement("span", [{ class: "word" }], word);
    selectDataArray.append(wordEl);
  });
}
export default loadArray;

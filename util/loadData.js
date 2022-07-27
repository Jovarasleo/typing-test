import createElement from "./createElement";

export default function loadData(wordsContainer, wordIndex, shuffled) {
  shuffled.slice(0 + wordIndex, 20 + wordIndex).map((word) => {
    const wordEl = createElement("span", [{ class: "word" }], word);
    wordsContainer.append(wordEl);
  });
}

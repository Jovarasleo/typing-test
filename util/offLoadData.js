import "../style.css";
const input = document.querySelector(".input");
function addArrItem(writtenWordsArr, word, currentWord) {
  if (word.length) {
    const element = document.createElement("span");
    element.classList = "writtenWord";
    element.textContent = word;
    if (word !== currentWord) {
      element.classList.add("incorrect");
    }
    writtenWordsArr.insertBefore(element, input);
  }
}
export default addArrItem;

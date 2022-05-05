import "../style.css";
const input = document.querySelector(".input");
function addArrItem(writtenWordsArr, dataArray, writtenDataArray) {
  document.querySelectorAll(".writtenWord").forEach((el) => {
    el.remove();
  });
  writtenDataArray.forEach((item, index) => {
    const element = document.createElement("span");
    element.classList = "writtenWord";
    element.textContent = item;
    if (item !== dataArray[index]) {
      element.classList.add("incorrect");
    }

    writtenWordsArr.insertBefore(element, input);
  });
}
export default addArrItem;

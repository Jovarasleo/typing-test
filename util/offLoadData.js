import "../style.css";
import createElement from "./createElement";
const input = document.querySelector(".input");
function addArrItem(writtenWordsArr, dataArray, writtenDataArray) {
  document.querySelectorAll(".writtenWord").forEach((el) => {
    el.remove();
  });
  writtenDataArray.forEach((item, index) => {
    const element = createElement("span", [{ class: "writtenWord" }], item);
    if (item !== dataArray[index]) {
      element.classList.add("incorrect");
    }

    writtenWordsArr.insertBefore(element, input);
  });
}
export default addArrItem;

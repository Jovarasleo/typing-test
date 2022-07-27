import createElement from "./createElement";

const input = document.querySelector(".input");
export default function offloadData(
  writtenWordsContainer,
  dataArray,
  writtenDataArray
) {
  document.querySelectorAll(".writtenWord").forEach((el) => {
    el.remove();
  });
  writtenDataArray.forEach((item, index) => {
    const element = createElement("span", [{ class: "writtenWord" }], item);
    if (item !== dataArray[index]) {
      element.classList.add("incorrect");
    }
    writtenWordsContainer.insertBefore(element, input);
  });
}

import createElement from "./createElement";

function offloadData(
  writtenWordsContainer,
  dataArray,
  writtenDataArray,
  selectInput
) {
  document.querySelectorAll(".writtenWord").forEach((el) => {
    el.remove();
  });
  writtenDataArray.forEach((item, index) => {
    const element = createElement("span", [{ class: "writtenWord" }], item);
    if (item !== dataArray[index]) {
      element.classList.add("incorrect");
    }
    writtenWordsContainer.insertBefore(element, selectInput);
  });
}
export default offloadData;

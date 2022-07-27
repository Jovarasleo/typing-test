import createElement from "../../util/createElement";
import Turtle from "../../images/Turtle.png";
import Monkey from "../../images/Monkey.png";
import Squid from "../../images/Squid.png";
import "./index.css";

function backdrop(reset, wordsCounter, charCounter, accuracy) {
  const backdrop = createElement("div", [{ class: "backdrop" }]);
  const contentCard = createElement("div", [{ class: "backdrop__card" }]);
  const imageContainer = createElement("div", [{ class: "card--image" }]);
  const textContainer = createElement("div", [{ class: "card--text" }]);

  const paragraph = createElement("p", [{ class: "text--paragraph" }]);
  const title = createElement("h4", [{ class: "text--title" }]);
  const img = createElement("img", [{ class: "image--img" }]);

  if (wordsCounter < 20) {
    img.src = Turtle;
    title.textContent = "You are a Turtle!";
  }
  if (wordsCounter >= 20 && wordsCounter < 40) {
    img.src = Monkey;
    title.textContent = "You are a Monkey!";
  }
  if (wordsCounter >= 40) {
    img.src = Squid;
    title.textContent = "You are a Squid!";
  }

  paragraph.textContent = `You type with the speed of ${wordsCounter} WPM (${charCounter} CPM). Your accuracy was ${accuracy}%. Congratulations!`;

  textContainer.append(title, paragraph);
  imageContainer.append(img);
  contentCard.append(imageContainer, textContainer);
  backdrop.append(contentCard);
  document.body.append(backdrop);

  contentCard.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  backdrop.addEventListener("click", () => {
    reset();
    backdrop.remove();
  });
}
export default backdrop;

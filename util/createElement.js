function createElement(el, attributes, textContent) {
  const element = document.createElement(el);
  if (attributes) {
    attributes.forEach((att) => {
      element.setAttribute(Object.keys(att)[0], Object.values(att)[0]);
    });
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}
export default createElement;

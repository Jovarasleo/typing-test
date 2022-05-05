function createElement(el, attributes) {
  const element = document.createElement(el);
  if (attributes) {
    attributes.forEach((att) => {
      element.setAttribute(Object.keys(att)[0], Object.values(att)[0]);
    });
  }
  return element;
}
export default createElement;

import "./index.css";
function backdrop() {
  const backdrop = document.createElement("div");
  backdrop.classList = "backdrop";
  document.body.append(backdrop);
  backdrop.addEventListener("click", () => {
    backdrop.remove();
  });
}
export default backdrop;

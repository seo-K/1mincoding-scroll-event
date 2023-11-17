let stepElement = document.querySelectorAll(".step");
let graphicElement = document.querySelectorAll(".graphic-item");
let currentItem = graphicElement[0];

for (let i = 0; i < stepElement.length; i++) {
  // stepElement[i].setAttribute("data-index", i);
  stepElement[i].dataset.index = i;
  graphicElement[i].dataset.index = i;
}

function activate() {
  currentItem.classList.add("active");
}
function inactivate() {
  currentItem.classList.remove("active");
}

window.addEventListener("scroll", () => {
  let step;
  let boundingRect;
  for (let i = 0; i < stepElement.length; i++) {
    step = stepElement[i];
    boundingRect = step.getBoundingClientRect();
    if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
      inactivate();
      currentItem = graphicElement[step.dataset.index];
      activate();
    }
  }
  activate();
});

const actions = {
  birdFlies(key) {
    if (key) {
      document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
    } else {
      document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
    }
  },
  birdFlies2(key) {
    if (key) {
      document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
    } else {
      document.querySelector('[data-index="5"] .bird').style.transform = `translate(-100%, 100%)`;
    }
  },
};

const stepElement = document.querySelectorAll(".step");
const graphicElement = document.querySelectorAll(".graphic-item");
let currentItem = graphicElement[0];
let ioIndex;

const io = new IntersectionObserver((entries, observer) => {
  // observer 가 관찰하도록 등록해줘야함.
  ioIndex = +entries[0].target.dataset.index;
});
for (let i = 0; i < stepElement.length; i++) {
  io.observe(stepElement[i]);
  stepElement[i].dataset.index = i;
  graphicElement[i].dataset.index = i;
}

function activate(action) {
  currentItem.classList.add("active");
  if (action) {
    actions[action](true);
  }
}
function inactivate(action) {
  currentItem.classList.remove("active");
  if (action) {
    actions[action](false);
  }
}

window.addEventListener("scroll", () => {
  let step;
  let boundingRect;

  for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
    step = stepElement[i];
    if (!step) continue;
    boundingRect = step.getBoundingClientRect();

    // temp++;
    if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
      inactivate(currentItem.dataset.action);
      currentItem = graphicElement[step.dataset.index];
      activate(currentItem.dataset.action);
    }
  }

  window.addEventListener("load", () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });

  activate();
});

// 내 작업 IntersectionObserver
// const options = {
//   //옵션 정의
//   threshold: 0.9, //보기에 있는 요소의 50%
// };

// const inViewCallback = (entries) => {
//   let currentIndex = 0;
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("active");
//       currentIndex = [...stepElement].indexOf(entry.target);

//       console.log([...stepElement].indexOf(entry.target));
//       graphicElement.forEach((item) => item.classList.remove("active"));
//       const ele = [...graphicElement][currentIndex];
//       ele.classList.add("active");
//     } else {
//       entry.target.classList.remove("active");
//     }
//   });
// };
// let observer = new IntersectionObserver(inViewCallback, options);

// stepElement.forEach((element) => {
//   let dataDelay = element.getAttribute("data-delay");

//   element.style.transitionDelay = "2ms";
//   // element.style.transitionDelay = dataDelay + "ms";
//   observer.observe(element); // 옵저버 실행
// });

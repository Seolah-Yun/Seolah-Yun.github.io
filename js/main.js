//floatingButton 작동함수

function handleFloatingButton() {
  const $floatingButton = document.getElementById("floating-button");
  $floatingButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

handleFloatingButton();

//스크롤 효과
const scrollReveal = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
});

scrollReveal.reveal(".home__content, .thk, .horizontal-data, .project__title");
scrollReveal.reveal(".home__img, .project__data", { delay: 400 });

//가로스크롤

const horizontal = document.querySelector(".horizontal-data");

let isHorizontalVisible = false; //섹션 보이는지 여부 저장

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      //화면 일정 이상 보이면 true
      isHorizontalVisible = entry.isIntersecting;
    });
  },
  {
    threshold: 0.8,
  }
);

observer.observe(horizontal); //특정요소 감시

window.addEventListener(
  "wheel",
  (e) => {
    if (!isHorizontalVisible) return;

    const el = horizontal;
    const max = el.scrollWidth - el.clientWidth;
    const pos = el.scrollLeft;

    // 오차 허용 (스크롤 끝에서 5px까지는 끝으로 판단)
    const atEnd = pos >= max - 5;
    const atStart = pos <= 5;

    //가로스크롤 가능하면 세로 잠금
    if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 0.5;
      return;
    }

    // 오른쪽 끝에서 아래로 스크롤 → 세로로 넘기기
    if (atEnd && e.deltaY > 0) {
      return;
    }

    // 왼쪽 끝에서 위로 스크롤 → 세로로 넘기기
    if (atStart && e.deltaY < 0) {
      return;
    }
  },
  { passive: false }
);

//가로스크롤 왼쪽 섹션
const leftText = document.querySelectorAll(".about__left");
const items = document.querySelectorAll(".container__data");

horizontal.addEventListener("scroll", () => {
  const scrollLeft = horizontal.scrollLeft;
  const itemWidth = items[0].offsetWidth;
  const index = Math.round(scrollLeft / itemWidth); //몇번재 아이템 화면중심인지

  leftText.forEach((item, i) => {
    if (i === index) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  if (index >= 1) {
    leftText[0].style.opacity = "0.05"; //두번째 아이템 오면 첫번째 조정
  } else {
    leftText[0].style.opacity = "1";
  }
});

//toggle menu
function toggleMenu() {
  const $navMenu = document.getElementById("nav__menu");
  $navMenu.classList.toggle("show");
}

function init() {
  const $navToggle = document.getElementById("nav-toggle");
  $navToggle.addEventListener("click", () => {
    //menu toggle
    toggleMenu();
  });

  const $navLinkList = document.querySelectorAll(".nav__link");
  $navLinkList.forEach((el) => el.addEventListener("click", toggleMenu));
}

init();

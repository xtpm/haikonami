const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const applyForm = document.querySelector(".apply-form");

if (applyForm) {
  applyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = applyForm.querySelector("button");

    if (button) {
      const originalLabel = button.textContent;
      button.textContent = "Request logged";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalLabel;
        button.disabled = false;
      }, 2400);
    }
  });
}

const marquee = document.querySelector("[data-marquee]");

if (marquee) {
  const originalContent = marquee.innerHTML;
  marquee.innerHTML += originalContent;

  let offset = 0;
  let lastTime = 0;
  const speed = 0.035;
  let resetWidth = 0;

  const measure = () => {
    resetWidth = marquee.scrollWidth / 2;
    offset = -resetWidth;
    marquee.style.transform = `translateX(${offset}px)`;
  };

  measure();
  window.addEventListener("resize", measure);

  const step = (time) => {
    if (!lastTime) {
      lastTime = time;
    }

    const delta = time - lastTime;
    lastTime = time;
    offset += delta * speed;

    if (offset >= 0) {
      offset = -resetWidth;
    }

    marquee.style.transform = `translateX(${offset}px)`;
    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
}

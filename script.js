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

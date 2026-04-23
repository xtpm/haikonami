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

const rotator = document.querySelector("[data-rotator]");

if (rotator) {
  const images = Array.from(rotator.querySelectorAll(".about-rotator-image"));
  const interval = Number(rotator.dataset.interval || 3600);

  if (images.length > 1) {
    let activeIndex = images.findIndex((image) =>
      image.classList.contains("is-active")
    );

    if (activeIndex === -1) {
      activeIndex = 0;
      images[0].classList.add("is-active");
    }

    window.setInterval(() => {
      images[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % images.length;
      images[activeIndex].classList.add("is-active");
    }, interval);
  }
}

const particleCanvas = document.querySelector(".mouse-particles");

if (particleCanvas) {
  const ctx = particleCanvas.getContext("2d");

  if (ctx) {
    const particles = [];
    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      active: false,
      radius: 170,
    };

    let width = 0;
    let height = 0;
    let deviceScale = 1;
    let particleCount = 0;

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      vx: 0,
      vy: 0,
      size: Math.random() * 1.35 + 0.65,
      alpha: Math.random() * 0.45 + 0.18,
      tint: Math.random() > 0.82 ? "red" : "white",
    });

    const seedParticles = () => {
      particles.length = 0;

      for (let i = 0; i < particleCount; i += 1) {
        particles.push(createParticle());
      }
    };

    const resizeCanvas = () => {
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      particleCount = width < 700 ? 36 : width < 1100 ? 54 : 74;

      particleCanvas.width = Math.floor(width * deviceScale);
      particleCanvas.height = Math.floor(height * deviceScale);
      particleCanvas.style.width = `${width}px`;
      particleCanvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(deviceScale, deviceScale);
      seedParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);

        if (pointer.active && distance < pointer.radius) {
          const force = (pointer.radius - distance) / pointer.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.09;
          particle.vy -= Math.sin(angle) * force * 0.09;
        }

        particle.vx += (particle.baseX - particle.x) * 0.0009;
        particle.vy += (particle.baseY - particle.y) * 0.0009;
        particle.vx *= 0.955;
        particle.vy *= 0.955;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.beginPath();
        ctx.fillStyle =
          particle.tint === "red"
            ? `rgba(212, 55, 66, ${particle.alpha})`
            : `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      window.requestAnimationFrame(draw);
    };

    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    });

    window.addEventListener("pointerleave", () => {
      pointer.active = false;
    });

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    window.requestAnimationFrame(draw);
  }
}

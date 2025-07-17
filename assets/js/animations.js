// Animate elements when they come into view
document.addEventListener("DOMContentLoaded", function () {
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".glass-card, .section-title, .section-subtitle"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll(
    ".glass-card, .section-title, .section-subtitle"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Run on load and scroll
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);

  // Animate stats counter
  function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number");

    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(counter);
          current = target;
        }
        stat.textContent = Math.floor(current);
      }, 16);
    });
  }

  // Trigger when section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stats-section").forEach((section) => {
    observer.observe(section);
  });
});

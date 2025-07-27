// Portfolio Filter and Animations
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioGrid = document.querySelector(".portfolio-grid"); // Get the grid container
  let portfolioItems = document.querySelectorAll(".portfolio-item"); // Get all items initially

  // Function to apply animation classes
  function animateProjects(items) {
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.05}s`; // Stagger animation
      item.classList.add("show"); // Trigger the animation
    });
  }

  // Initial animation on page load
  animateProjects(portfolioItems);

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Hide all items first without animation
      portfolioItems.forEach((item) => {
        item.classList.remove("show"); // Hide for re-animation
        item.style.display = "none";
      });

      // Use a small delay to ensure elements are hidden before showing new ones
      setTimeout(() => {
        let visibleItems = [];
        portfolioItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
            visibleItems.push(item);
          }
        });
        // Re-apply animation to visible items
        animateProjects(visibleItems);
      }, 50); // Small delay to allow display: none to take effect
    });
  });
});
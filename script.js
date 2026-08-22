document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("episodes-container");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const sortSelect = document.getElementById("sort-select");

  if (!container || !loadMoreBtn || !sortSelect) return;

  // Store original list items
  const episodes = Array.from(container.querySelectorAll(".index-entry"));
  const ITEMS_PER_PAGE = 6; // Number of episodes to reveal per click
  let visibleCount = ITEMS_PER_PAGE;

  function renderEpisodes() {
    const isOldestFirst = sortSelect.value === "oldest";
    
    // Sort array copies based on selected order
    const sortedEpisodes = [...episodes];
    if (isOldestFirst) {
      sortedEpisodes.reverse();
    }

    // Hide all, then show up to visibleCount
    container.innerHTML = "";
    sortedEpisodes.forEach((ep, index) => {
      if (index < visibleCount) {
        ep.style.display = "";
        container.appendChild(ep);
      }
    });

    // Toggle button visibility
    if (visibleCount >= episodes.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
    }
  }

  // Load More Click Event
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += ITEMS_PER_PAGE;
    renderEpisodes();
  });

  // Sort Change Event
  sortSelect.addEventListener("change", () => {
    visibleCount = ITEMS_PER_PAGE; // Reset visible limit on sort change
    renderEpisodes();
  });

  // Initial display setup
  renderEpisodes();
});
// Gentle scroll-reveal for sections and archive entries.
// Everything works fine without this — it's just polish.

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.section, .index-entry');
  targets.forEach(el => el.classList.add('reveal'));

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
});

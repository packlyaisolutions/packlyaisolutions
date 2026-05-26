const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const heroMap = document.querySelector("[data-parallax-map]");
const parallaxItems = heroMap?.querySelectorAll("[data-depth]");

if (heroMap && parallaxItems?.length && window.matchMedia("(pointer:fine)").matches) {
  const resetLayers = () => {
    parallaxItems.forEach((item) => {
      item.style.transform = "";
    });
  };

  heroMap.addEventListener("pointermove", (event) => {
    const rect = heroMap.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    parallaxItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 0);
      const moveX = x * depth * 32;
      const moveY = y * depth * 26;
      item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });

  heroMap.addEventListener("pointerleave", resetLayers);
}

const timeline = document.querySelector("[data-timeline]");
const progressLine = document.querySelector(".timeline__progress");

const updateTimelineProgress = () => {
  if (!timeline || !progressLine || window.innerWidth <= 980) {
    return;
  }

  const rect = timeline.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const distance = rect.height - viewportHeight * 0.45;

  if (distance <= 0) {
    progressLine.style.transform = "translateX(-50%) scaleY(1)";
    return;
  }

  const covered = Math.min(Math.max(viewportHeight * 0.55 - rect.top, 0), distance);
  const progress = Math.max(0.12, covered / distance);
  progressLine.style.transform = `translateX(-50%) scaleY(${progress})`;
};

updateTimelineProgress();
window.addEventListener("scroll", updateTimelineProgress, { passive: true });
window.addEventListener("resize", updateTimelineProgress);

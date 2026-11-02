// Elements
const topNav = document.getElementById('topNav');
const heroContent = document.getElementById('heroContent');
const contentSections = document.querySelectorAll('.content-section');

// Handle Scroll Dynamics:
// 1. Docks heading into the top margin/nav as you scroll down
// 2. Shrinks & fades central hero
// 3. Smoothly reveals content sections via IntersectionObserver
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const threshold = 180;

  // Dock heading to top margin bar
  if (scrollY > threshold) {
    topNav.classList.add('visible');
  } else {
    topNav.classList.remove('visible');
  }

  // Parallax fade hero heading slightly as user scrolls down
  if (heroContent) {
    const fadeRatio = Math.max(0, 1 - scrollY / 420);
    const translateVal = Math.min(60, scrollY * 0.25);
    heroContent.style.opacity = fadeRatio.toString();
    heroContent.style.transform = `translateY(-${translateVal}px)`;
  }
});

// Reveal rest of sections as they enter viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  }
);

contentSections.forEach((sec) => observer.observe(sec));

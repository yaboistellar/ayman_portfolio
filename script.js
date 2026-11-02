// Elements
const visualCore = document.getElementById('visualCore');
const slotLeft = document.querySelector('.slot-left');
const slotRight = document.querySelector('.slot-right');
const heroFooterBar = document.getElementById('heroFooterBar');
const scrollTrack = document.getElementById('scrollTrack');
const navbar = document.getElementById('navbar');

// Smooth continuous calculation based on scroll progress through the scroll track
function handleScrollAnimation() {
  const scrollY = window.scrollY;
  const trackHeight = scrollTrack.offsetHeight - window.innerHeight;
  
  // Progress ratio from 0 to 1 through the hero transition track
  const rawProgress = scrollY / Math.max(trackHeight, 1);
  const progress = Math.min(Math.max(rawProgress, 0), 1);

  // 1. Text Split Separation Animation:
  // As user scrolls down, "MORSHEDUL" glides outward left and "HASAN" outward right
  const textTranslateX = progress * 260; // 0px to 260px outward
  const textOpacity = Math.max(0, 1 - progress * 1.6); // Fades gently
  const textScale = 1 - progress * 0.12; // Subtle scale down

  if (slotLeft) {
    slotLeft.style.transform = `translateX(-${textTranslateX}px) scale(${textScale})`;
    slotLeft.style.opacity = textOpacity.toString();
  }

  if (slotRight) {
    slotRight.style.transform = `translateX(${textTranslateX}px) scale(${textScale})`;
    slotRight.style.opacity = textOpacity.toString();
  }

  // 2. Center 3D Visual Core Animation:
  // Starts centered between the words, then expands and blooms as the text splits,
  // before smoothly receding into the content below
  if (visualCore) {
    const coreScale = 1 + progress * 0.85; // Expands to 1.85x
    const coreOpacity = Math.max(0, 1 - progress * 1.25);
    const coreRotation = progress * 45; // Degrees
    visualCore.style.transform = `translate(-50%, -50%) scale(${coreScale}) rotate(${coreRotation}deg)`;
    visualCore.style.opacity = coreOpacity.toString();
  }

  // 3. Footer Bar & Scroll indicator fade
  if (heroFooterBar) {
    const footerOpacity = Math.max(0, 1 - progress * 3.5);
    heroFooterBar.style.opacity = footerOpacity.toString();
    heroFooterBar.style.transform = `translateY(${progress * 40}px)`;
  }

  // 4. Navbar styling tweak when deep in content
  if (navbar) {
    if (scrollY > 120) {
      navbar.style.background = 'rgba(0, 0, 0, 0.85)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.6)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  }

  requestAnimationFrame(handleScrollAnimation);
}

// Start smooth animation loop
window.addEventListener('scroll', () => {
  // Driven smoothly via requestAnimationFrame
}, { passive: true });

requestAnimationFrame(handleScrollAnimation);

// Interactive mouse parallax on the 3D visual orb when idle at the top
window.addEventListener('mousemove', (e) => {
  if (window.scrollY < 200 && visualCore) {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    visualCore.style.marginLeft = `${x}px`;
    visualCore.style.marginTop = `${y}px`;
  }
});

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

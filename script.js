// ========================================================
// 1. PROCEDURAL ORGANIC 3D CHROME FLOWER / LIQUID SPIRE CANVAS
// Recreating the exact spiky reflective chrome organism in the center
// ========================================================
const canvas = document.getElementById('organicCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;
const centerX = W / 2;
const centerY = H / 2;

let angleOffset = 0;
let mouseX = 0;
let mouseY = 0;

function drawOrganicChromeOrganism(scrollProgress) {
  ctx.clearRect(0, 0, W, H);

  // Dynamic growth & deformation based on time and scroll
  angleOffset += 0.012;
  const numPetals = 16;
  const baseRadius = 140 * (1 + scrollProgress * 0.7);

  ctx.save();
  ctx.translate(centerX + mouseX * 20, centerY + mouseY * 20);
  ctx.rotate(angleOffset * 0.4 + scrollProgress * 1.5);

  // Layer 1: Deep Metallic Core Reflections
  for (let layer = 0; layer < 4; layer++) {
    ctx.beginPath();
    const layerScale = 1 - layer * 0.18;
    const currentRadius = baseRadius * layerScale;

    for (let i = 0; i <= 360; i += 2) {
      const rad = (i * Math.PI) / 180;
      // High-frequency harmonic formula creating the spiky liquid tentacles
      const spike = Math.sin(rad * numPetals + angleOffset * 2) * 55 * layerScale;
      const ripple = Math.cos(rad * 8 - angleOffset * 3) * 25 * layerScale;
      const r = currentRadius + spike + ripple;

      const x = Math.cos(rad) * r;
      const y = Math.sin(rad) * r;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Chrome Gradient: Deep blacks, crystalline purples, and sharp white highlights
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, currentRadius + 70);
    if (layer === 0) {
      grad.addColorStop(0, '#e879f9');
      grad.addColorStop(0.35, '#7e22ce');
      grad.addColorStop(0.65, '#0f051d');
      grad.addColorStop(0.85, '#ffffff'); // Chrome rim highlight
      grad.addColorStop(1, '#05020a');
    } else if (layer === 1) {
      grad.addColorStop(0, '#c084fc');
      grad.addColorStop(0.4, '#3b0764');
      grad.addColorStop(0.8, '#a855f7');
      grad.addColorStop(1, '#000000');
    } else {
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.5, '#581c87');
      grad.addColorStop(1, '#050508');
    }

    ctx.fillStyle = grad;
    ctx.shadowColor = layer === 0 ? 'rgba(168, 85, 247, 0.7)' : 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = layer === 0 ? 35 : 15;
    ctx.fill();

    ctx.strokeStyle = layer === 0 ? 'rgba(255, 255, 255, 0.65)' : 'rgba(192, 132, 252, 0.3)';
    ctx.lineWidth = layer === 0 ? 1.5 : 1;
    ctx.stroke();
  }

  // Draw intricate chrome spore filaments radiating outward
  ctx.strokeStyle = 'rgba(216, 180, 254, 0.4)';
  ctx.lineWidth = 1;
  for (let k = 0; k < numPetals; k++) {
    const kAngle = (k * 2 * Math.PI) / numPetals + angleOffset;
    const len = baseRadius * 1.35;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(
      Math.cos(kAngle + 0.3) * (len * 0.6),
      Math.sin(kAngle + 0.3) * (len * 0.6),
      Math.cos(kAngle) * len,
      Math.sin(kAngle) * len
    );
    ctx.stroke();
  }

  ctx.restore();
}

// ========================================================
// 2. SCROLL-DRIVEN TIMELINE (EXACT BEHAVIOR FROM THE VIDEO)
// Monumental words split outward to the edges while the organism blooms
// ========================================================
const scrollTrack = document.getElementById('scrollTrack');
const blockLeft = document.getElementById('blockLeft');
const blockRight = document.getElementById('blockRight');
const sculptureWrapper = document.getElementById('sculptureWrapper');
const scrollWidget = document.getElementById('scrollWidget');
const cornerElements = document.querySelectorAll('.hero-corner');

let currentScrollY = 0;

function updateExperience() {
  const scrollY = window.scrollY;
  const trackHeight = scrollTrack.offsetHeight - window.innerHeight;
  const progress = Math.min(Math.max(scrollY / Math.max(trackHeight, 1), 0), 1);

  // 1. Split Text Motion:
  // "MORSHEDUL" glides outward left and "HASAN" outward right
  const textX = progress * 320; // 0 to 320px
  const textScale = 1 - progress * 0.15;
  const textOpacity = Math.max(0, 1 - progress * 1.5);

  if (blockLeft) {
    blockLeft.style.transform = `translateX(-${textX}px) scale(${textScale})`;
    blockLeft.style.opacity = textOpacity.toString();
  }

  if (blockRight) {
    blockRight.style.transform = `translateX(${textX}px) scale(${textScale})`;
    blockRight.style.opacity = textOpacity.toString();
  }

  // 2. Sculpture Scaling & Rotation on Scroll:
  if (sculptureWrapper) {
    const scScale = 1 + progress * 0.7;
    const scOpacity = Math.max(0, 1 - progress * 1.3);
    sculptureWrapper.style.transform = `translate(-50%, -50%) scale(${scScale})`;
    sculptureWrapper.style.opacity = scOpacity.toString();
  }

  // 3. Corner Labels and Scroll Widget Fade out early:
  const cornerOpacity = Math.max(0, 1 - progress * 2.8);
  cornerElements.forEach((el) => {
    el.style.opacity = cornerOpacity.toString();
  });

  if (scrollWidget) {
    scrollWidget.style.opacity = cornerOpacity.toString();
  }

  // Draw procedural canvas frame
  drawOrganicChromeOrganism(progress);

  requestAnimationFrame(updateExperience);
}

// Interactive Parallax
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5);
  mouseY = (e.clientY / window.innerHeight - 0.5);
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

// Run loop
requestAnimationFrame(updateExperience);

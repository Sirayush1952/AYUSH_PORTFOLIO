/**
 * AYUSH DAYAL — PORTFOLIO INTERACTIONS
 * Features:
 * 1. Fluctuating Background Skills Typography with Natural Word Spacing
 * 2. Floating Navigation Active State & Intersection Observer
 * 3. Animated Metrics Counters (3+, 30+, 100%)
 * 4. Smooth Scrolling & Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCounters();
  initSmoothScroll();
  initFluctuatingSkills();
  initAchievements();
  initVantaBirds();
  initRibbonCanvas();
});

/* =========================================================
   1. FLUCTUATING BACKGROUND SKILLS TYPOGRAPHY
   ========================================================= */
function initFluctuatingSkills() {
  const skillPhrase = document.getElementById('skillPhrase');
  if (!skillPhrase) return;

  const skillsList = [
    'UI/UX DESIGNER',
    'FULLSTACK DEVELOPER',
    'WEB DESIGNER',
    'ANIMATION SPECIALIST',
    'CREATIVE CODER',
    'FRONTEND ENGINEER'
  ];

  let currentIndex = 0;

  setInterval(() => {
    // 1. Fade & morph out
    skillPhrase.classList.add('morph-out');
    skillPhrase.classList.remove('morph-in');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % skillsList.length;
      skillPhrase.textContent = skillsList[currentIndex];

      // 2. Fade & morph in
      skillPhrase.classList.remove('morph-out');
      skillPhrase.classList.add('morph-in');
    }, 350);
  }, 2800);
}


/* =========================================================
   2. FLOATING NAVIGATION ACTIVE STATE & SCROLL OBSERVER
   ========================================================= */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navItems.forEach((item) => {
          if (item.getAttribute('data-section') === activeId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navItems.forEach((n) => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
}


/* =========================================================
   3. ANIMATED METRICS COUNTERS
   ========================================================= */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 1600;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSidebar = document.querySelector('.metrics-sidebar');
  if (metricsSidebar) {
    counterObserver.observe(metricsSidebar);
  }
}


/* =========================================================
   4. SMOOTH SCROLLING
   ========================================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}


/* =========================================================
   5. EMAIL COPY & TOAST NOTIFICATION
   ========================================================= */
function copyEmail() {
  const email = 'ayushdayal.dev@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('Email copied to clipboard! 🚀');
    const copyText = document.getElementById('copyText');
    if (copyText) {
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = 'Copy Email';
      }, 2500);
    }
  }).catch(() => {
    showToast('Email: ' + email);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}


/* =========================================================
   6. ACHIEVEMENTS ENTRANCE ANIMATIONS
   ========================================================= */
function initAchievements() {
  const cards = document.querySelectorAll('.achievement-card');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    cards.forEach((card) => card.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 120}ms`;
    observer.observe(card);
  });
}


/* =========================================================
   7. VANTA.JS BIRDS ANIMATION (ABOUT & PROJECTS SECTIONS)
   ========================================================= */
function initVantaBirds() {
  if (typeof VANTA === 'undefined' || !VANTA.BIRDS) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const aboutBg = document.getElementById('vanta-birds-bg');
  if (aboutBg) {
    try {
      VANTA.BIRDS({
        el: "#vanta-birds-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xffffff,
        color1: 0xff4820,
        color2: 0x222226,
        birdSize: 1.20,
        wingSpan: 24.00,
        speedLimit: 4.00,
        separation: 35.00,
        alignment: 30.00,
        cohesion: 30.00,
        quantity: 3.50
      });
    } catch (err) {
      console.warn("Vanta.js Birds on About failed:", err);
    }
  }
}


/* =========================================================
   8. FALLING RIBBONS / CONFETTI ANIMATION (ACHIEVEMENTS SECTION)
   ========================================================= */
function initRibbonCanvas() {
  const canvas = document.getElementById('ribbon-canvas');
  if (!canvas) return;

  const section = canvas.closest('.achievements-section');
  if (!section) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let isVisible = true;

  // Ribbon color palette matching site design tokens
  const colors = [
    '#FF4820', // Flame accent
    '#FF6B4A', // Light coral
    '#7C3AED', // Vivid purple
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EC4899', // Pink
    '#06B6D4'  // Cyan
  ];

  const RIBBON_COUNT = 45;
  const ribbons = [];

  function createRibbon(initialY = false) {
    const len = 14 + Math.random() * 14;
    const w = 4 + Math.random() * 3.5;
    return {
      x: Math.random() * width,
      y: initialY ? Math.random() * height : -len - Math.random() * 30,
      len: len,
      w: w,
      speedY: 0.9 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.03,
      twist: Math.random() * Math.PI * 2,
      twistSpeed: 0.04 + Math.random() * 0.04,
      oscillation: Math.random() * Math.PI * 2,
      oscSpeed: 0.02 + Math.random() * 0.02,
      oscAmplitude: 0.8 + Math.random() * 0.8,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  function resize() {
    width = canvas.width = section.clientWidth;
    height = canvas.height = section.clientHeight;
  }

  function initRibbons() {
    ribbons.length = 0;
    for (let i = 0; i < RIBBON_COUNT; i++) {
      ribbons.push(createRibbon(true));
    }
  }

  function update() {
    for (let i = 0; i < ribbons.length; i++) {
      const r = ribbons[i];
      r.y += r.speedY;
      r.oscillation += r.oscSpeed;
      r.x += Math.sin(r.oscillation) * r.oscAmplitude + r.speedX;
      r.angle += r.angleSpeed;
      r.twist += r.twistSpeed;

      // Wrap horizontally if drifting out of bounds
      if (r.x < -20) r.x = width + 20;
      if (r.x > width + 20) r.x = -20;

      // Reset when falling past section bottom
      if (r.y - r.len > height) {
        ribbons[i] = createRibbon(false);
      }
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < ribbons.length; i++) {
      const r = ribbons[i];
      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.angle);

      // Simulate 3D twist ribbon flipping
      const flip = Math.cos(r.twist);
      ctx.scale(flip, 1);

      // Subtle metallic shimmer / opacity variation on twist
      ctx.globalAlpha = 0.55 + 0.4 * Math.abs(flip);
      ctx.fillStyle = r.color;

      ctx.beginPath();
      ctx.rect(-r.w / 2, -r.len / 2, r.w, r.len);
      ctx.fill();

      ctx.restore();
    }
  }

  function loop() {
    if (isVisible) {
      update();
      render();
    }
    animationFrameId = requestAnimationFrame(loop);
  }

  // Setup initial dimensions & ribbons
  resize();
  initRibbons();

  // Resize listener
  window.addEventListener('resize', () => {
    resize();
  });

  // IntersectionObserver to pause loop when section is offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(section);
  }

  // Start animation loop
  animationFrameId = requestAnimationFrame(loop);
}




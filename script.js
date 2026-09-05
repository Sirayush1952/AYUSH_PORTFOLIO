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

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
  initProjects3DCanvas();
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
   8. 3D ABSTRACT GEOMETRIC BACKGROUND (PROJECTS SECTION)
   ========================================================= */
function initProjects3DCanvas() {
  const canvas = document.getElementById('projects-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const section = canvas.closest('.projects-section');
  if (!section) return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xF8F9FA, 26, 52);

  let width = section.clientWidth;
  let height = section.clientHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 32);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);

  // Group to hold all geometric elements
  const sceneGroup = new THREE.Group();
  scene.add(sceneGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.78);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
  dirLight.position.set(16, 26, 20);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 5;
  dirLight.shadow.camera.far = 70;
  dirLight.shadow.bias = -0.0005;
  dirLight.shadow.radius = 3.5;
  scene.add(dirLight);

  // Soft warm pastel accent light (bottom-left)
  const warmLight = new THREE.PointLight(0xffa7b8, 0.65, 55);
  warmLight.position.set(-18, -12, 14);
  scene.add(warmLight);

  // Soft cool sky blue/teal accent light (top-right)
  const coolLight = new THREE.PointLight(0x38bdf8, 0.65, 55);
  coolLight.position.set(18, 14, 14);
  scene.add(coolLight);

  // Soft shadow-receiving backplane (at z = -12)
  const shadowPlaneGeo = new THREE.PlaneGeometry(160, 160);
  const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.065 });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.position.set(0, 0, -12);
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // -------------------------------------------------------------
  // Texture Generators
  // -------------------------------------------------------------
  // 1. Multi-colored horizontal banded texture for diamond crystals
  function createBandedTexture() {
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 64;
    texCanvas.height = 256;
    const ctx = texCanvas.getContext('2d');

    const bands = [
      { color: '#18181B', height: 0.28 }, // Stark black top
      { color: '#64748B', height: 0.22 }, // Cool slate grey
      { color: '#F472B6', height: 0.24 }, // Pastel pink
      { color: '#EF4444', height: 0.26 }  // Vibrant red bottom
    ];

    let currentY = 0;
    bands.forEach(b => {
      const h = b.height * texCanvas.height;
      ctx.fillStyle = b.color;
      ctx.fillRect(0, currentY, texCanvas.width, h);
      currentY += h;
    });

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.magFilter = THREE.NearestFilter;
    return texture;
  }

  // 2. Glowing Teal-to-Blue vertical gradient texture for spheres
  function createGradientSphereTexture() {
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 256;
    texCanvas.height = 256;
    const ctx = texCanvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#2DD4BF');   // Teal top
    grad.addColorStop(0.48, '#38BDF8'); // Sky blue middle
    grad.addColorStop(1, '#6366F1');   // Indigo blue bottom
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    return new THREE.CanvasTexture(texCanvas);
  }

  const bandedTex = createBandedTexture();
  const sphereGradTex = createGradientSphereTexture();

  // -------------------------------------------------------------
  // Geometry Construction & Placement
  // -------------------------------------------------------------
  const floatingObjects = [];

  function registerFloatingObject(mesh, config) {
    mesh.position.set(config.x, config.y, config.z);
    mesh.rotation.set(config.rotX || 0, config.rotY || 0, config.rotZ || 0);

    mesh.userData = {
      baseX: config.x,
      baseY: config.y,
      baseZ: config.z,
      ampY: config.ampY || (0.5 + Math.random() * 0.7),
      ampX: config.ampX || (0.2 + Math.random() * 0.4),
      floatSpeedY: config.floatSpeedY || (0.8 + Math.random() * 0.6),
      floatSpeedX: config.floatSpeedX || (0.4 + Math.random() * 0.4),
      phase: Math.random() * Math.PI * 2,
      spinX: config.spinX || (Math.random() - 0.5) * 0.008,
      spinY: config.spinY || (Math.random() - 0.5) * 0.012,
      spinZ: config.spinZ || (Math.random() - 0.5) * 0.006
    };

    sceneGroup.add(mesh);
    floatingObjects.push(mesh);
    return mesh;
  }

  // A. Pointed, faceted 3D diamond/octahedron crystals
  const diamondMat = new THREE.MeshStandardMaterial({
    map: bandedTex,
    flatShading: true,
    roughness: 0.28,
    metalness: 0.12
  });

  // Diamond 1 (Primary left)
  const d1 = new THREE.Mesh(new THREE.OctahedronGeometry(2.6, 0), diamondMat);
  d1.scale.set(1, 1.45, 1);
  d1.castShadow = true;
  d1.receiveShadow = true;
  registerFloatingObject(d1, { x: -14, y: 7, z: 2, rotZ: 0.2, spinY: 0.009 });

  // Diamond 2 (Secondary lower right)
  const d2 = new THREE.Mesh(new THREE.OctahedronGeometry(1.9, 0), diamondMat);
  d2.scale.set(1, 1.4, 1);
  d2.castShadow = true;
  d2.receiveShadow = true;
  registerFloatingObject(d2, { x: 14.5, y: -7.5, z: -1, rotX: 0.3, spinY: -0.01 });

  // Diamond 3 (Deep background accent)
  const d3 = new THREE.Mesh(new THREE.OctahedronGeometry(1.3, 0), diamondMat);
  d3.scale.set(1, 1.35, 1);
  d3.castShadow = true;
  registerFloatingObject(d3, { x: 5, y: 9.5, z: -8, rotY: 0.4, spinY: 0.007 });

  // B. Smooth 3D spheres with glowing teal-to-blue gradient
  const sphereMat = new THREE.MeshStandardMaterial({
    map: sphereGradTex,
    roughness: 0.16,
    metalness: 0.14,
    emissive: 0x0284c7,
    emissiveIntensity: 0.16
  });

  // Sphere 1 (Foreground upper right)
  const s1 = new THREE.Mesh(new THREE.SphereGeometry(2.3, 36, 36), sphereMat);
  s1.castShadow = true;
  s1.receiveShadow = true;
  registerFloatingObject(s1, { x: 12.5, y: 6.8, z: 3, ampY: 0.7, spinY: 0.006 });

  // Sphere 2 (Midground lower left)
  const s2 = new THREE.Mesh(new THREE.SphereGeometry(1.65, 32, 32), sphereMat);
  s2.castShadow = true;
  s2.receiveShadow = true;
  registerFloatingObject(s2, { x: -12, y: -8, z: -1.5, ampY: 0.5, spinY: -0.007 });

  // Sphere 3 (Background)
  const s3 = new THREE.Mesh(new THREE.SphereGeometry(1.15, 28, 28), sphereMat);
  s3.castShadow = true;
  registerFloatingObject(s3, { x: -3, y: -11, z: -7, ampY: 0.4, spinY: 0.005 });

  // C. Half-cylinder crescents pierced with contrasting sticks
  function createPiercedCrescent(crescentColor, stickColor, radius, height, stickLen) {
    const group = new THREE.Group();

    // Semicircular half-cylinder crescent
    const crescentGeo = new THREE.CylinderGeometry(radius, radius, height, 32, 1, false, 0, Math.PI);
    const crescentMat = new THREE.MeshStandardMaterial({
      color: crescentColor,
      roughness: 0.32,
      metalness: 0.1
    });
    const crescentMesh = new THREE.Mesh(crescentGeo, crescentMat);
    crescentMesh.castShadow = true;
    crescentMesh.receiveShadow = true;
    group.add(crescentMesh);

    // Contrasting cylindrical stick piercing through
    const stickGeo = new THREE.CylinderGeometry(0.22, 0.22, stickLen, 20);
    const stickMat = new THREE.MeshStandardMaterial({
      color: stickColor,
      roughness: 0.22,
      metalness: 0.2
    });
    const stickMesh = new THREE.Mesh(stickGeo, stickMat);
    stickMesh.rotation.z = Math.PI / 3.8;
    stickMesh.position.y = 0.2;
    stickMesh.castShadow = true;
    stickMesh.receiveShadow = true;
    group.add(stickMesh);

    return group;
  }

  // Crescent 1: Bright red half-cylinder pierced with pastel yellow stick
  const cres1 = createPiercedCrescent(0xef4444, 0xfde047, 2.1, 1.35, 5.2);
  registerFloatingObject(cres1, { x: 15.5, y: -1.5, z: 1.5, rotX: 0.4, rotY: 0.3, spinX: 0.005, spinY: 0.008 });

  // Crescent 2: Deep purple half-cylinder pierced with coral/pink stick
  const cres2 = createPiercedCrescent(0x7c3aed, 0xf472b6, 2.0, 1.25, 4.9);
  registerFloatingObject(cres2, { x: -15, y: -2, z: 0.5, rotX: -0.3, rotY: -0.4, spinX: -0.006, spinY: 0.007 });

  // D. Curved floating tube rods
  function createTube(radius, tube, arc, color) {
    const geo = new THREE.TorusGeometry(radius, tube, 16, 36, arc);
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.28,
      metalness: 0.12
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  // Tube 1: Pastel orange curved rod
  const tube1 = createTube(2.2, 0.38, Math.PI * 1.3, 0xfb923c);
  registerFloatingObject(tube1, { x: -6.5, y: 9.5, z: -2, rotX: 0.5, rotZ: 0.8, spinX: 0.008, spinZ: 0.006 });

  // Tube 2: Soft lavender curved rod
  const tube2 = createTube(1.85, 0.32, Math.PI * 1.25, 0xc084fc);
  registerFloatingObject(tube2, { x: 7.5, y: -9.5, z: 1, rotX: -0.4, rotY: 0.6, spinY: 0.007, spinX: -0.005 });

  // Tube 3: Cool teal curved rod
  const tube3 = createTube(1.5, 0.28, Math.PI * 1.35, 0x14b8a6);
  registerFloatingObject(tube3, { x: 2, y: 11, z: -4, rotX: 0.8, rotZ: -0.3, spinZ: 0.009 });

  // E. Small scattered 'X' markers / stars
  function createCrossMarker(size, color) {
    const group = new THREE.Group();
    const barGeo = new THREE.BoxGeometry(size, size * 0.22, size * 0.22);
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.1
    });

    const b1 = new THREE.Mesh(barGeo, mat);
    b1.rotation.z = Math.PI / 4;
    b1.castShadow = true;
    group.add(b1);

    const b2 = new THREE.Mesh(barGeo, mat);
    b2.rotation.z = -Math.PI / 4;
    b2.castShadow = true;
    group.add(b2);

    return group;
  }

  const crossConfigs = [
    { x: -8.5, y: 5.2, z: 4, size: 0.95, color: 0xfef08a },   // Pastel yellow
    { x: 8.5, y: 4.5, z: -3, size: 0.85, color: 0xfbcfe8 },    // Soft pink
    { x: -5, y: -6.5, z: 2.5, size: 0.9, color: 0xbae6fd },    // Sky blue
    { x: 5.5, y: 6.8, z: -6, size: 0.8, color: 0xfed7aa },     // Pastel orange
    { x: -16, y: 11, z: -5, size: 0.9, color: 0xddd6fe },     // Lavender
    { x: 14.5, y: 11.5, z: -4, size: 0.85, color: 0x18181b },  // Stark black accent
    { x: 16.5, y: -11, z: -2, size: 0.9, color: 0xfef08a },    // Pastel yellow
    { x: -9.5, y: 12.5, z: 1, size: 0.8, color: 0x2dd4bf }     // Teal
  ];

  crossConfigs.forEach(cfg => {
    const cross = createCrossMarker(cfg.size, cfg.color);
    registerFloatingObject(cross, {
      x: cfg.x,
      y: cfg.y,
      z: cfg.z,
      ampY: 0.4,
      ampX: 0.2,
      floatSpeedY: 0.7 + Math.random() * 0.5,
      spinX: 0.01,
      spinY: 0.012,
      spinZ: 0.008
    });
  });

  // -------------------------------------------------------------
  // Mouse & Scroll Parallax Interaction
  // -------------------------------------------------------------
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let scrollProgress = 0;
  let isVisible = true;
  let animId = null;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function updateScroll() {
    const rect = section.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    scrollProgress = (window.innerHeight / 2 - mid) / window.innerHeight;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Resize handler
  function onResize() {
    width = section.clientWidth;
    height = section.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  window.addEventListener('resize', onResize);

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------
  // Animation Loop
  // -------------------------------------------------------------
  let clock = new THREE.Clock();

  function animate() {
    if (isVisible) {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth mouse damping
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Camera parallax reaction
        camera.position.x = currentMouseX * 3.8;
        camera.position.y = -currentMouseY * 2.6;
        camera.lookAt(0, 0, 0);

        // Subtle scene group reaction to scroll
        sceneGroup.position.y = scrollProgress * 1.8;
        sceneGroup.rotation.y = currentMouseX * 0.04;
        sceneGroup.rotation.x = currentMouseY * 0.03;

        // Animate floating objects
        for (let i = 0; i < floatingObjects.length; i++) {
          const obj = floatingObjects[i];
          const u = obj.userData;

          obj.position.y = u.baseY + Math.sin(elapsed * u.floatSpeedY + u.phase) * u.ampY;
          obj.position.x = u.baseX + Math.cos(elapsed * u.floatSpeedX + u.phase) * u.ampX;

          obj.rotation.x += u.spinX;
          obj.rotation.y += u.spinY;
          obj.rotation.z += u.spinZ;
        }
      }

      renderer.render(scene, camera);
    }

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(animate);
    }
  }

  // IntersectionObserver to pause loop when section is offscreen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(section);
  }

  // Initial render / Start loop
  animate();
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




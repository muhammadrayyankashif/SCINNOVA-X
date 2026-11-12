const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionContext;
let motionMedia;
let lenisTicker;
let motionLibraries;
let smoothScrollLibrary;
const galleryMotionOverride = readGalleryMotionPreference();

// Essential interactions work even when optional animation scripts are unavailable.
initCountdown();
initFAQ();
initModulesPresentation();
initMobileMenu();
initMagneticButtons();
initModuleHighlights();
initBackToTop();
initNavbarScroll();
initDnaRotation();
motionPreference.addEventListener("change", refreshPageMotion);
navigator.connection?.addEventListener("change", refreshPageMotion);
window.addEventListener("online", initPageMotion);

// Reading and navigation never wait for optional animation libraries.
if (window.requestIdleCallback) {
  window.requestIdleCallback(initPageMotion, { timeout: 2000 });
} else {
  window.setTimeout(initPageMotion, 200);
}

function loadMotionScript(src) {
  const load = () => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const finish = (error) => {
      window.clearTimeout(timeout);
      script.onload = script.onerror = null;
      if (error) {
        script.remove();
        reject(error);
      } else {
        resolve();
      }
    };
    const timeout = window.setTimeout(() => finish(new Error(`Timed out loading ${src}`)), 8000);
    script.src = src;
    script.async = true;
    script.onload = () => finish();
    script.onerror = () => finish(new Error(`Could not load ${src}`));
    document.head.append(script);
  });
  return load().catch(() => load());
}

async function initPageMotion() {
  if ((motionPreference.matches && !galleryMotionOverride) || navigator.connection?.saveData) {
    configureMotion();
    return;
  }

  motionLibraries ??= (async () => {
    if (!window.gsap) {
      await loadMotionScript("js/vendor/gsap-3.12.2.min.js");
    }
    if (!window.ScrollTrigger) {
      await loadMotionScript("js/vendor/ScrollTrigger-3.12.2.min.js");
    }
    return true;
  })().catch((error) => {
    motionLibraries = null;
    console.warn("Page animations could not start. They will retry when connectivity returns.", error);
    return false;
  });

  if (await motionLibraries) {
    if (!motionContext) configureMotion();
    // Parallax uses native scrolling immediately; smooth scrolling is optional.
    if (!motionPreference.matches && !window.Lenis) {
      smoothScrollLibrary ??= loadMotionScript("js/vendor/lenis-1.0.29.min.js")
        .then(initSmoothScrolling)
        .catch(() => { smoothScrollLibrary = null; });
    }
  }
}

function configureMotion() {
  motionMedia?.revert();
  motionMedia = null;
  motionContext?.revert();
  motionContext = null;
  if (lenisTicker) window.gsap.ticker.remove(lenisTicker);
  window.lenis?.destroy();
  window.lenis = null;
  lenisTicker = null;

  if (motionPreference.matches || navigator.connection?.saveData) {
    if (window.gsap) {
      gsap.killTweensOf(".magnetic-btn");
      gsap.set(".magnetic-btn", { clearProps: "transform" });
    }
    if (!galleryMotionOverride || navigator.connection?.saveData) return;
  }
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  initSmoothScrolling();

  motionContext = gsap.context(() => {
    if (!motionPreference.matches) {
      initHero();
      initScroll();
    }
  });
  // Each breakpoint owns its effects; GSAP restores styles when it stops matching.
  motionMedia = gsap.matchMedia();
  motionMedia.add("(min-width: 769px)", initGallery);
  if (!motionPreference.matches) {
    motionMedia.add("(min-width: 1025px)", initEditorialParallax);
  }
  ScrollTrigger.refresh();
}

function refreshPageMotion() {
  configureMotion();
  initPageMotion();
}

// Only the visible, hovered or keyboard-focused module illustration can move.
function initModuleHighlights() {
  const cards = Array.from(document.querySelectorAll(".home-module-link"));
  if (!cards.length) return;

  const updateCards = new Map();
  const canMove = () => !motionPreference.matches && !navigator.connection?.saveData;
  const observer = typeof IntersectionObserver === "function"
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => updateCards.get(entry.target)?.(entry.isIntersecting));
    })
    : null;

  const refreshIllustrations = () => {
    document.documentElement.classList.toggle("module-motion-enabled", canMove());
    updateCards.forEach((update) => update());
  };

  cards.forEach((card) => {
    let pointerFrame = 0;
    let pointerInside = false;
    let inView = !observer;

    const clearPointer = () => {
      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      card.style.removeProperty("--pointer-x");
      card.style.removeProperty("--pointer-y");
    };
    const update = (visible = inView) => {
      inView = visible;
      const allowed = canMove() && !document.hidden && inView;
      card.classList.toggle("module-motion-active", allowed);
      if (!allowed) clearPointer();
    };
    updateCards.set(card, update);
    observer?.observe(card);

    card.addEventListener("pointerenter", (event) => {
      pointerInside = event.pointerType === "mouse";
      update();
    }, { passive: true });
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || !canMove() || document.hidden || !inView) return;
      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
        card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
      });
    }, { passive: true });
    card.addEventListener("pointerleave", () => {
      pointerInside = false;
      clearPointer();
      update();
    });
    card.addEventListener("focus", () => update());
    card.addEventListener("blur", () => update());
  });

  motionPreference.addEventListener("change", refreshIllustrations);
  navigator.connection?.addEventListener("change", refreshIllustrations);
  document.addEventListener("visibilitychange", refreshIllustrations);
  refreshIllustrations();
}

function readGalleryMotionPreference() {
  if (!document.querySelector(".gallery-col")) return false;
  try {
    return window.localStorage.getItem("scinnova-gallery-motion") === "enabled";
  } catch {
    return false;
  }
}

function initSmoothScrolling() {
  if (motionPreference.matches || navigator.connection?.saveData || window.lenis ||
      !window.gsap || !window.ScrollTrigger || !window.Lenis) return;
  window.lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    syncTouch: true,
  });
  window.lenis.on("scroll", (e) => {
    ScrollTrigger.update();
    const navbar = document.querySelector(".magick-nav");
    if (navbar) {
      const scrollY = e?.scroll ?? (window.scrollY || document.documentElement.scrollTop || 0);
      navbar.classList.toggle("is-scrolled", scrollY > 20);
    }
  });
  lenisTicker = (time) => window.lenis?.raf(time * 1000);
  gsap.ticker.add(lenisTicker);
  gsap.ticker.lagSmoothing(0);
  if (document.querySelector(".mobile-menu-overlay")?.open) window.lenis.stop();
}
/* === HERO ANIMATION === */
function initHero() {
  const heroImg = document.querySelector(".hero-bg-image");
  if (!heroImg) return;
  // Keep the hero image and text visible from the first paint.
  gsap.fromTo(heroImg, { scale: 1.03 }, {
    scale: 1,
    duration: 0.45,
    ease: "power2.out",
  });
}
/* === GENERAL SCROLL ANIMATIONS === */
function initScroll() {
  const editorialImg = document.querySelector(".editorial-image");
  if (editorialImg) {
    if (editorialImg.getBoundingClientRect().top >= window.innerHeight) {
      gsap.fromTo(".image-frame", { y: 16, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".editorial-image",
          start: "top 70%",
        },
      });
    }
  }
  const revealElements = document.querySelectorAll(".reveal-text, .programme-reveal");
  revealElements.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    gsap.from(el, {
      y: 16,
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });
  });
}
function initEditorialParallax() {
  if (!document.querySelector(".editorial-image")) return;
  gsap.fromTo(".parallax-img", { yPercent: -4 }, {
    yPercent: 4,
    ease: "none",
    scrollTrigger: {
      trigger: ".editorial-image",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}
function initMagneticButtons() {
  const magnets = document.querySelectorAll(".magnetic-btn");
  magnets.forEach((magnet) => {
    if (magnet.closest(".magick-nav")) {
      return;
    }
    magnet.addEventListener("mousemove", (e) => {
      if (motionPreference.matches || navigator.connection?.saveData || !window.gsap) return;
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(magnet, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.2,
        ease: "power2.out",
      });
    });
    magnet.addEventListener("mouseleave", () => {
      if (motionPreference.matches || navigator.connection?.saveData || !window.gsap) return;
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });
}
/* === FAQ / ORACLE === */
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  function setExpanded(item, expanded) {
    item.classList.toggle("active", expanded);
    item.querySelector(".faq-question").setAttribute("aria-expanded", String(expanded));
    item.querySelector(".faq-answer").hidden = !expanded;
  }
  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    setExpanded(item, false);
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      items.forEach((entry) => setExpanded(entry, entry === item && !isActive));
      window.ScrollTrigger?.refresh();
    });
  });
}
/* === COUNTDOWN TIMER === */
function initCountdown() {
  const elMonths = document.getElementById("months");
  const elDays = document.getElementById("days");
  const elHours = document.getElementById("hours");
  const elMinutes = document.getElementById("minutes");
  const elSeconds = document.getElementById("seconds");
  if (!elMonths && !elDays && !elHours && !elMinutes && !elSeconds) return;

  const timer = document.querySelector(".doomsday-timer");
  const targetDate = new Date(timer?.dataset.targetDate);
  if (Number.isNaN(targetDate.getTime())) return;
  let intervalId;

  // Marvel Avengers Doomsday Clock audio system - Plays ONLY on Hero section
  const heroEl = document.getElementById("hero") || document.querySelector(".hero-gate");
  const loopAudio = new Audio("public/audio/doomsday-clock-loop.mp3");
  loopAudio.loop = true;
  loopAudio.preload = "auto";
  loopAudio.volume = 0.85;

  let isPlaying = false;
  let heroInView = true;

  const startClockAudio = () => {
    if (!heroInView || document.hidden) return;
    if (isPlaying) return;

    const now = new Date();
    const secOffset = (now.getSeconds() % 4) + (now.getMilliseconds() / 1000);
    try {
      loopAudio.currentTime = secOffset % 4;
    } catch (e) {}

    const playPromise = loopAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
        })
        .catch(() => {
          // Autoplay policy waiting for user gesture
        });
    }
  };

  const stopClockAudio = () => {
    if (loopAudio) {
      loopAudio.pause();
      isPlaying = false;
    }
  };

  const handleGesture = () => {
    if (heroInView) {
      startClockAudio();
    }
  };

  const gestureEvents = ["click", "pointerdown", "keydown", "touchstart", "scroll"];
  gestureEvents.forEach((ev) => window.addEventListener(ev, handleGesture, { capture: true, passive: true }));

  // Hero visibility observer: only play when hero is visible in the viewport
  if (heroEl && typeof IntersectionObserver === "function") {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        heroInView = entry.isIntersecting;
        if (heroInView) {
          startClockAudio();
        } else {
          stopClockAudio();
        }
      });
    }, { threshold: 0.05 });
    heroObserver.observe(heroEl);
  } else {
    const checkScroll = () => {
      const heroHeight = heroEl ? heroEl.offsetHeight : 600;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const inView = scrollY < heroHeight;
      if (inView !== heroInView) {
        heroInView = inView;
        if (heroInView) startClockAudio();
        else stopClockAudio();
      }
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    startClockAudio();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopClockAudio();
    } else if (heroInView) {
      startClockAudio();
    }
  });

  function updateTimer() {
    const now = new Date();
    const diffTotalMs = targetDate.getTime() - now.getTime();
    if (diffTotalMs <= 0) {
      if (elMonths) elMonths.textContent = "00";
      if (elDays) elDays.textContent = "00";
      if (elHours) elHours.textContent = "00";
      if (elMinutes) elMinutes.textContent = "00";
      if (elSeconds) elSeconds.textContent = "00";
      window.clearInterval(intervalId);
      if (loopAudio) {
        loopAudio.pause();
        isPlaying = false;
      }
      return;
    }

    let m = 0;
    let temp = new Date(now.getTime());
    while (true) {
      let nextMonth = new Date(temp.getTime());
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      if (nextMonth <= targetDate) {
        m++;
        temp = nextMonth;
      } else {
        break;
      }
    }

    let diffMs = targetDate.getTime() - temp.getTime();
    let days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    diffMs -= days * (1000 * 60 * 60 * 24);
    let hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs -= hours * (1000 * 60 * 60);
    let minutes = Math.floor(diffMs / (1000 * 60));
    diffMs -= minutes * (1000 * 60);
    let seconds = Math.floor(diffMs / 1000);

    if (elMonths) elMonths.textContent = String(m).padStart(2, "0");
    if (elDays) elDays.textContent = String(days).padStart(2, "0");
    if (elHours) elHours.textContent = String(hours).padStart(2, "0");
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, "0");
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, "0");
  }

  if (targetDate > new Date()) intervalId = window.setInterval(updateTimer, 1000);
  updateTimer();
}
/* === GALLERY SECTION === */
function initGallery() {
  const columns = document.querySelectorAll(".gallery-col");
  if (columns.length === 0) return;
  gsap.to(columns[0], {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".gallery-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
  gsap.fromTo(
    columns[1],
    {
      yPercent: -20,
    },
    {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".gallery-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    }
  );
  gsap.to(columns[2], {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: ".gallery-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });
}

/* === MODULES PRESENTATION CAROUSEL === */
function initModulesPresentation() {
  const track = document.getElementById("modules-track");
  const prevBtn = document.getElementById("module-prev-btn");
  const nextBtn = document.getElementById("module-next-btn");
  const dotsContainer = document.getElementById("modules-dots");
  const currentEl = document.getElementById("current-slide");
  const totalEl = document.getElementById("total-slides");

  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll(".presentation-card"));
  if (cards.length === 0) return;

  let currentSlide = 0;

  function getCardsPerView() {
    return window.innerWidth >= 820 ? 2 : 1;
  }

  function getTotalSlides() {
    const cpv = getCardsPerView();
    return cpv === 2 ? Math.ceil(cards.length / 2) : cards.length;
  }

  function updateDots() {
    if (!dotsContainer) return;
    const total = getTotalSlides();
    dotsContainer.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("button");
      dot.className = `slider-dot ${i === currentSlide ? "active" : ""}`;
      dot.setAttribute("aria-label", `Slide ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateUI() {
    const total = getTotalSlides();
    if (currentSlide >= total) currentSlide = total - 1;
    if (currentSlide < 0) currentSlide = 0;

    const cpv = getCardsPerView();
    const viewport = track.parentElement;
    const viewportWidth = viewport ? viewport.getBoundingClientRect().width : 1200;
    const gap = window.innerWidth >= 820 ? 24 : 16;

    let offset = 0;
    if (cpv === 2) {
      const cardWidth = (viewportWidth - gap) / 2;
      const step = (cardWidth + gap) * 2;
      offset = currentSlide * step;
      const maxScroll = track.scrollWidth - viewportWidth;
      if (maxScroll > 0 && offset > maxScroll) offset = maxScroll;
    } else {
      const cardWidth = viewportWidth;
      offset = currentSlide * (cardWidth + gap);
    }

    track.style.transform = `translateX(-${offset}px)`;

    if (currentEl) currentEl.textContent = String(currentSlide + 1).padStart(2, "0");
    if (totalEl) totalEl.textContent = String(total).padStart(2, "0");

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === total - 1;

    const dots = dotsContainer ? dotsContainer.querySelectorAll(".slider-dot") : [];
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateUI();
  }

  function nextSlide() {
    const total = getTotalSlides();
    if (currentSlide < total - 1) {
      currentSlide++;
      updateUI();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateUI();
    }
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Touch Swipe Support
  let startX = 0;
  let endX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateDots();
      updateUI();
    }, 100);
  });

  updateDots();
  updateUI();
}

/* === MOBILE MENU === */
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const closeBtn = document.querySelector(".mobile-menu-close");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const navbar = document.querySelector(".magick-nav");
  if (!toggle || !closeBtn || !overlay || !navbar || !overlay.showModal) return;

  const mobileViewport = window.matchMedia("(max-width: 768px)");
  let previousOverflow = "";

  // Native dialogs provide focus containment, Escape dismissal, and an inert background.
  toggle.addEventListener("click", () => {
    if (overlay.open || !mobileViewport.matches) return;
    previousOverflow = document.body.style.overflow;
    overlay.showModal();
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    window.lenis?.stop();
  });
  closeBtn.addEventListener("click", () => overlay.close());
  overlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => overlay.close());
  });
  overlay.addEventListener("close", () => {
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = previousOverflow;
    window.lenis?.start();
    const focusTarget = mobileViewport.matches ? toggle : navbar.querySelector(".nav-link.active");
    focusTarget?.focus({ preventScroll: true });
  });
  mobileViewport.addEventListener("change", () => {
    if (!mobileViewport.matches && overlay.open) overlay.close();
  });

  // Without JavaScript or dialog support, the regular navigation stays visible.
  navbar.classList.add("menu-ready");
  toggle.hidden = false;
}

/* === BACK TO TOP INTERACTION === */
function initBackToTop() {
  const links = document.querySelectorAll('.footer-bottom a[href^="#"]');
  if (!links.length) return;

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      link.classList.add("scrolling-up");
      window.setTimeout(() => link.classList.remove("scrolling-up"), 1200);

      if (window.lenis && !motionPreference.matches) {
        window.lenis.scrollTo(0, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: motionPreference.matches ? "auto" : "smooth",
        });
      }

      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        targetEl?.focus({ preventScroll: true });
      }
    });
  });
}

/* === NAVBAR SCROLL STATE === */
function initNavbarScroll() {
  const navbar = document.querySelector(".magick-nav");
  if (!navbar) return;

  let ticking = false;

  const updateNavbar = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    navbar.classList.toggle("is-scrolled", scrollY > 20);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();
}

/* === BIOLOGY MODULE 3D ROTATING DNA HELIX === */
function initDnaRotation() {
  const helix = document.querySelector(".dna-helix");
  if (!helix) return;

  const pathA = helix.querySelector(".dna-strand-a");
  const pathB = helix.querySelector(".dna-strand-b");
  const rungEls = Array.from(helix.querySelectorAll(".dna-rung"));
  const nodeEls = Array.from(helix.querySelectorAll(".dna-node"));
  if (!pathA || !pathB || !rungEls.length) return;

  const card = helix.closest(".home-module-link");
  const cx = 265;
  const radius = 36;
  const numRungs = 13;
  const startY = 28;
  const endY = 212;
  const stepY = (endY - startY) / (numRungs - 1);
  const twist = 0.40;

  let theta = 0;
  let animId = null;
  let lastTime = 0;
  let isVisible = false;
  const speed = 0.00185; // ~3.4s per complete 360-degree rotation (0.84x relaxed pace)

  const ptsA = new Array(numRungs);
  const ptsB = new Array(numRungs);

  const render = (time) => {
    if (motionPreference.matches || document.hidden || !isVisible) {
      animId = null;
      return;
    }

    if (!lastTime) lastTime = time;
    const dt = Math.min(time - lastTime, 50);
    lastTime = time;
    theta = (theta + dt * speed) % (Math.PI * 2);

    for (let i = 0; i < numRungs; i++) {
      const y = startY + i * stepY;
      const phi = theta + i * twist;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      const xa = cx + radius * cosPhi;
      const xb = cx - radius * cosPhi;
      const za = sinPhi; // depth: >0 is front, <0 is back

      ptsA[i] = [xa, y, -(radius * twist / 3.0) * sinPhi];
      ptsB[i] = [xb, y, (radius * twist / 3.0) * sinPhi];

      // Update base pair rung
      const rung = rungEls[i];
      if (rung) {
        rung.setAttribute("x1", xa.toFixed(1));
        rung.setAttribute("x2", xb.toFixed(1));
        rung.setAttribute("y1", y.toFixed(1));
        rung.setAttribute("y2", y.toFixed(1));
        rung.setAttribute("opacity", (0.2 + 0.5 * Math.abs(cosPhi)).toFixed(2));
      }

      // Update nucleotide node A
      const nodeA = nodeEls[i * 2];
      if (nodeA) {
        nodeA.setAttribute("cx", xa.toFixed(1));
        nodeA.setAttribute("cy", y.toFixed(1));
        nodeA.setAttribute("r", (2.2 + 1.2 * (za + 1) / 2).toFixed(1));
        nodeA.setAttribute("opacity", (0.35 + 0.65 * (za + 1) / 2).toFixed(2));
      }

      // Update nucleotide node B
      const nodeB = nodeEls[i * 2 + 1];
      if (nodeB) {
        nodeB.setAttribute("cx", xb.toFixed(1));
        nodeB.setAttribute("cy", y.toFixed(1));
        nodeB.setAttribute("r", (2.2 + 1.2 * (-za + 1) / 2).toFixed(1));
        nodeB.setAttribute("opacity", (0.35 + 0.65 * (-za + 1) / 2).toFixed(2));
      }
    }

    // Generate smooth bezier curves for both ribbons
    let dA = `M ${ptsA[0][0].toFixed(1)} ${ptsA[0][1].toFixed(1)}`;
    let dB = `M ${ptsB[0][0].toFixed(1)} ${ptsB[0][1].toFixed(1)}`;

    for (let i = 0; i < numRungs - 1; i++) {
      const p1A = ptsA[i];
      const p2A = ptsA[i + 1];
      const cp1xA = p1A[0] + p1A[2];
      const cp1yA = p1A[1] + (stepY / 3.0);
      const cp2xA = p2A[0] - p2A[2];
      const cp2yA = p2A[1] - (stepY / 3.0);
      dA += ` C ${cp1xA.toFixed(1)} ${cp1yA.toFixed(1)}, ${cp2xA.toFixed(1)} ${cp2yA.toFixed(1)}, ${p2A[0].toFixed(1)} ${p2A[1].toFixed(1)}`;

      const p1B = ptsB[i];
      const p2B = ptsB[i + 1];
      const cp1xB = p1B[0] + p1B[2];
      const cp1yB = p1B[1] + (stepY / 3.0);
      const cp2xB = p2B[0] - p2B[2];
      const cp2yB = p2B[1] - (stepY / 3.0);
      dB += ` C ${cp1xB.toFixed(1)} ${cp1yB.toFixed(1)}, ${cp2xB.toFixed(1)} ${cp2yB.toFixed(1)}, ${p2B[0].toFixed(1)} ${p2B[1].toFixed(1)}`;
    }

    pathA.setAttribute("d", dA);
    pathB.setAttribute("d", dB);

    animId = window.requestAnimationFrame(render);
  };

  const start = () => {
    if (!animId && !motionPreference.matches && !document.hidden && isVisible) {
      lastTime = 0;
      animId = window.requestAnimationFrame(render);
    }
  };

  const stop = () => {
    if (animId) {
      window.cancelAnimationFrame(animId);
      animId = null;
    }
  };

  if (typeof IntersectionObserver === "function" && card) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      });
    }, { threshold: 0.05 });
    observer.observe(card);
  } else {
    isVisible = true;
    start();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (isVisible) start();
  });
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches) stop();
    else if (isVisible) start();
  });
}



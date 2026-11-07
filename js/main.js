const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionContext;
let motionMedia;
let lenisTicker;
let motionLibraries;

// Essential interactions work even when the animation CDNs are unavailable.
initCountdown();
initFAQ();
initModulesPresentation();
initMobileMenu();
initMagneticButtons();
motionPreference.addEventListener("change", initPageMotion);
navigator.connection?.addEventListener("change", initPageMotion);

// Reading and navigation never wait for optional animation libraries.
if (window.requestIdleCallback) {
  window.requestIdleCallback(initPageMotion, { timeout: 2000 });
} else {
  window.setTimeout(initPageMotion, 200);
}

function loadMotionScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

async function initPageMotion() {
  if (motionPreference.matches || navigator.connection?.saveData) {
    configureMotion();
    return;
  }

  motionLibraries ??= (async () => {
    if (!window.gsap) {
      await loadMotionScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
    }
    await Promise.all([
      window.ScrollTrigger ? null : loadMotionScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"),
      window.Lenis ? null : loadMotionScript("https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js").catch(() => {}),
    ]);
    return true;
  })().catch(() => false);

  if (await motionLibraries) configureMotion();
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
    return;
  }
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis) {
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
    window.lenis.on("scroll", ScrollTrigger.update);
    lenisTicker = (time) => window.lenis?.raf(time * 1000);
    gsap.ticker.add(lenisTicker);
    gsap.ticker.lagSmoothing(0);
    if (document.querySelector(".mobile-menu-overlay")?.open) window.lenis.stop();
  }

  motionContext = gsap.context(() => {
    initHero();
    initScroll();
  });
  // Each breakpoint owns its effects; GSAP restores styles when it stops matching.
  motionMedia = gsap.matchMedia();
  motionMedia.add("(min-width: 769px)", initGallery);
  motionMedia.add("(min-width: 1025px)", initEditorialParallax);
  ScrollTrigger.refresh();
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
  const targetDate = new Date(timer.dataset.targetDate);
  if (Number.isNaN(targetDate.getTime())) return;
  let intervalId;

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


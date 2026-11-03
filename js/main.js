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
gsap.ticker.add((time) => {
  window.lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

ScrollTrigger.refresh();
initCountdown(); // Run immediately so digits populate instantly

window.addEventListener("load", () => {
  initLoader();
  initHero();
  initModulesPresentation();
  initScroll();
  initFAQ();
  initMagneticButtons();
  initGallery();
  initMobileMenu();
});
/* === LOADER === */
function initLoader() {
  const tl = gsap.timeline();
  tl.from(".loader-text", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
  })
    .from(
      ".loader-subtext",
      {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .to(".loader", {
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      pointerEvents: "none",
      ease: "power2.inOut",
      onComplete: () => {
        const l = document.querySelector(".loader");
        if (l) l.style.display = "none";
      },
    });
}
/* === HERO ANIMATION === */
function initHero() {
  const heroImg = document.querySelector(".hero-bg-image");
  if (!heroImg) return;
  const tl = gsap.timeline({ delay: 0.2 });
  tl.from(".hero-bg-image", {
    scale: 1.08,
    opacity: 0,
    duration: 1.8,
    ease: "power2.out",
  })
    .from(
      ".doomsday-title",
      {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=1.1"
    )
    .from(
      ".doomsday-timer",
      {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.7"
    );
}
/* === GENERAL SCROLL ANIMATIONS === */
function initScroll() {
  const editorialImg = document.querySelector(".editorial-image");
  if (editorialImg) {
    if (window.innerWidth > 1024) {
      gsap.fromTo(
        ".parallax-img",
        {
          yPercent: -10,
        },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".editorial-image",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    }
    gsap.to(".image-frame", {
      clipPath: "inset(0 0 0 0)",
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".editorial-image",
        start: "top 70%",
      },
    });
  }
  const revealElements = document.querySelectorAll(".reveal-text");
  revealElements.forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });
  });
  initStackingCards();
}
function initStackingCards() {
  const cards = gsap.utils.toArray(".testimonial-card-stack");
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        fastScrollEnd: true,
      },
    });
  });
}
function initMagneticButtons() {
  const magnets = document.querySelectorAll(".magnetic-btn");
  magnets.forEach((magnet) => {
    if (magnet.closest(".magick-nav")) {
      return;
    }
    magnet.addEventListener("mousemove", (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(magnet, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    magnet.addEventListener("mouseleave", () => {
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });
}
/* === FAQ / ORACLE === */
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      if (window.lenis) {
        window.lenis.stop();
      }

      items.forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add("active");
        const answer = item.querySelector(".faq-answer");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }

      setTimeout(() => {
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
        if (window.lenis) {
          window.lenis.start();
        }
      }, 500);
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

  function getTargetDate() {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(`${year}-01-08T08:00:00+05:00`);
    if (now >= target) {
      target = new Date(`${year + 1}-01-08T08:00:00+05:00`);
    }
    return target;
  }

  const targetDate = getTargetDate();

  function updateTimer() {
    const now = new Date();
    const diffTotalMs = targetDate.getTime() - now.getTime();
    if (diffTotalMs <= 0) {
      if (elMonths) elMonths.innerText = "00";
      if (elDays) elDays.innerText = "00";
      if (elHours) elHours.innerText = "00";
      if (elMinutes) elMinutes.innerText = "00";
      if (elSeconds) elSeconds.innerText = "00";
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

    if (elMonths) elMonths.innerText = String(m).padStart(2, "0");
    if (elDays) elDays.innerText = String(days).padStart(2, "0");
    if (elHours) elHours.innerText = String(hours).padStart(2, "0");
    if (elMinutes) elMinutes.innerText = String(minutes).padStart(2, "0");
    if (elSeconds) elSeconds.innerText = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
/* === GALLERY SECTION === */
function initGallery() {
  if (window.innerWidth < 768) return;
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
  const links = document.querySelectorAll(".mobile-nav-link");
  function toggleMenu() {
    if (!overlay) return;
    overlay.classList.toggle("active");
    if (toggle) toggle.classList.toggle("hidden");
    document.body.style.overflow = overlay.classList.contains("active")
      ? "hidden"
      : "";
  }
  if (toggle) toggle.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      if (window.lenis) {
        window.lenis.scrollTo(targetId);
      } else {
        document
          .querySelector(targetId)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}




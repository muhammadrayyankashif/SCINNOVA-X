const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;
  if (cursorDot && cursorOutline) {
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  }
});
const hoverables = document.querySelectorAll(
  "a:not(.magick-nav a):not(.cta-btn):not(.partner-link), button, .magnetic-btn, .module-card"
);
hoverables.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (!cursorOutline) return;
    cursorOutline.style.width = "60px";
    cursorOutline.style.height = "60px";
    cursorOutline.style.backgroundColor = "rgba(84, 123, 96, 0.2)";
  });
  el.addEventListener("mouseleave", () => {
    if (!cursorOutline) return;
    cursorOutline.style.width = "40px";
    cursorOutline.style.height = "40px";
    cursorOutline.style.backgroundColor = "transparent";
  });
});
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
  initModulesScroll();
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

/* === MODULES HORIZONTAL SCROLL === */
function initModulesScroll() {
  const section = document.querySelector(".horizontal-scroll-section");
  const wrapper = document.querySelector(".horizontal-scroll-wrapper");
  const content = document.querySelector(".hs-content");
  if (!section || !wrapper || !content) return;

  if (window.innerWidth > 1024) {
    wrapper.style.overflowX = "hidden";

    const getScrollAmount = () => {
      let contentWidth = content.scrollWidth;
      return -(contentWidth - window.innerWidth);
    };

    const tween = gsap.to(content, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }
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




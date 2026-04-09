// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtnAnchor = document.querySelector(".scroll-button a.to-top");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtnAnchor.style.display = "inline-flex";
  } else {
    nav.classList.remove("sticky");
    scrollBtnAnchor.style.display = "none";
  }
  updateScrollProgress();
};

window.addEventListener("load", () => {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtnAnchor.style.display = "inline-flex";
  } else {
    nav.classList.remove("sticky");
    scrollBtnAnchor.style.display = "none";
  }
});

// Side Navigation Menu
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  let scrollBtn = document.querySelector(".scroll-button a");
  if (scrollBtn) scrollBtn.style.pointerEvents = "none";
};

const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  let scrollBtn = document.querySelector(".scroll-button a");
  if (scrollBtn) scrollBtn.style.pointerEvents = "auto";
};

cancelBtn.onclick = hideNavMenu;

let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});

// Theme Toggle
const THEME_KEY = "portfolio_theme";
const themeToggleBtn = document.getElementById("themeToggle");
const bodyEl = document.body;

function applyTheme(theme) {
  if (theme === "dark") {
    bodyEl.classList.add("dark");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    bodyEl.classList.remove("dark");
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem(THEME_KEY, theme);
}

(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});

// Scroll Progress Ring
const progressCircle = document.querySelector(".progress-ring__circle");
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

if (progressCircle) {
  progressCircle.style.strokeDasharray = `${CIRCUMFERENCE}`;
  progressCircle.style.strokeDashoffset = `${CIRCUMFERENCE}`;
}

function setProgress(percent) {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
  if (progressCircle) {
    progressCircle.style.strokeDashoffset = offset;
  }
}

function toggleCase(btn) {
  const card = btn.closest(".box");
  const caseEl = card.querySelector(".case-hidden");

  if (!caseEl) return;

  caseEl.style.display =
    caseEl.style.display === "block" ? "none" : "block";
}

function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  const percent = Math.min(100, Math.max(0, scrolled));
  setProgress(percent);
}

document.querySelectorAll(".scroll-button a.to-top").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

window.addEventListener("load", updateScrollProgress);
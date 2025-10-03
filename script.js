// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtnAnchor = document.querySelector(".scroll-button a.to-top");

// Show/hide sticky navigation and scroll button based on scroll position
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
  // Show/hide on load depending on scroll position
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

// Open side navigation
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  // disable scroll button pointer while nav is open
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

// Close side navigation
cancelBtn.onclick = hideNavMenu;

// Close side navigation when a menu link is clicked
let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});

// Dynamic Job Title Typing Effect
const dynamicJobTitle = document.querySelector(".job-title-dynamic");
const staticJobTitle = document.querySelector(".job-title-static"); // Still targeting the static span for hiding

const jobTitles = [
  "Software Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Python Developer",
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriterEffect() {
  // Hide the static job title once the dynamic effect starts
  if (staticJobTitle.style.display !== "none") {
    staticJobTitle.style.display = "none";
  }

  const currentTitle = jobTitles[titleIndex];

  if (isDeleting) {
    dynamicJobTitle.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicJobTitle.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  // If typing is complete
  if (!isDeleting && charIndex === currentTitle.length) {
    setTimeout(() => (isDeleting = true), 1500); // Pause, then start deleting
  }
  // If deleting is complete
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % jobTitles.length; // Move to the next title
    setTimeout(typeWriterEffect, 500); // Short pause before typing next title
    return; // Exit to prevent immediate re-run
  }

  const typingSpeed = isDeleting ? 70 : 150; // Faster deleting, slower typing
  setTimeout(typeWriterEffect, typingSpeed);
}

// Initial call to start the typing effect after a short delay
window.addEventListener("load", () => {
  setTimeout(typeWriterEffect, 500);
});

// ================= Theme Toggle =================
const THEME_KEY = "portfolio_theme";
const themeToggleBtn = document.getElementById("themeToggle");
const bodyEl = document.body;

function applyTheme(theme) {
  if (theme === "dark") {
    bodyEl.classList.add("dark");
    // set icon to sun (so clicking will go light)
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    bodyEl.classList.remove("dark");
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem(THEME_KEY, theme);
}

// initialize theme from localStorage (or system preference fallback)
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else {
    // prefer dark if user prefers it
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});

// ================= Scroll Progress Ring =================
const progressCircle = document.querySelector(".progress-ring__circle");
const RADIUS = 52; // same as CSS r
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

function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  // cap at 100
  const percent = Math.min(100, Math.max(0, scrolled));
  setProgress(percent);

  // optional: hide button when at top, already handled in onscroll
}

// Smooth scroll to top when clicking anchor
document.querySelectorAll(".scroll-button a.to-top").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Initialize progress on load
window.addEventListener("load", updateScrollProgress);

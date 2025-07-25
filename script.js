// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

// Show/hide sticky navigation and scroll button based on scroll position
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};

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
  scrollBtn.style.pointerEvents = "none";
};

const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
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
const staticJobTitle = document.querySelector(".job-title-static");

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
  const currentTitle = jobTitles[titleIndex];
  if (isDeleting) {
    dynamicJobTitle.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicJobTitle.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentTitle.length) {
    staticJobTitle.style.display = "none"; // Hide static title when dynamic starts
    setTimeout(() => (isDeleting = true), 1000); // Pause at end of typing
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % jobTitles.length;
    staticJobTitle.style.display = "inline"; // Show static title when a full dynamic cycle completes (optional, can be kept hidden)
  }

  const typingSpeed = isDeleting ? 70 : 150; // Faster deleting, slower typing
  setTimeout(typeWriterEffect, typingSpeed);
}

// Initial call to start the typing effect after a short delay
window.addEventListener("load", () => {
  setTimeout(typeWriterEffect, 500);
});

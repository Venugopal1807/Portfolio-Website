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

// Dynamic Job Title Sliding Effect
const dynamicJobTitle = document.querySelector(".job-title-dynamic");
const staticJobTitle = document.querySelector(".job-title-static");

const jobTitles = [
  "Software Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Python Developer",
];
let titleIndex = 0;

function slideJobTitle() {
  staticJobTitle.style.display = "none"; // Hide the static title
  dynamicJobTitle.style.transform = "translateX(100%)"; // Start off-screen to the right
  dynamicJobTitle.style.opacity = "0"; // Start invisible

  setTimeout(() => {
    dynamicJobTitle.textContent = jobTitles[titleIndex];
    dynamicJobTitle.style.transform = "translateX(0)"; // Slide in
    dynamicJobTitle.style.opacity = "1"; // Fade in

    setTimeout(() => {
      dynamicJobTitle.style.transform = "translateX(-100%)"; // Slide out to the left
      dynamicJobTitle.style.opacity = "0"; // Fade out
      titleIndex = (titleIndex + 1) % jobTitles.length; // Move to next title

      setTimeout(slideJobTitle, 500); // Wait for slide out to complete before next slide in
    }, 2000); // Display time for each title
  }, 500); // Delay before sliding in (matches slide out transition duration)
}

// Initial call to start the sliding effect after a short delay
window.addEventListener("load", () => {
  setTimeout(slideJobTitle, 500);
});
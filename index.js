/* BACK TO TOP BUTTON */
const topBtn = document.getElementById("btn-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* PAGE NAVIGATION */
const sections = {
  profile: document.getElementById("profile"),
  projects: document.getElementById("projects"),
  experience: document.getElementById("experience"),
  about: document.getElementById("about"),
  contact: document.getElementById("contact")
};

const navButtons = {
  profile: document.getElementById("home-btn"),
  projects: document.getElementById("projects-btn"),
  experience: document.getElementById("experience-btn"),
  about: document.getElementById("about-btn"),
  contact: document.getElementById("contact-btn")
};

let currentSection = "profile";

function handleNav(e, target) {
  e.preventDefault();
  goTo(target);

  if (target === "profile") {
    history.pushState(null, "", `/portfolio/`);
    return;
  }
  history.pushState(null, "", "#" + target);
}


/* INITIAL STATE */
document.addEventListener("DOMContentLoaded", () => {
  Object.keys(sections).forEach(key => {
    sections[key].style.display = "none";
    sections[key].classList.remove("show");
  });

  sections.profile.style.display = "flex";
  sections.profile.classList.add("show");
  navButtons.profile.classList.add("active");

  // Check URL hash for initial section
  const hash = window.location.hash.substring(1);
  if (hash) {
    goTo(hash);
  }

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      goTo(hash);
    }
    else {
      goTo("profile");
    }
  });
});

/* GO TO SECTION */
function goTo(target) {
  if (target === currentSection) return;

  // Hide current section
  sections[currentSection].classList.remove("show");
  sections[currentSection].style.display = "none";

  // Remove active nav
  navButtons[currentSection].classList.remove("active");

  // Show target section
  sections[target].style.display = "flex";

  // force reflow so animation works
  void sections[target].offsetWidth;

  sections[target].classList.add("show");

  // Set active nav
  navButtons[target].classList.add("active");

  currentSection = target;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

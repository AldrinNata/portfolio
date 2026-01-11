// BACK TO TOP BUTTON
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

// SECTION NAVIGATION
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

// NAVIGATION FUNCTION
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


// GLOBAL Image Viewer

let viewerImages = [];
let currentIndex = 0;

// OPEN VIEWER ON IMAGE CLICK
document.addEventListener("click", (e) => {
  const img = e.target.closest(".viewer-img");
  if (!img) return;

  openViewerFromImage(img);
});

function openViewerFromImage(img) {
  // Find the viewer group class (viewer-group-*)
  const groupClass = [...img.classList].find(c =>
    c.startsWith("viewer-group-")
  );

  if (!groupClass) return;

  // Collect all images in the same group
  viewerImages = Array.from(
    document.querySelectorAll(`.${groupClass}`)
  );

  // Determine index by ID
  currentIndex = viewerImages.findIndex(
    el => el.id === img.id
  );

  updateViewer();
  document.getElementById("imageViewer").style.display = "flex";

  document.body.classList.add("image-viewer-open");
}

// VIEWER CONTROLS

function closeViewer() {
  document.getElementById("imageViewer").style.display = "none";

  document.body.classList.remove("image-viewer-open");
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + viewerImages.length) % viewerImages.length;
  updateViewer();
}

function nextImage() {
  currentIndex =
    (currentIndex + 1) % viewerImages.length;
  updateViewer();
}

// UPDATE VIEWER CONTENT

function updateViewer() {
  const img = viewerImages[currentIndex];

  const viewerImg = document.getElementById("viewer-img");
  const viewerTitle = document.getElementById("viewer-title");
  const viewerDesc = document.getElementById("viewer-desc");
  const viewerCounter = document.getElementById("viewer-counter");

  viewerImg.style.opacity = 0;

  requestAnimationFrame(() => {
    viewerImg.src = img.src;
    viewerTitle.textContent = img.alt || "";
    viewerDesc.textContent = img.dataset.desc || "";
    viewerCounter.textContent =
      `${currentIndex + 1} of ${viewerImages.length}`;
    viewerImg.style.opacity = 1;
  });
}

// VIEWER OVERLAY CLICK TO CLOSE
document
  .querySelector(".viewer-overlay")
  .addEventListener("click", closeViewer);

// IMAGE CONTAINER OVERLAY FOR EXTRA IMAGES
document.querySelectorAll(".expImages, .projectImages").forEach(container => {
  const wrappers = Array.from(container.querySelectorAll(".img-wrapper"));
  const maxVisible = 4;
  const count = wrappers.length;

  container.classList.add(`has-${Math.min(count, 4)}`);

  if (count > maxVisible) {
    const extra = count - maxVisible;

    wrappers.slice(maxVisible).forEach(w => w.style.display = "none");

    const lastVisible = wrappers[maxVisible - 1];
    const overlay = document.createElement("div");

    overlay.className = "more-overlay";
    overlay.textContent = `+${extra}`;

    overlay.addEventListener("click", () => {
      lastVisible.querySelector("img").click();
    });

    lastVisible.appendChild(overlay);
  }
});

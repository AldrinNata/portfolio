// BACK TO TOP BUTTON
const topBtn = document.getElementById("btn-top");
let isScrollingToTop = false;

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 200);
});

window.addEventListener("scroll", () => {
  if (isScrollingToTop) return;

  if (window.scrollY < 150 && !window.location.hash) {
    setHomeActive();
  }
});

function topFunction() {
  isScrollingToTop = true;

  history.replaceState(null, "", window.location.pathname);

  setHomeActive();

  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    isScrollingToTop = false;
  }, 600);
}

function handleNav(event, targetId) {
  event.preventDefault();

  const targetSection = document.getElementById(targetId);
  if (!targetSection) return;

  targetSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  Object.values(navButtons).forEach(btn => btn.classList.remove("active"));
  if (navButtons[targetId]) navButtons[targetId].classList.add("active");

  history.pushState(null, "", `#${targetId}`);
}


// SECTION + NAV MAP
const sections = document.querySelectorAll(
  "#projects, #experience, #about, #contact"
);

const navButtons = {
  profile: document.getElementById("home-btn"),
  projects: document.getElementById("projects-btn"),
  experience: document.getElementById("experience-btn"),
  about: document.getElementById("about-btn"),
  contact: document.getElementById("contact-btn"),
  getInTouch: document.getElementById("get-in-touch")
};


function setHomeActive() {
  Object.values(navButtons).forEach(btn =>
    btn.classList.remove("active")
  );
  navButtons.profile.classList.add("active");
}


// SMOOTH SCROLL ON NAV CLICK (crawlable)
Object.entries(navButtons).forEach(([key, btn]) => {
  btn.addEventListener("click", e => handleNav(e, key === "profile" ? "profile" : key === "getInTouch" ? "contact" : key));
});


// ACTIVE NAV + SECTION ANIMATION ON SCROLL
const observer = new IntersectionObserver(
  entries => {
    if (isScrollingToTop) return;

    entries.forEach(entry => {
      const id = entry.target.id;

      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        Object.values(navButtons).forEach(btn =>
          btn.classList.remove("active")
        );
        navButtons[id]?.classList.add("active");

        history.replaceState(null, "", `#${id}`);
      }
    });
  },
  {
    threshold: 0.15
  }
);

// OBSERVE SECTIONS
sections.forEach(section => observer.observe(section));

// LOAD WITH HASH SUPPORT
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");

  if (!hash) {
    setHomeActive();
    return;
  }

  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
});

// Clear hash if scrolling to top manually
window.addEventListener('scroll', () => {
  if (window.scrollY === 0 && window.location.hash) {
    history.replaceState(null, '', ' ');
    setHomeActive();
  }
});



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

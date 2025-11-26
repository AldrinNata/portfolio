


let navBar = document.querySelector(".navBar");
let homeBtn = document.getElementById("home-btn");
let projectsBtn = document.getElementById("projects-btn");
let experienceBtn = document.getElementById("experience-btn");
let aboutBtn = document.getElementById("about-btn");
let contactBtn = document.getElementById("contact-btn");

let currentSection = "profile";
let previousSection = "profile";

function goTo(section) {
    navBar.classList.add("disabled");

    let experience = document.getElementById("experience");
    let about = document.getElementById("about");
    let projects = document.getElementById("projects");
    let contact = document.getElementById("contact");
    let profile = document.getElementById("profile");

    previousSection = currentSection;
    currentSection = section;
    changePage(currentSection);

    let previous = "";

    if(previousSection == "profile"){
        previous = profile;
    }
    else if(previousSection == "projects"){
        previous = projects;
    }
    else if(previousSection == "experience"){
        previous = experience;
    }
    else if(previousSection == "about"){
        previous = about;
    }
    else if(previousSection == "contact"){
        previous = contact;
    }

    if(currentSection == "profile") {
        previous.classList.add("profile");

        function onEnd(e) {
            if (e.propertyName === "opacity") {
                previous.style.display = "none";
                previous.classList.remove("show");
                profile.classList.remove("projects", "experience", "about", "contact");
                profile.style.display = "flex";

                void profile.offsetWidth;

                profile.classList.add("show");
                
                previous.removeEventListener("transitionend", onEnd);
                navBar.classList.remove("disabled");
            }
        }
        previous.addEventListener("transitionend", onEnd);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else if(currentSection == "projects") {
        previous.classList.add("projects");

        function onEnd(e) {
            if (e.propertyName === "opacity") {
                previous.style.display = "none";
                previous.classList.remove("show");
                projects.classList.remove("profile", "experience", "about", "contact");
                projects.style.display = "flex";

                void projects.offsetWidth;

                projects.classList.add("show");
                
                previous.removeEventListener("transitionend", onEnd);
                navBar.classList.remove("disabled");
            }
        }
        previous.addEventListener("transitionend", onEnd);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else if(currentSection == "experience") {
        previous.classList.add("experience");

        function onEnd(e) {
            if (e.propertyName === "opacity") {
                previous.style.display = "none";
                previous.classList.remove("show");
                experience.classList.remove("profile", "projects", "about", "contact");
                experience.style.display = "flex";

                void experience.offsetWidth;

                experience.classList.add("show");

                previous.removeEventListener("transitionend", onEnd);
                navBar.classList.remove("disabled");
            }
        }
        previous.addEventListener("transitionend", onEnd);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else if(currentSection == "about") {
        previous.classList.add("about");

        function onEnd(e) {
            if (e.propertyName === "opacity") {
                previous.style.display = "none";
                previous.classList.remove("show");
                about.classList.remove("profile", "projects", "experience", "contact");
                about.style.display = "flex";

                void about.offsetWidth;

                about.classList.add("show");

                previous.removeEventListener("transitionend", onEnd);
                navBar.classList.remove("disabled");
            }
        }
        previous.addEventListener("transitionend", onEnd);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else if(currentSection == "contact") {
        previous.classList.add("contact");

        function onEnd(e) {
            if (e.propertyName === "opacity") {
                previous.style.display = "none";
                previous.classList.remove("show");
                contact.classList.remove("profile", "projects", "experience", "about");
                contact.style.display = "flex";

                void contact.offsetWidth;

                contact.classList.add("show");

                previous.removeEventListener("transitionend", onEnd);
                navBar.classList.remove("disabled");
            }
        }
        previous.addEventListener("transitionend", onEnd);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let experience = document.getElementById("experience");
    let about = document.getElementById("about");
    let projects = document.getElementById("projects");
    let contact = document.getElementById("contact");
    let profile = document.getElementById("profile");
    
    profile.classList.add("show");
    homeBtn.classList.add("active");
    about.style.display = "none";
    contact.style.display = "none";
    experience.style.display = "none";
    projects.style.display = "none";
});

function changePage(selectedpage) {
    if(selectedpage == "profile") {
        homeBtn.classList.add("active");
        removeActive(previousSection);
    }
    else if(selectedpage == "projects") {
        projectsBtn.classList.add("active");
        removeActive(previousSection);
    }
    else if(selectedpage == "experience") {
        experienceBtn.classList.add("active");
        removeActive(previousSection);
    }
    else if(selectedpage == "about") {
        aboutBtn.classList.add("active");
        removeActive(previousSection);
    }
    else if(selectedpage == "contact") {
        contactBtn.classList.add("active");
        removeActive(previousSection);
    }
}

function removeActive(previousSection) {
    if(previousSection != currentSection) {
        if(previousSection == "profile") {
            homeBtn.classList.add("removeLine");
            function onEnd(e) {
                if (e.propertyName === "width") {
                    homeBtn.classList.remove("active");  
                    homeBtn.classList.remove("removeLine"); 
                    homeBtn.removeEventListener("transitionend", onEnd);
                }
            }
            homeBtn.addEventListener("transitionend", onEnd);
        }
        else if(previousSection == "projects") {
            if(previousSection == "projects") {
                projectsBtn.classList.add("removeLine");
                function onEnd(e) {
                    if (e.propertyName === "width") {
                        projectsBtn.classList.remove("active");  
                        projectsBtn.classList.remove("removeLine"); 
                        projectsBtn.removeEventListener("transitionend", onEnd);
                    }
                }
                projectsBtn.addEventListener("transitionend", onEnd);
            }
        }
        else if(previousSection == "experience") {
            if(previousSection == "experience") {
                experienceBtn.classList.add("removeLine");
                function onEnd(e) {
                    if (e.propertyName === "width") {
                        experienceBtn.classList.remove("active");  
                        experienceBtn.classList.remove("removeLine"); 
                        experienceBtn.removeEventListener("transitionend", onEnd);
                    }
                }
                experienceBtn.addEventListener("transitionend", onEnd);
            }
        }
        else if(previousSection == "about") {
            if(previousSection == "about") {
                aboutBtn.classList.add("removeLine");
                function onEnd(e) {
                    if (e.propertyName === "width") {
                        aboutBtn.classList.remove("active");  
                        aboutBtn.classList.remove("removeLine"); 
                        aboutBtn.removeEventListener("transitionend", onEnd);
                    }
                }
                aboutBtn.addEventListener("transitionend", onEnd);
            }
        }
        else if(previousSection == "contact") {
            if(previousSection == "contact") {
                contactBtn.classList.add("removeLine");
                function onEnd(e) {
                    if (e.propertyName === "width") {
                        contactBtn.classList.remove("active");  
                        contactBtn.classList.remove("removeLine"); 
                        contactBtn.removeEventListener("transitionend", onEnd);
                    }
                }
                contactBtn.addEventListener("transitionend", onEnd);
            }
        }
    }
}
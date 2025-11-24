// Top button
let mybutton = document.getElementById("btn-top");
let experience = document.getElementById("experience");
let skills = document.getElementById("skills");
let about = document.getElementById("about");
let projects = document.getElementById("projects");
let certifications = document.getElementById("certifications");
let contact = document.getElementById("contact");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.classList.add("show");
	}
	else {
		mybutton.classList.remove("show");
	}
}

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function goHome() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function goExperience() {
    window.scrollTo({
        top: experience.offsetTop,
        behavior: 'smooth'
    });
}

function goSkills() {
    window.scrollTo({
        top: skills.offsetTop,
        behavior: 'smooth'
    });
}

function goAbout() {
    window.scrollTo({
        top: about.offsetTop,
        behavior: 'smooth'
    });
}

function goProjects() {
    window.scrollTo({
        top: projects.offsetTop,
        behavior: 'smooth'
    });
}

function goCertifications() {
    window.scrollTo({
        top: certifications.offsetTop,
        behavior: 'smooth'
    });
}

function goContact() {
    window.scrollTo({
        top: contact.offsetTop,
        behavior: 'smooth'
    });
}

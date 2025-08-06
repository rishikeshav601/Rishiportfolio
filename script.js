// script.js

function toggleMenu() {
    const navUl = document.querySelector("nav ul");
    navUl.classList.toggle("active");
}

document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        // Allow external links to work
        if (href && href.startsWith("http")) return;

        e.preventDefault();
        const navUl = document.querySelector("nav ul");
        if (navUl.classList.contains("active")) {
            navUl.classList.remove("active");
        }

        const targetSection = document.querySelector(href);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

document.querySelectorAll("section").forEach((section) =>
    section.classList.add("animated")
);

function revealOnScroll() {
    document.querySelectorAll(".animated").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 70) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

document.querySelector(".back-to-top").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

function animateFollower() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    follower.style.left = posX + "px";
    follower.style.top = posY + "px";
    requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelector(".contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const firstName = form.querySelector('input[name="firstName"]').value.trim();
    const lastName = form.querySelector('input[name="lastName"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    const agreement = form.querySelector("#agreement").checked;

    const errors = [];
    if (!firstName.match(/^[a-zA-Z]{2,}$/)) {
        errors.push("Please enter a valid first name (at least 2 alphabets).\n");
    }
    if (!lastName.match(/^[a-zA-Z]{2,}$/)) {
        errors.push("Please enter a valid last name (at least 2 alphabets).\n");
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push("Please enter a valid email address.\n");
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        errors.push("Phone number must be exactly 10 digits.\n");
    }
    if (message.length < 5) {
        errors.push("Message must be at least 5 characters.\n");
    }
    if (!agreement) {
        errors.push("You must agree to the Terms of Service and Privacy Policy.\n");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    const params = {
        firstName,
        lastName,
        email,
        phone,
        message,
    };

    emailjs
        .send("service_h9lw09f", "template_6yc5fed", params)
        .then(() => {
            alert("Thanks for your message!");
            form.reset();
        })
        .catch((error) => {
            console.error("EmailJS error:", error);
            alert("Failed to send message. Please try again later or contact directly via phone or email.");
        });
});

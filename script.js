// Toggle mobile navigation menu
function toggleMenu() {
    const navUl = document.querySelector("nav ul");
    navUl.classList.toggle("active");
}

// Close menu when clicking on any nav link (for mobile)
document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
        const navUl = document.querySelector("nav ul");
        if (navUl.classList.contains("active")) {
            navUl.classList.remove("active");
        }
    });
});

// Scroll-triggered animations for sections and headings
document.querySelectorAll("section").forEach((section) =>
    section.classList.add("animated")
);

function revealOnScroll() {
    document.querySelectorAll(".animated").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 70) {
            el.classList.add("visible");
            if (el.querySelector("h2")) {
                el.classList.add("visible");
            }
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Back to top button functionality
document.querySelector(".back-to-top").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Custom cursor
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
let posX = 0,
    posY = 0; // Current position of follower
let mouseX = 0,
    mouseY = 0; // Mouse position

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

// Contact form validation and EmailJS integration
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
        errors.push("Please enter a valid first name (at least 2 alphabets).");
    }
    if (!lastName.match(/^[a-zA-Z]{2,}$/)) {
        errors.push("Please enter a valid last name (at least 2 alphabets).");
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push("Please enter a valid email address.");
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        errors.push("Phone number must be exactly 10 digits.");
    }
    if (message.length < 5) {
        errors.push("Message must be at least 5 characters.");
    }
    if (!agreement) {
        errors.push("You must agree to the Terms of Service and Privacy Policy.");
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
        .send("service_h9lw09f", "template_6yc5fed", params) // Replace service and template IDs as needed
        .then(() => {
            alert("Thanks for your message!");
            form.reset();
        })
        .catch((error) => {
            console.error("EmailJS error:", error);
            alert(
                "Failed to send message. Please try again later or contact directly via phone or email."
            );
        });
});

const roles = [
  "Full-Stack Developer",
  "Photographer"
  
];

let i = 0, j = 0, isDeleting = false;

function type() {
  const current = roles[i % roles.length];
  const typed = document.getElementById("typed-text");

  if (isDeleting) {
    j--;
  } else {
    j++;
  }

  typed.textContent = current.substring(0, j);

  if (!isDeleting && j === current.length) {
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i++;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 60 : 120);
  }
}

type();

document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark");

  const themeIcon = document.querySelector(".theme-toggle i");
  if (body.classList.contains("dark")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
}


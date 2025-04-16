// DOM Elements
const preloader = document.querySelector(".preloader");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");
const backToTopButton = document.getElementById("back-to-top");
const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const closeModal = document.querySelector(".close-modal");
const modalBtn = document.querySelector(".modal-btn");
const downloadCV = document.getElementById("download-cv");

// Preloader
window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.classList.add("hide-preloader");
    }, 500);
});

// Mobile Navigation
burger.addEventListener("click", () => {
    // Toggle Nav
    navLinks.classList.toggle("active");
    
    // Burger Animation
    burger.classList.toggle("toggle");
    
    // Animate Links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        burger.classList.remove("toggle");
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Close mobile menu after clicking a link
        navLinks.classList.remove("active");
        burger.classList.remove("toggle");
    });
});

// Active Navigation on Scroll
const sections = document.querySelectorAll("section");
const navLinksArray = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === current) {
            link.classList.add("active");
        }
    });
});

// Back to Top Button
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = "flex";
        backToTopButton.style.opacity = "1";
    } else {
        backToTopButton.style.opacity = "0";
        setTimeout(() => {
            backToTopButton.style.display = "none";
        }, 300);
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Form Validation and Submission
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll(".error-message").forEach(error => {
        error.textContent = "";
    });

    // Get form data
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);

    // Validate form data
    let isValid = true;
    const errors = {};

    // Name validation
    if (formProps.name.length < 2) {
        errors.name = "Name must be at least 2 characters long";
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formProps.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
    }

    // Subject validation
    if (formProps.subject.length < 3) {
        errors.subject = "Subject must be at least 3 characters long";
        isValid = false;
    }

    // Message validation
    if (formProps.message.length < 10) {
        errors.message = "Message must be at least 10 characters long";
        isValid = false;
    }

    // Display errors if any
    if (!isValid) {
        for (const [key, value] of Object.entries(errors)) {
            document.getElementById(`${key}-error`).textContent = value;
        }
        return;
    }

    // Form submission simulation
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success modal
        successModal.style.display = "block";
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        document.getElementById("form-response").innerHTML = 
            `<p class="error">Sorry, there was an error. Please try again later.</p>`;
    }
});

// Modal Controls
function closeModalHandler() {
    successModal.style.display = "none";
}

closeModal.addEventListener("click", closeModalHandler);
modalBtn.addEventListener("click", closeModalHandler);

window.addEventListener("click", (e) => {
    if (e.target === successModal) {
        closeModalHandler();
    }
});

// Download CV functionality
downloadCV.addEventListener("click", (e) => {
    e.preventDefault();
    // Replace with actual CV file path
    const cvPath = "path/to/your/cv.pdf";
    window.open(cvPath, "_blank");
});

// Add animation on scroll
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        }
    });
}, observerOptions);

document.querySelectorAll(".animate-text, .skill-item, .project-card, .achievement-card").forEach(element => {
    observer.observe(element);
});

// Skill progress animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const targetWidth = progress.style.width;
            progress.style.width = "0";
            setTimeout(() => {
                progress.style.width = targetWidth;
            }, 100);
        }
    });
}, observerOptions);

document.querySelectorAll(".skill-progress").forEach(progress => {
    skillObserver.observe(progress);
});
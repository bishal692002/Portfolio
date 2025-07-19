// DOM Elements
const preloader = document.querySelector(".preloader");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");
const backToTopButton = document.getElementById("back-to-top");
const downloadCV = document.getElementById("download-cv");
const header = document.querySelector("header");

// Enhanced Header Scroll Effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Magnetic Effect for Buttons
document.querySelectorAll('.btn, .project-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });
});

// Cursor Trail Effect
const cursor = document.createElement('div');
cursor.className = 'cursor-trail';
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Floating Animation for Contact Items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    item.style.animation = `float 3s ease-in-out infinite`;
});

const floatKeyframes = document.createElement('style');
floatKeyframes.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(floatKeyframes);

// Text Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'revealText 1s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('h2, h3, p').forEach(text => {
    textRevealObserver.observe(text);
});

const revealStyle = document.createElement('style');
revealStyle.textContent = `
    @keyframes revealText {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(revealStyle);

// Counter Animation for About Section
const animateCounter = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const start = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = target * easeOutQuart;
        
        // Format based on target value
        if (target === 8.84) {
            element.textContent = current.toFixed(2);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = target % 1 === 0 ? target : target.toFixed(2);
        }
    };
    
    requestAnimationFrame(animate);
};

// Observe counter elements
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Enhanced particle effects for achievements
const createParticleEffect = (element) => {
    const rect = element.getBoundingClientRect();
    const particle = document.createElement('div');
    
    particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        animation: particleBurst 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
};

const particleBurstStyle = document.createElement('style');
particleBurstStyle.textContent = `
    @keyframes particleBurst {
        0% { transform: scale(0) translate(0, 0); opacity: 1; }
        100% { 
            transform: scale(1) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(particleBurstStyle);

document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        createParticleEffect(card);
    });
});

// Timeline animation on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInTimeline 0.8s ease-out forwards';
        }
    });
}, {
    threshold: 0.3
});

const timelineAnimationStyle = document.createElement('style');
timelineAnimationStyle.textContent = `
    @keyframes slideInTimeline {
        0% { opacity: 0; transform: translateX(-50px); }
        100% { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(timelineAnimationStyle);

document.querySelectorAll('.timeline-card').forEach(card => {
    timelineObserver.observe(card);
});

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

// Update the CV download functionality
downloadCV.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Google Drive file URL and ID
    const fileId = '1i5JrOcjsrEpBj9tZJh0zxnqbE4vEivUv';
    
    // Direct Google Drive viewing URL
    const viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    
    // Open CV in new tab
    window.open(viewUrl, '_blank');
});

// Combine observers
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-progress')) {
                // Skill progress animation
                const progress = entry.target;
                const targetWidth = progress.style.width;
                progress.style.width = "0";
                setTimeout(() => {
                    progress.style.width = targetWidth;
                }, 100);
            } else {
                // Regular animation
                entry.target.classList.add("animate");
            }
        }
    });
}, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
});

document.querySelectorAll(".animate-text, .skill-item, .project-card, .achievement-card, .skill-progress").forEach(element => {
    observer.observe(element);
});

// Enhanced Interactive Project Cards Animation
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate rotation based on mouse position relative to card center
        const rotateX = (mouseY - cardCenterY) / rect.height * -20; // Max 20 degrees
        const rotateY = (mouseX - cardCenterX) / rect.width * 20;   // Max 20 degrees
        
        // Calculate translation for subtle following effect
        const translateX = (mouseX - cardCenterX) / rect.width * 10;  // Max 10px
        const translateY = (mouseY - cardCenterY) / rect.height * 10; // Max 10px
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateX(${translateX}px)
            translateY(${translateY - 20}px)
            scale(1.05)
        `;
        
        // Add glow effect based on mouse position
        const intensity = Math.sqrt(
            Math.pow((mouseX - cardCenterX) / rect.width, 2) + 
            Math.pow((mouseY - cardCenterY) / rect.height, 2)
        );
        
        const glowIntensity = Math.max(0, 1 - intensity * 2);
        card.style.boxShadow = `
            0 25px 80px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 0 ${50 * glowIntensity}px rgba(255, 255, 255, ${0.1 * glowIntensity})
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `
            perspective(1000px) 
            rotateX(0deg) 
            rotateY(0deg) 
            translateX(0px)
            translateY(0px)
            scale(1)
        `;
        
        card.style.boxShadow = `
            0 10px 40px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1)
        `;
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
    });
});
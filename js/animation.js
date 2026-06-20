document.addEventListener("DOMContentLoaded", () => {
    // Fade-in Page
    document.body.classList.add("fade-in");

    // Hamburger Mobile Menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    // Scroll Sticky Header
    const header = document.querySelector("header");
    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver Scroll Reveals
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });
        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        const revealOnScrollFallback = () => {
            const triggerBottom = window.innerHeight * 0.85;
            revealElements.forEach(element => {
                const boxTop = element.getBoundingClientRect().top;
                if (boxTop < triggerBottom) {
                    element.classList.add("active");
                }
            });
        };
        revealOnScrollFallback();
        window.addEventListener("scroll", revealOnScrollFallback, { passive: true });
    }

    // Counter animations for stats
    const counters = document.querySelectorAll(".counter");
    const statsSection = document.querySelector(".stats");
    if (counters.length > 0 && statsSection) {
        const animateCounters = () => {
            counters.forEach(counter => {
                const targetText = counter.innerText.trim();
                const targetValue = parseInt(targetText.replace(/\D/g, ""), 10);
                const hasPlus = targetText.includes("+");
                const hasPercent = targetText.includes("%");
                
                let current = 0;
                const duration = 2000;
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    current = Math.floor(easeProgress * targetValue);

                    let suffix = "";
                    if (hasPlus) suffix = "+";
                    if (hasPercent) suffix = "%";

                    counter.innerText = current + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = targetValue + suffix;
                    }
                };
                requestAnimationFrame(updateCount);
            });
        };

        if ("IntersectionObserver" in window) {
            const statsObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            statsObserver.observe(statsSection);
        } else {
            let counterStarted = false;
            const statsScrollFallback = () => {
                const rect = statsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && !counterStarted) {
                    counterStarted = true;
                    animateCounters();
                    window.removeEventListener("scroll", statsScrollFallback);
                }
            };
            window.addEventListener("scroll", statsScrollFallback, { passive: true });
            statsScrollFallback();
        }
    }

    // spotlight cursor variables
    const cards = document.querySelectorAll(".card, .stat-card, .timeline-item");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
    });

    // Navigation highlight
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Native Lazy Load mapping
    const images = document.querySelectorAll("img");
    images.forEach(image => {
        image.setAttribute("loading", "lazy");
    });

    // Button Click Ripple
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("click", function(e) {
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Form Submit handling Mock
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = "linear-gradient(90deg, #10b981, #059669)";
                contactForm.querySelectorAll("input, textarea").forEach(field => field.value = "");
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = "";
                }, 3000);
            }, 1800);
        });
    }
});



document.getElementById("contactForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const formData = new FormData();

formData.append("entry.1355793474", document.getElementById("name").value);
formData.append("entry.1727741961", document.getElementById("email").value);
formData.append("entry.731265321", document.getElementById("phone").value);
formData.append("entry.698814800", document.getElementById("company").value);
formData.append("entry.1587147931", document.getElementById("subject").value);
formData.append("entry.2099508418", document.getElementById("message").value);

    try {

        await fetch(
            "https://docs.google.com/forms/d/e/1FAIpQLSevEFHB4Ajql6GeEyQFZrp2xwV7M-wlgmNs2DOh7QgnS5Zqpw/formResponse",
            {
                method: "POST",
                mode: "no-cors",
                body: formData
            }
        );

        document.getElementById("successMsg").innerHTML =
            "✅ Message sent successfully!";

        document.getElementById("contactForm").reset();

    } catch (error) {

        document.getElementById("successMsg").innerHTML =
            "❌ Unable to send message.";

    }

});


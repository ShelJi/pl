// ===============================
// PAGE LOADER
// ===============================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// ===============================
// HEADER SCROLL EFFECT
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const reveals = document.querySelectorAll(".reveal");

function revealElements() {

    reveals.forEach((element) => {

        const elementTop =
            element.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    revealElements
);

revealElements();

// ===============================
// ACTIVE NAVBAR LINK
// ===============================

const currentPage =
window.location.pathname.split("/").pop();

const navLinks =
document.querySelectorAll("nav a");

navLinks.forEach((link) => {

    const linkPage =
    link.getAttribute("href");

    if(linkPage === currentPage){

        link.classList.add("active");

    }

});

// ===============================
// FLOATING EFFECT
// ===============================

const floatingCards =
document.querySelectorAll(".card");

floatingCards.forEach((card,index)=>{

    card.style.animation =
    `floatAnimation 4s ease-in-out ${index * 0.2}s infinite`;

});

// ===============================
// BUTTON RIPPLE EFFECT
// ===============================

const buttons =
document.querySelectorAll(".btn");

buttons.forEach((button)=>{

    button.addEventListener("click",(e)=>{

        const ripple =
        document.createElement("span");

        ripple.classList.add("ripple");

        const rect =
        button.getBoundingClientRect();

        ripple.style.left =
        e.clientX - rect.left + "px";

        ripple.style.top =
        e.clientY - rect.top + "px";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

// ===============================
// SMOOTH FADE FOR PAGE
// ===============================

document.body.style.opacity = "0";

window.addEventListener("load",()=>{

    document.body.style.transition =
    "opacity 1s ease";

    document.body.style.opacity = "1";

});
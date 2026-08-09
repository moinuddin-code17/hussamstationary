/* =========================================================
   HUSSAM STATIONERY
   PREMIUM WEBSITE INTERACTIONS
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initHeaderScroll();
    initBackToTop();
    initScrollReveal();
    initSmoothLinks();
    initPageLoader();
    initButtonEffects();
    initImageProtection();

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (!menuToggle || !mobileMenu) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");


        menuToggle.classList.toggle(
            "active",
            isOpen
        );


        if (isOpen) {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });


    /* Close menu after clicking a link */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    /* Close when clicking outside */

    document.addEventListener("click", event => {

        if (
            mobileMenu.classList.contains("open") &&
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(".site-header");


    if (!header) {
        return;
    }


    let lastScroll = 0;


    function updateHeader() {

        const currentScroll =
            window.scrollY;


        if (currentScroll > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        /*
         Hide header while scrolling down.
         Show it again when scrolling up.
        */

        if (
            currentScroll > lastScroll &&
            currentScroll > 250
        ) {

            header.classList.add("header-hidden");

        } else {

            header.classList.remove("header-hidden");

        }


        lastScroll =
            Math.max(currentScroll, 0);

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");


    if (!button) {
        return;
    }


    function checkScroll() {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        checkScroll,
        { passive: true }
    );


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    checkScroll();

}


/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            "section:not(.service-hero):not(.gallery-hero), " +
            ".service-card, " +
            ".product-card, " +
            ".gallery-item, " +
            ".why-item"
        );


    if (!elements.length) {
        return;
    }


    /*
     Add reveal class
    */

    elements.forEach(element => {

        element.classList.add(
            "scroll-reveal"
        );

    });


    /*
     Intersection Observer
    */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   PAGE LOADER
   ========================================================= */

function initPageLoader() {

    /*
     Create a subtle page transition layer.
    */

    const loader =
        document.createElement("div");


    loader.className =
        "page-transition";


    loader.innerHTML = `
        <div class="page-transition-inner">
            <span>HUSSAM</span>
            <small>STATIONERY</small>
        </div>
    `;


    document.body.appendChild(loader);


    /*
     Hide loader after page loads.
    */

    requestAnimationFrame(() => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 150);

    });


    /*
     Smooth transition between pages.
    */

    const pageLinks =
        document.querySelectorAll(
            'a[href$=".html"]'
        );


    pageLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                /*
                 Ignore new tabs,
                 downloads and external links.
                */

                if (
                    !href ||
                    href.startsWith("#") ||
                    link.target === "_blank" ||
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey
                ) {

                    return;

                }


                event.preventDefault();


                loader.classList.remove(
                    "loaded"
                );


                setTimeout(() => {

                    window.location.href =
                        href;

                }, 350);

            }
        );

    });

}


/* =========================================================
   BUTTON MICRO INTERACTIONS
   ========================================================= */

function initButtonEffects() {

    const buttons =
        document.querySelectorAll(
            ".btn, .header-cta"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                button.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                button.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.removeProperty(
                    "--mouse-x"
                );

                button.style.removeProperty(
                    "--mouse-y"
                );

            }
        );

    });

}


/* =========================================================
   IMAGE LOADING
   ========================================================= */

function initImageProtection() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        /*
         Add loaded class after image loads.
        */

        if (image.complete) {

            image.classList.add(
                "image-loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "image-loaded"
                    );

                }
            );

        }

    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function setActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(
            ".main-nav a, .mobile-menu a"
        );


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .toLowerCase();


        if (
            linkPage === currentPage
        ) {

            link.classList.add(
                "active"
            );

        } else {

            link.classList.remove(
                "active"
            );

        }

    });

}


setActiveNavigation();


/* =========================================================
   PARALLAX HERO
   ========================================================= */

function initHeroParallax() {

    const heroes =
        document.querySelectorAll(
            ".hero, .service-hero, .gallery-hero"
        );


    if (!heroes.length) {
        return;
    }


    /*
     Disable on smaller screens
     for better performance.
    */

    if (
        window.matchMedia(
            "(max-width: 768px)"
        ).matches
    ) {

        return;

    }


    let ticking = false;


    function updateParallax() {

        const scroll =
            window.scrollY;


        heroes.forEach(hero => {

            const image =
                hero.querySelector(
                    "img"
                );


            if (!image) {
                return;
            }


            const rect =
                hero.getBoundingClientRect();


            if (
                rect.bottom < 0 ||
                rect.top > window.innerHeight
            ) {

                return;

            }


            const movement =
                scroll * 0.12;


            image.style.transform =
                `translateY(${movement}px) scale(1.03)`;

        });


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );

}


initHeroParallax();


/* =========================================================
   CARD TILT
   ========================================================= */

function initCardTilt() {

    /*
     Only use on desktop.
    */

    if (
        window.matchMedia(
            "(max-width: 900px)"
        ).matches
    ) {

        return;

    }


    const cards =
        document.querySelectorAll(
            ".service-card, .product-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2.5;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2.5;


                card.style.transform =
                    `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


initCardTilt();


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        /*
         Close mobile menu.
        */

        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        if (
            mobileMenu &&
            mobileMenu.classList.contains("open")
        ) {

            mobileMenu.classList.remove(
                "open"
            );


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }


        /*
         Close gallery lightbox.
        */

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        if (
            lightbox &&
            lightbox.classList.contains("active")
        ) {

            lightbox.classList.remove(
                "active"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =========================================================
   REDUCED MOTION ACCESSIBILITY
   ========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {

    document.documentElement.style
        .scrollBehavior = "auto";

}


/* =========================================================
   CONSOLE BRANDING
   ========================================================= */

console.log(
    "%c HUSSAM STATIONERY ",
    "background:#111;color:#fff;font-size:16px;font-weight:bold;padding:8px 14px;"
);

console.log(
    "%c Quality • Value • Service ",
    "color:#777;font-size:12px;"
);
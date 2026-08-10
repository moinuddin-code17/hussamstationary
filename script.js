/* ============================================================
   HUSSAM STATIONARY
   PREMIUM WEBSITE JAVASCRIPT
   Version 2.0
   ============================================================ */

"use strict";


/* ============================================================
   1. GLOBAL CONFIGURATION
   ============================================================ */

const HussamApp = {

    settings: {

        animationDuration: 700,

        scrollOffset: 90,

        revealThreshold: 0.12,

        mobileBreakpoint: 900,

        counterDuration: 1800,

        enableCursorEffects: true,

        enablePageTransitions: true,

        enableImageLightbox: true

    }

};


/* ============================================================
   2. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    HussamApp.init();

});


/* ============================================================
   3. MAIN INITIALIZATION
   ============================================================ */

HussamApp.init = function () {

    this.cacheElements();

    this.setupPageLoader();

    this.setupMobileNavigation();

    this.setupHeader();

    this.setupActiveNavigation();

    this.setupSmoothScrolling();

    this.setupScrollReveal();

    this.setupStaggeredAnimations();

    this.setupImageAnimations();

    this.setupGallery();

    this.setupBackToTop();

    this.setupRippleButtons();

    this.setupCounters();

    this.setupFAQ();

    this.setupForms();

    this.setupPageTransitions();

    this.setupKeyboardNavigation();

    this.setupLazyImages();

    this.setupParallax();

    this.setupHoverEffects();

    this.setupScrollProgress();

    this.setupAccessibility();

};


/* ============================================================
   4. CACHE ELEMENTS
   ============================================================ */

HussamApp.cacheElements = function () {

    this.elements = {

        body:
            document.body,

        header:
            document.querySelector(".site-header"),

        menuToggle:
            document.querySelector("#menuToggle"),

        mobileNav:
            document.querySelector("#mobileNav"),

        backToTop:
            document.querySelector("#backToTop"),

        progressBar:
            document.querySelector(".scroll-progress"),

        revealElements:
            document.querySelectorAll(
                ".reveal, .fade-up, .fade-in, .slide-up"
            ),

        galleryItems:
            document.querySelectorAll(".gallery-item"),

        images:
            document.querySelectorAll("img"),

        navLinks:
            document.querySelectorAll(
                ".desktop-nav a, .mobile-nav a"
            ),

        buttons:
            document.querySelectorAll(
                ".primary-button, .header-button, .secondary-button, button"
            ),

        counters:
            document.querySelectorAll("[data-counter]"),

        faqItems:
            document.querySelectorAll(".faq-item"),

        forms:
            document.querySelectorAll("form")

    };

};


/* ============================================================
   5. PAGE LOADER
   ============================================================ */

HussamApp.setupPageLoader = function () {

    const loader = document.querySelector(".page-loader");

    if (!loader) {

        this.createPageLoader();

        return;

    }

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 250);

    });

};


HussamApp.createPageLoader = function () {

    const loader = document.createElement("div");

    loader.className = "page-loader";

    loader.innerHTML = `

        <div class="loader-inner">

            <div class="loader-logo">

                <img
                    src="images/logo.png"
                    alt="Hussam Stationary"
                >

            </div>

            <div class="loader-line">

                <span></span>

            </div>

            <p>
                HUSSAM STATIONARY
            </p>

        </div>

    `;

    document.body.prepend(loader);

    requestAnimationFrame(() => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 350);

    });

};


/* ============================================================
   6. MOBILE NAVIGATION
   ============================================================ */

HussamApp.setupMobileNavigation = function () {

    const toggle = this.elements.menuToggle;

    const mobileNav = this.elements.mobileNav;

    if (!toggle || !mobileNav) {

        return;

    }


    toggle.setAttribute("aria-expanded", "false");


    toggle.addEventListener("click", () => {

        const isOpen =
            mobileNav.classList.toggle("open");

        toggle.classList.toggle("active", isOpen);

        toggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        if (isOpen) {

            document.body.classList.add(
                "mobile-menu-open"
            );

            this.animateMobileLinks(true);

        } else {

            document.body.classList.remove(
                "mobile-menu-open"
            );

            this.animateMobileLinks(false);

        }

    });


    const mobileLinks =
        mobileNav.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");

            toggle.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "mobile-menu-open"
            );

        });

    });


    document.addEventListener("click", event => {

        if (

            mobileNav.classList.contains("open") &&

            !mobileNav.contains(event.target) &&

            !toggle.contains(event.target)

        ) {

            mobileNav.classList.remove("open");

            toggle.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "mobile-menu-open"
            );

        }

    });

};


HussamApp.animateMobileLinks = function (open) {

    const links =
        this.elements.mobileNav?.querySelectorAll("a");


    if (!links) {

        return;

    }


    links.forEach((link, index) => {

        if (open) {

            link.style.transitionDelay =
                `${index * 70}ms`;

            link.classList.add("mobile-link-visible");

        } else {

            link.style.transitionDelay = "0ms";

            link.classList.remove(
                "mobile-link-visible"
            );

        }

    });

};


/* ============================================================
   7. HEADER SCROLL EFFECT
   ============================================================ */

HussamApp.setupHeader = function () {

    const header = this.elements.header;

    if (!header) {

        return;

    }


    let lastScroll = 0;

    const updateHeader = () => {

        const currentScroll =
            window.scrollY;


        if (currentScroll > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        if (

            currentScroll > 300 &&

            currentScroll > lastScroll

        ) {

            header.classList.add("header-hidden");

        } else {

            header.classList.remove("header-hidden");

        }


        lastScroll = currentScroll;

    };


    window.addEventListener(
        "scroll",
        this.throttle(updateHeader, 20),
        { passive: true }
    );


    updateHeader();

};


/* ============================================================
   8. ACTIVE NAVIGATION
   ============================================================ */

HussamApp.setupActiveNavigation = function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const page =
        currentPage === ""
            ? "index.html"
            : currentPage;


    this.elements.navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {

            return;

        }


        const cleanHref =
            href.split("#")[0]
                .split("?")[0]
                .toLowerCase();


        if (cleanHref === page) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

};


/* ============================================================
   9. SMOOTH SCROLLING
   ============================================================ */

HussamApp.setupSmoothScrolling = function () {

    document.addEventListener("click", event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) {

            return;

        }


        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (!target) {

            return;

        }


        event.preventDefault();


        const headerHeight =
            this.elements.header?.offsetHeight || 0;


        const targetPosition =
            target.getBoundingClientRect().top +

            window.scrollY -

            headerHeight -

            20;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

};


/* ============================================================
   10. SCROLL REVEAL
   ============================================================ */

HussamApp.setupScrollReveal = function () {

    const elements =
        document.querySelectorAll(
            `
            .reveal,
            .fade-up,
            .fade-in,
            .slide-up,
            .section-heading,
            .about-content,
            .about-image,
            .product-card,
            .service-card,
            .feature-card,
            .stat-card,
            .highlight-card,
            .cta-content
            `
        );


    if (!elements.length) {

        return;

    }


    elements.forEach(element => {

        element.classList.add(
            "scroll-hidden"
        );

    });


    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add(
                "scroll-visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    entry.target.classList.add(
                        "scroll-visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {

                threshold:
                    HussamApp.settings.revealThreshold,

                rootMargin:
                    "0px 0px -50px 0px"

            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

};


/* ============================================================
   11. STAGGERED CARD ANIMATIONS
   ============================================================ */

HussamApp.setupStaggeredAnimations = function () {

    const groups = [

        ".products-grid",

        ".services-grid",

        ".gallery-grid",

        ".features-grid",

        ".stats-grid",

        ".footer-grid"

    ];


    groups.forEach(selector => {

        const container =
            document.querySelector(selector);


        if (!container) {

            return;

        }


        const children =
            Array.from(container.children);


        children.forEach((child, index) => {

            child.style.setProperty(
                "--animation-delay",
                `${index * 90}ms`
            );

            child.classList.add(
                "stagger-item"
            );

        });

    });

};


/* ============================================================
   12. IMAGE ANIMATIONS
   ============================================================ */

HussamApp.setupImageAnimations = function () {

    this.elements.images.forEach(image => {

        image.addEventListener("load", () => {

            image.classList.add("image-loaded");

        });


        if (image.complete) {

            image.classList.add(
                "image-loaded"
            );

        }

    });

};


/* ============================================================
   13. GALLERY LIGHTBOX
   ============================================================ */

HussamApp.setupGallery = function () {

    if (
        !this.settings.enableImageLightbox
    ) {

        return;

    }


    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );


    if (!galleryImages.length) {

        return;

    }


    const lightbox =
        this.createLightbox();


    galleryImages.forEach((image, index) => {

        image.style.cursor = "zoom-in";


        image.addEventListener("click", () => {

            lightbox.open(
                image,
                index,
                galleryImages
            );

        });

    });

};


HussamApp.createLightbox = function () {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "premium-lightbox";


    wrapper.innerHTML = `

        <button
            class="lightbox-close"
            aria-label="Close image">

            <i class="fa-solid fa-xmark"></i>

        </button>


        <button
            class="lightbox-prev"
            aria-label="Previous image">

            <i class="fa-solid fa-chevron-left"></i>

        </button>


        <div class="lightbox-content">

            <img
                class="lightbox-image"
                alt=""
            >

            <div class="lightbox-caption"></div>

        </div>


        <button
            class="lightbox-next"
            aria-label="Next image">

            <i class="fa-solid fa-chevron-right"></i>

        </button>

    `;


    document.body.appendChild(wrapper);


    const image =
        wrapper.querySelector(
            ".lightbox-image"
        );


    const caption =
        wrapper.querySelector(
            ".lightbox-caption"
        );


    const close =
        wrapper.querySelector(
            ".lightbox-close"
        );


    const previous =
        wrapper.querySelector(
            ".lightbox-prev"
        );


    const next =
        wrapper.querySelector(
            ".lightbox-next"
        );


    let currentIndex = 0;

    let images = [];


    const showImage = index => {

        if (!images.length) {

            return;

        }


        currentIndex =
            (index + images.length) %
            images.length;


        const selected =
            images[currentIndex];


        image.src =
            selected.src;


        image.alt =
            selected.alt || "";


        caption.textContent =
            selected.alt || "";


        wrapper.classList.add(
            "lightbox-visible"
        );


        document.body.classList.add(
            "lightbox-open"
        );

    };


    const closeLightbox = () => {

        wrapper.classList.remove(
            "lightbox-visible"
        );


        document.body.classList.remove(
            "lightbox-open"
        );

    };


    close.addEventListener(
        "click",
        closeLightbox
    );


    previous.addEventListener(
        "click",
        () => showImage(currentIndex - 1)
    );


    next.addEventListener(
        "click",
        () => showImage(currentIndex + 1)
    );


    wrapper.addEventListener(
        "click",
        event => {

            if (
                event.target === wrapper
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                !wrapper.classList.contains(
                    "lightbox-visible"
                )
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                showImage(
                    currentIndex - 1
                );

            }


            if (event.key === "ArrowRight") {

                showImage(
                    currentIndex + 1
                );

            }

        }
    );


    return {

        open(selected, index, collection) {

            images =
                Array.from(collection);

            showImage(index);

        }

    };

};


/* ============================================================
   14. BACK TO TOP
   ============================================================ */

HussamApp.setupBackToTop = function () {

    const button =
        this.elements.backToTop;


    if (!button) {

        return;

    }


    const updateButton = () => {

        if (window.scrollY > 600) {

            button.classList.add("visible");

        } else {

            button.classList.remove("visible");

        }

    };


    window.addEventListener(
        "scroll",
        this.throttle(updateButton, 30),
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    updateButton();

};


/* ============================================================
   15. RIPPLE BUTTON EFFECT
   ============================================================ */

HussamApp.setupRippleButtons = function () {

    this.elements.buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");


                ripple.className =
                    "button-ripple";


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                const x =
                    event.clientX -
                    rect.left -
                    size / 2;


                const y =
                    event.clientY -
                    rect.top -
                    size / 2;


                ripple.style.width =
                    `${size}px`;


                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${x}px`;


                ripple.style.top =
                    `${y}px`;


                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });

};


/* ============================================================
   16. COUNTER ANIMATION
   ============================================================ */

HussamApp.setupCounters = function () {

    const counters =
        this.elements.counters;


    if (!counters.length) {

        return;

    }


    const animateCounter = element => {

        const target =
            parseFloat(
                element.dataset.counter
            );


        if (Number.isNaN(target)) {

            return;

        }


        const duration =
            HussamApp.settings.counterDuration;


        const startTime =
            performance.now();


        const update = currentTime => {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    4
                );


            const value =
                target * eased;


            element.textContent =
                Number.isInteger(target)
                    ? Math.floor(value)
                    : value.toFixed(1);


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    Number.isInteger(target)
                        ? target
                        : target.toFixed(1);

            }

        };


        requestAnimationFrame(update);

    };


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(animateCounter);

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    animateCounter(
                        entry.target
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

};


/* ============================================================
   17. FAQ ACCORDION
   ============================================================ */

HussamApp.setupFAQ = function () {

    const items =
        this.elements.faqItems;


    if (!items.length) {

        return;

    }


    items.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        const answer =
            item.querySelector(
                ".faq-answer"
            );


        if (!question || !answer) {

            return;

        }


        question.setAttribute(
            "aria-expanded",
            "false"
        );


        question.addEventListener(
            "click",
            () => {

                const isOpen =
                    item.classList.contains(
                        "open"
                    );


                items.forEach(other => {

                    other.classList.remove(
                        "open"
                    );


                    const otherQuestion =
                        other.querySelector(
                            ".faq-question"
                        );


                    if (otherQuestion) {

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                });


                if (!isOpen) {

                    item.classList.add(
                        "open"
                    );


                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });

};


/* ============================================================
   18. FORM VALIDATION
   ============================================================ */

HussamApp.setupForms = function () {

    this.elements.forms.forEach(form => {

        form.addEventListener(
            "submit",
            event => {

                const requiredFields =
                    form.querySelectorAll(
                        "[required]"
                    );


                let valid = true;


                requiredFields.forEach(field => {

                    const value =
                        field.value.trim();


                    if (!value) {

                        valid = false;

                        field.classList.add(
                            "input-error"
                        );

                    } else {

                        field.classList.remove(
                            "input-error"
                        );

                    }

                });


                if (!valid) {

                    event.preventDefault();

                    this.showNotification(
                        "Please fill in all required fields.",
                        "error"
                    );

                    return;

                }


                const email =
                    form.querySelector(
                        'input[type="email"]'
                    );


                if (email && email.value) {

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailPattern.test(
                            email.value
                        )
                    ) {

                        event.preventDefault();

                        email.classList.add(
                            "input-error"
                        );


                        this.showNotification(
                            "Please enter a valid email address.",
                            "error"
                        );

                    }

                }

            }
        );

    });

};


/* ============================================================
   19. NOTIFICATION SYSTEM
   ============================================================ */

HussamApp.showNotification = function (
    message,
    type = "success"
) {

    let container =
        document.querySelector(
            ".notification-container"
        );


    if (!container) {

        container =
            document.createElement("div");


        container.className =
            "notification-container";


        document.body.appendChild(
            container
        );

    }


    const notification =
        document.createElement("div");


    notification.className =
        `premium-notification ${type}`;


    notification.innerHTML = `

        <div class="notification-icon">

            <i class="fa-solid ${
                type === "error"
                    ? "fa-circle-exclamation"
                    : "fa-circle-check"
            }"></i>

        </div>

        <div class="notification-message">

            ${this.escapeHTML(message)}

        </div>

        <button
            class="notification-close"
            aria-label="Close notification">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    container.appendChild(
        notification
    );


    requestAnimationFrame(() => {

        notification.classList.add(
            "show"
        );

    });


    const close =
        notification.querySelector(
            ".notification-close"
        );


    close.addEventListener(
        "click",
        () => {

            this.removeNotification(
                notification
            );

        }
    );


    setTimeout(() => {

        this.removeNotification(
            notification
        );

    }, 5000);

};


HussamApp.removeNotification = function (
    notification
) {

    notification.classList.remove(
        "show"
    );


    setTimeout(() => {

        notification.remove();

    }, 400);

};


/* ============================================================
   20. PAGE TRANSITIONS
   ============================================================ */

HussamApp.setupPageTransitions = function () {

    if (
        !this.settings.enablePageTransitions
    ) {

        return;

    }


    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    "a"
                );


            if (!link) {

                return;

            }


            const href =
                link.getAttribute("href");


            if (!href) {

                return;

            }


            if (

                href.startsWith("#") ||

                href.startsWith("mailto:") ||

                href.startsWith("tel:") ||

                href.startsWith("javascript:")

            ) {

                return;

            }


            if (
                link.target === "_blank"
            ) {

                return;

            }


            if (
                link.hostname &&
                link.hostname !==
                    window.location.hostname
            ) {

                return;

            }


            if (
                href.includes(".pdf")
            ) {

                return;

            }


            event.preventDefault();


            document.body.classList.add(
                "page-leaving"
            );


            setTimeout(() => {

                window.location.href =
                    href;

            }, 250);

        }
    );

};


/* ============================================================
   21. KEYBOARD NAVIGATION
   ============================================================ */

HussamApp.setupKeyboardNavigation = function () {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                const mobileNav =
                    this.elements.mobileNav;


                const menuToggle =
                    this.elements.menuToggle;


                if (mobileNav) {

                    mobileNav.classList.remove(
                        "open"
                    );

                }


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                document.body.classList.remove(
                    "mobile-menu-open"
                );

            }

        }
    );

};


/* ============================================================
   22. LAZY IMAGE LOADING
   ============================================================ */

HussamApp.setupLazyImages = function () {

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );


    if (!images.length) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        images.forEach(image => {

            image.src =
                image.dataset.src;

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {

                        return;

                    }


                    const image =
                        entry.target;


                    image.src =
                        image.dataset.src;


                    image.removeAttribute(
                        "data-src"
                    );


                    observer.unobserve(
                        image
                    );

                });

            },
            {
                rootMargin: "100px"
            }
        );


    images.forEach(image => {

        observer.observe(image);

    });

};


/* ============================================================
   23. PARALLAX EFFECT
   ============================================================ */

HussamApp.setupParallax = function () {

    const elements =
        document.querySelectorAll(
            "[data-parallax]"
        );


    if (!elements.length) {

        return;

    }


    const updateParallax = () => {

        const scrollY =
            window.scrollY;


        elements.forEach(element => {

            const speed =
                parseFloat(
                    element.dataset.parallax
                ) || 0.15;


            const rect =
                element.getBoundingClientRect();


            const center =
                rect.top +
                rect.height / 2;


            const viewportCenter =
                window.innerHeight / 2;


            const distance =
                center -
                viewportCenter;


            const movement =
                distance * speed;


            element.style.transform =
                `translate3d(0, ${movement}px, 0)`;

        });

    };


    window.addEventListener(
        "scroll",
        this.throttle(
            updateParallax,
            20
        ),
        { passive: true }
    );


    updateParallax();

};


/* ============================================================
   24. PREMIUM HOVER EFFECTS
   ============================================================ */

HussamApp.setupHoverEffects = function () {

    const cards =
        document.querySelectorAll(
            `
            .product-card,
            .service-card,
            .feature-card,
            .gallery-item,
            .stat-card
            `
        );


    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "premium-hover"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "premium-hover"
                );

            }
        );

    });


    const magneticButtons =
        document.querySelectorAll(
            "[data-magnetic]"
        );


    magneticButtons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

};


/* ============================================================
   25. SCROLL PROGRESS
   ============================================================ */

HussamApp.setupScrollProgress = function () {

    let bar =
        document.querySelector(
            ".scroll-progress"
        );


    if (!bar) {

        bar =
            document.createElement("div");


        bar.className =
            "scroll-progress";


        document.body.appendChild(
            bar
        );

    }


    const updateProgress = () => {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            bar.style.width = "0%";

            return;

        }


        const percentage =
            (scrollTop /
                documentHeight) *
            100;


        bar.style.width =
            `${Math.min(100, percentage)}%`;

    };


    window.addEventListener(
        "scroll",
        this.throttle(
            updateProgress,
            20
        ),
        { passive: true }
    );


    updateProgress();

};


/* ============================================================
   26. ACCESSIBILITY
   ============================================================ */

HussamApp.setupAccessibility = function () {

    document.querySelectorAll(
        "a, button"
    ).forEach(element => {

        element.addEventListener(
            "focus",
            () => {

                element.classList.add(
                    "keyboard-focus"
                );

            }
        );


        element.addEventListener(
            "blur",
            () => {

                element.classList.remove(
                    "keyboard-focus"
                );

            }
        );

    });


    document.querySelectorAll(
        "img"
    ).forEach(image => {

        if (!image.alt) {

            image.setAttribute(
                "alt",
                "Hussam Stationary product"
            );

        }

    });

};


/* ============================================================
   27. CURSOR EFFECT
   ============================================================ */

HussamApp.setupCursorEffect = function () {

    if (
        !this.settings.enableCursorEffects
    ) {

        return;

    }


    if (
        window.matchMedia(
            "(max-width: 900px)"
        ).matches
    ) {

        return;

    }


    const cursor =
        document.createElement("div");


    cursor.className =
        "premium-cursor";


    document.body.appendChild(
        cursor
    );


    const follower =
        document.createElement("div");


    follower.className =
        "premium-cursor-follower";


    document.body.appendChild(
        follower
    );


    let mouseX = 0;

    let mouseY = 0;

    let followerX = 0;

    let followerY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            cursor.style.transform =
                `translate3d(
                    ${mouseX}px,
                    ${mouseY}px,
                    0
                )`;

        }
    );


    const animateFollower = () => {

        followerX +=
            (mouseX - followerX) *
            0.12;


        followerY +=
            (mouseY - followerY) *
            0.12;


        follower.style.transform =
            `translate3d(
                ${followerX}px,
                ${followerY}px,
                0
            )`;


        requestAnimationFrame(
            animateFollower
        );

    };


    animateFollower();


    const interactive =
        document.querySelectorAll(
            "a, button, .gallery-item, .product-card"
        );


    interactive.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.classList.add(
                    "cursor-active"
                );

                follower.classList.add(
                    "cursor-active"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursor.classList.remove(
                    "cursor-active"
                );

                follower.classList.remove(
                    "cursor-active"
                );

            }
        );

    });

};


/* ============================================================
   28. NOTIFY USER WHEN PAGE IS FULLY LOADED
   ============================================================ */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* ============================================================
   29. UTILITY: THROTTLE
   ============================================================ */

HussamApp.throttle = function (
    callback,
    delay
) {

    let waiting = false;


    return function (...args) {

        if (waiting) {

            return;

        }


        callback.apply(
            this,
            args
        );


        waiting = true;


        setTimeout(() => {

            waiting = false;

        }, delay);

    };

};


/* ============================================================
   30. UTILITY: DEBOUNCE
   ============================================================ */

HussamApp.debounce = function (
    callback,
    delay
) {

    let timeout;


    return function (...args) {

        clearTimeout(timeout);


        timeout =
            setTimeout(
                () => {

                    callback.apply(
                        this,
                        args
                    );

                },
                delay
            );

    };

};


/* ============================================================
   31. UTILITY: ESCAPE HTML
   ============================================================ */

HussamApp.escapeHTML = function (
    value
) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

};


/* ============================================================
   32. WINDOW RESIZE
   ============================================================ */

window.addEventListener(
    "resize",
    HussamApp.debounce(
        () => {

            if (
                window.innerWidth >
                HussamApp.settings.mobileBreakpoint
            ) {

                document.body.classList.remove(
                    "mobile-menu-open"
                );


                HussamApp.elements.mobileNav
                    ?.classList.remove(
                        "open"
                    );


                HussamApp.elements.menuToggle
                    ?.classList.remove(
                        "active"
                    );

            }

        },
        200
    )
);


/* ============================================================
   33. REDUCED MOTION SUPPORT
   ============================================================ */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.classList.add(
        "reduced-motion"
    );

}


/* ============================================================
   34. NETWORK STATUS
   ============================================================ */

window.addEventListener(
    "offline",
    () => {

        HussamApp.showNotification(
            "You are currently offline.",
            "error"
        );

    }
);


window.addEventListener(
    "online",
    () => {

        HussamApp.showNotification(
            "Connection restored.",
            "success"
        );

    }
);


/* ============================================================
   35. HERO MOUSE MOVEMENT
   ============================================================ */

document.addEventListener(
    "mousemove",
    event => {

        const hero =
            document.querySelector(
                ".hero"
            );


        if (!hero) {

            return;

        }


        if (
            window.innerWidth < 900
        ) {

            return;

        }


        const x =
            (event.clientX /
                window.innerWidth -
                0.5) * 10;


        const y =
            (event.clientY /
                window.innerHeight -
                0.5) * 10;


        const heroImage =
            hero.querySelector(
                ".hero-image img"
            );


        if (heroImage) {

            heroImage.style.transform =
                `scale(1.03)
                 translate(${x}px, ${y}px)`;

        }

    }
);


/* ============================================================
   36. ACTIVE SECTION DETECTION
   ============================================================ */

HussamApp.setupSectionTracking = function () {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (!sections.length) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        document
                            .querySelectorAll(
                                `a[href="#${id}"]`
                            )
                            .forEach(link => {

                                link.classList.add(
                                    "section-active"
                                );

                            });

                    }

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

};


/* ============================================================
   37. INITIALIZE SECTION TRACKING
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        HussamApp.setupSectionTracking();

        HussamApp.setupCursorEffect();

    }
);


/* ============================================================
   38. PRODUCT CARD INTERACTION
   ============================================================ */

document.addEventListener(
    "click",
    event => {

        const productButton =
            event.target.closest(
                "[data-product]"
            );


        if (!productButton) {

            return;

        }


        const productName =
            productButton.dataset.product;


        HussamApp.showNotification(
            `${productName} selected.`,
            "success"
        );

    }
);


/* ============================================================
   39. SERVICE CARD INTERACTION
   ============================================================ */

document.addEventListener(
    "click",
    event => {

        const serviceButton =
            event.target.closest(
                "[data-service]"
            );


        if (!serviceButton) {

            return;

        }


        const service =
            serviceButton.dataset.service;


        HussamApp.showNotification(
            `${service} selected.`,
            "success"
        );

    }
);


/* ============================================================
   40. IMAGE ERROR HANDLING
   ============================================================ */

document.querySelectorAll(
    "img"
).forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-error"
            );


            console.warn(
                "Image could not be loaded:",
                image.src
            );

        }
    );

});


/* ============================================================
   41. PREVENT IMAGE DRAGGING
   ============================================================ */

document.querySelectorAll(
    ".gallery-item img, .brand img"
).forEach(image => {

    image.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

        }
    );

});


/* ============================================================
   42. TOUCH DEVICE DETECTION
   ============================================================ */

if (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
) {

    document.documentElement.classList.add(
        "touch-device"
    );

} else {

    document.documentElement.classList.add(
        "desktop-device"
    );

}


/* ============================================================
   43. PAGE VISIBILITY
   ============================================================ */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* ============================================================
   44. CONSOLE BRANDING
   ============================================================ */

console.log(
    "%c HUSSAM STATIONARY ",
    `
    background:#111;
    color:#fff;
    font-size:18px;
    font-weight:bold;
    padding:8px 16px;
    border-radius:6px;
    `
);


console.log(
    "%c Premium website loaded successfully.",
    `
    color:#777;
    font-size:13px;
    `
);


/* ============================================================
   END OF HUSSAM STATIONARY JAVASCRIPT
   ============================================================ */
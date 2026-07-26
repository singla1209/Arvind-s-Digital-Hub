/*==================================================
ACCOUNTS EXPERT
assets/js/slider.js
Professional Bootstrap Slider
==================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const sliderElement = document.querySelector("#homeSlider");

    if (!sliderElement) return;

    /*====================================
    INITIALIZE BOOTSTRAP CAROUSEL
    ====================================*/

    const carousel = new bootstrap.Carousel(sliderElement, {

        interval: 3500,
        ride: "carousel",
        pause: false,
        wrap: true,
        touch: true

    });

    /*====================================
    PAUSE ON MOUSE HOVER
    ====================================*/

    sliderElement.addEventListener("mouseenter", function () {

        carousel.pause();

    });

    sliderElement.addEventListener("mouseleave", function () {

        carousel.cycle();

    });

    /*====================================
    PREVIOUS BUTTON
    ====================================*/

    const prevBtn = document.querySelector(".carousel-control-prev");

    if (prevBtn) {

        prevBtn.addEventListener("click", function () {

            carousel.prev();

        });

    }

    /*====================================
    NEXT BUTTON
    ====================================*/

    const nextBtn = document.querySelector(".carousel-control-next");

    if (nextBtn) {

        nextBtn.addEventListener("click", function () {

            carousel.next();

        });

    }

    /*====================================
    SWIPE SUPPORT
    ====================================*/

    let startX = 0;
    let endX = 0;

    sliderElement.addEventListener("touchstart", function (e) {

        startX = e.changedTouches[0].screenX;

    });

    sliderElement.addEventListener("touchend", function (e) {

        endX = e.changedTouches[0].screenX;

        if (startX - endX > 60) {

            carousel.next();

        }

        if (endX - startX > 60) {

            carousel.prev();

        }

    });

    /*====================================
    KEYBOARD SUPPORT
    ====================================*/

    document.addEventListener("keydown", function (e) {

        if (e.key === "ArrowLeft") {

            carousel.prev();

        }

        if (e.key === "ArrowRight") {

            carousel.next();

        }

    });

    /*====================================
    ANIMATION ON SLIDE CHANGE
    ====================================*/

    sliderElement.addEventListener("slide.bs.carousel", function () {

        const active = sliderElement.querySelector(".carousel-item.active img");

        if (active) {

            active.style.transform = "scale(1)";

        }

    });

    sliderElement.addEventListener("slid.bs.carousel", function () {

        const active = sliderElement.querySelector(".carousel-item.active img");

        if (active) {

            active.style.transition = "transform 3.5s ease";

            active.style.transform = "scale(1.08)";

        }

    });

    /*====================================
    START ZOOM EFFECT
    ====================================*/

    const firstImage = sliderElement.querySelector(".carousel-item.active img");

    if (firstImage) {

        firstImage.style.transition = "transform 3.5s ease";

        firstImage.style.transform = "scale(1.08)";

    }

});
/*==================================================
ACCOUNTS EXPERT
assets/js/menu.js
Professional Sidebar Menu
==================================================*/

"use strict";
import { auth } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


/*====================================
ELEMENTS
====================================*/

const menuButton = document.getElementById("menuBtn");
const closeButton = document.getElementById("closeMenu");
const sideBar = document.getElementById("sidebar");
const overlayBg = document.getElementById("overlay");

/*====================================
OPEN MENU
====================================*/

function openSidebar() {

    if (!sideBar) return;

    sideBar.classList.add("active");

    if (overlayBg) {
        overlayBg.classList.add("active");
    }

    document.body.style.overflow = "hidden";

}

/*====================================
CLOSE MENU
====================================*/

function closeSidebar() {

    if (!sideBar) return;

    sideBar.classList.remove("active");

    if (overlayBg) {
        overlayBg.classList.remove("active");
    }

    document.body.style.overflow = "";

}

/*====================================
CLICK EVENTS
====================================*/

if (menuButton) {

    menuButton.addEventListener("click", openSidebar);

}

if (closeButton) {

    closeButton.addEventListener("click", closeSidebar);

}

if (overlayBg) {

    overlayBg.addEventListener("click", closeSidebar);

}

/*====================================
ESC KEY CLOSE
====================================*/

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeSidebar();

    }

});

/*====================================
SWIPE TO CLOSE (Mobile)
====================================*/

let startX = 0;
let endX = 0;

if (sideBar) {

    sideBar.addEventListener("touchstart", function (e) {

        startX = e.changedTouches[0].screenX;

    });

    sideBar.addEventListener("touchend", function (e) {

        endX = e.changedTouches[0].screenX;

        if (startX - endX > 80) {

            closeSidebar();

        }

    });

}

/*====================================
ACTIVE MENU
====================================*/

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".sidebar ul li a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});

/*====================================
MENU HOVER EFFECT
====================================*/

document.querySelectorAll(".sidebar ul li").forEach(item => {

    item.addEventListener("mouseenter", function () {

        this.style.transform = "translateX(6px)";

    });

    item.addEventListener("mouseleave", function () {

        this.style.transform = "translateX(0px)";

    });

});

/*====================================
AUTO CLOSE AFTER CLICK (Mobile)
====================================*/

document.querySelectorAll(".sidebar a").forEach(link => {

    link.addEventListener("click", function () {

        if (window.innerWidth < 992) {

            setTimeout(closeSidebar, 200);

        }

    });

});

/*====================================
RESIZE
====================================*/

window.addEventListener("resize", function () {

    if (window.innerWidth > 992) {

        document.body.style.overflow = "";

    }

});

/*====================================
SHOW ADMIN MENU
====================================*/

const ADMIN_UID = "dnC5ocJgS4aeNgMqFm7W9d3RaM32";

const adminMenu = document.getElementById("adminMenu");

if (adminMenu) {

    onAuthStateChanged(auth, (user) => {

        if (user && user.uid === ADMIN_UID) {

            adminMenu.style.display = "block";

        } else {

            adminMenu.style.display = "none";

        }

    });

}

/*====================================
END
====================================*/

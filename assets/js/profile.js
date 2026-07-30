/*==================================================
ARVIND DIGITAL HUB
assets/js/profile.js
User Profile
==================================================*/

import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

/*====================================
ELEMENTS
====================================*/

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const memberSince = document.getElementById("memberSince");

/*====================================
AUTH CHECK
====================================*/

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    /* Name */

    profileName.textContent =
        user.displayName || "User";

    /* Email */

    profileEmail.textContent =
        user.email;

    /* Member Since */

    if (user.metadata.creationTime) {

        memberSince.textContent =
            new Date(user.metadata.creationTime)
            .toLocaleDateString("en-GB");

    }

});

/*==================================================
ARVIND DIGITAL HUB
assets/js/profile.js
User Profile
==================================================*/

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

/*====================================
ELEMENTS
====================================*/

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const memberSince = document.getElementById("memberSince");

/*====================================
AUTH CHECK
====================================*/

onAuthStateChanged(auth, async (user) => {

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

    const userRef = doc(db, "users", user.uid);

const snap = await getDoc(userRef);

if (!snap.exists()) {

    await setDoc(userRef, {

        name: user.displayName || "",

        email: user.email,

        phone: "",

        company: "",

        designation: "",

        about: "",

        createdAt: serverTimestamp()

    });

}

    /* Member Since */

    if (user.metadata.creationTime) {

        memberSince.textContent =
            new Date(user.metadata.creationTime)
            .toLocaleDateString("en-GB");

    }

});

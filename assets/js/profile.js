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
const profilePhone = document.getElementById("profilePhone");
const profileCompany = document.getElementById("profileCompany");
const profileDesignation = document.getElementById("profileDesignation");
const profileAbout = document.getElementById("profileAbout");

const editProfileBtn = document.getElementById("editProfileBtn");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const cancelProfileBtn = document.getElementById("cancelProfileBtn");

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

const data = (await getDoc(userRef)).data();

document.getElementById("profileName").textContent =
    data.name || "User";

document.getElementById("profilePhone").textContent =
    data.phone || "Not Added";

document.getElementById("profileCompany").textContent =
    data.company || "Not Added";

document.getElementById("profileDesignation").textContent =
    data.designation || "Not Added";

document.getElementById("profileAbout").textContent =
    data.about || "Not Added";

    /* Member Since */

    if (user.metadata.creationTime) {

        memberSince.textContent =
            new Date(user.metadata.creationTime)
            .toLocaleDateString("en-GB");

    }

});

editProfileBtn.addEventListener("click", () => {

    profilePhone.innerHTML =
        `<input type="text" class="form-control" id="editPhone" value="${profilePhone.textContent === "Not Added" ? "" : profilePhone.textContent}">`;

    profileCompany.innerHTML =
        `<input type="text" class="form-control" id="editCompany" value="${profileCompany.textContent === "Not Added" ? "" : profileCompany.textContent}">`;

    profileDesignation.innerHTML =
        `<input type="text" class="form-control" id="editDesignation" value="${profileDesignation.textContent === "Not Added" ? "" : profileDesignation.textContent}">`;

    profileAbout.innerHTML =
        `<textarea class="form-control" id="editAbout" rows="4">${profileAbout.textContent === "Not Added" ? "" : profileAbout.textContent}</textarea>`;

    editProfileBtn.classList.add("d-none");
    saveProfileBtn.classList.remove("d-none");
    cancelProfileBtn.classList.remove("d-none");

});

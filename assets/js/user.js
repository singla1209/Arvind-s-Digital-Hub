import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// ======================================
// CHECK LOGGED-IN USER
// ======================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        return;
    }

    try {

        // Get logged-in user's Firestore document
        const ref = doc(db, "users", user.uid);

        const snap = await getDoc(ref);


        if (snap.exists()) {

            const data = snap.data();


            // ----------------------------------
            // User name
            // New users: name
            // Old users: fullname
            // ----------------------------------

            const name =
                data.name ||
                data.fullname ||
                "User";


            // ----------------------------------
            // Email
            // ----------------------------------

            const email =
                data.email ||
                user.email ||
                "";


            // ----------------------------------
            // First letter
            // ----------------------------------

            const firstLetter =
                name.charAt(0).toUpperCase();


            // ----------------------------------
            // Top-right small circle
            // ----------------------------------

            const userAvatar =
                document.getElementById("userAvatar");

            if (userAvatar) {
                userAvatar.textContent = firstLetter;
            }


            // ----------------------------------
            // Large profile circle
            // ----------------------------------

            const profileAvatarLarge =
                document.getElementById(
                    "profileAvatarLarge"
                );

            if (profileAvatarLarge) {
                profileAvatarLarge.textContent =
                    firstLetter;
            }


            // ----------------------------------
            // Profile name
            // ----------------------------------

            const profileName =
                document.getElementById(
                    "profileName"
                );

            if (profileName) {
                profileName.textContent = name;
            }


            // ----------------------------------
            // Profile email
            // ----------------------------------

            const profileEmail =
                document.getElementById(
                    "profileEmail"
                );

            if (profileEmail) {
                profileEmail.textContent = email;
            }


            // ----------------------------------
            // Registered email
            // ----------------------------------

            const registeredEmail =
                document.getElementById(
                    "profileRegisteredEmail"
                );

            if (registeredEmail) {
                registeredEmail.textContent = email;
            }


            // ----------------------------------
            // Existing userName element
            // ----------------------------------

            const userName =
                document.getElementById(
                    "userName"
                );

            if (userName) {
                userName.textContent = name;
            }

        }

    } catch (error) {

        console.error(
            "Error loading user:",
            error
        );

    }

});


// ======================================
// PROFILE CLICK
// ======================================

const userProfile =
    document.getElementById("userProfile");

const userProfileCard =
    document.getElementById("userProfileCard");


if (userProfile && userProfileCard) {

    userProfile.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            userProfileCard.classList.toggle(
                "show"
            );

        }
    );


    // Click outside → close profile

    document.addEventListener(
        "click",
        () => {

            userProfileCard.classList.remove(
                "show"
            );

        }
    );

}

// ======================================
// RESET PASSWORD
// ======================================

const resetPasswordBtn =
    document.getElementById("resetPasswordBtn");


if (resetPasswordBtn) {

    resetPasswordBtn.addEventListener(
        "click",
        async (event) => {

            event.stopPropagation();

            const user = auth.currentUser;

            if (!user || !user.email) {
                return;
            }

            try {

                await sendPasswordResetEmail(
                    auth,
                    user.email
                );

                alert(
                    "Password reset link has been sent to your registered email."
                );

                userProfileCard.classList.remove(
                    "show"
                );

            } catch (error) {

                console.error(
                    "Password reset error:",
                    error
                );

                alert(
                    "Unable to send password reset email."
                );

            }

        }
    );

}


// ======================================
// LOGOUT
// ======================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async (event) => {

            event.stopPropagation();

            try {

                await auth.signOut();

                window.location.href =
                    "index.html";

            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

        }
    );

}

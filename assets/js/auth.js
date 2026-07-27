import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const menuLogin = document.getElementById("menuLogin");
const menuRegister = document.getElementById("menuRegister");
const menuLogout = document.getElementById("menuLogout");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {

    if (user) {

        if (menuLogin) menuLogin.hidden = true;
        if (menuRegister) menuRegister.hidden = true;
        if (menuLogout) menuLogout.hidden = false;

    } else {

        if (menuLogin) menuLogin.hidden = false;
        if (menuRegister) menuRegister.hidden = false;
        if (menuLogout) menuLogout.hidden = true;

    }

});

if (logoutBtn) {

    logoutBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        await signOut(auth);

    });

}

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

        if(menuLogin) menuLogin.style.display = "none";
        if(menuRegister) menuRegister.style.display = "none";
        if(menuLogout) menuLogout.style.display = "block";

    } else {

        if(menuLogin) menuLogin.style.display = "block";
        if(menuRegister) menuRegister.style.display = "block";
        if(menuLogout) menuLogout.style.display = "none";

    }

});

if(logoutBtn){

logoutBtn.addEventListener("click", async function(e){

    e.preventDefault();

    await signOut(auth);

    window.location.href = "login.html";

});

}
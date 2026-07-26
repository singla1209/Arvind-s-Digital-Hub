/*==================================================
Arvind Digital Hub
LOGIN.JS
==================================================*/

"use strict";

import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

/*==========================================
ELEMENTS
==========================================*/

const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");
const loginBtn = document.getElementById("loginBtn");
const remember = document.getElementById("rememberMe");

/*==========================================
SHOW / HIDE PASSWORD
==========================================*/

eyeIcon.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";
        eyeIcon.classList.remove("bi-eye-fill");
        eyeIcon.classList.add("bi-eye-slash-fill");

    } else {

        password.type = "password";
        eyeIcon.classList.remove("bi-eye-slash-fill");
        eyeIcon.classList.add("bi-eye-fill");

    }

});

/*==========================================
REMEMBER USER
==========================================*/

window.addEventListener("load", () => {

    const savedUser = localStorage.getItem("adh_username");

    if (savedUser) {

        username.value = savedUser;
        remember.checked = true;

    }

});

/*==========================================
FORM VALIDATION
==========================================*/

form.addEventListener("submit", async function(e){

    e.preventDefault();

    let valid = true;

    username.classList.remove("error");
    password.classList.remove("error");

    if(username.value.trim()==""){

        username.classList.add("error");
        valid=false;

    }

    if(password.value.trim()==""){

        password.classList.add("error");
        valid=false;

    }

    if(!valid){

        alert("Please enter your login details.");
        return;

    }

    /* Remember */

    if(remember.checked){

        localStorage.setItem("adh_username",username.value);

    }else{

        localStorage.removeItem("adh_username");

    }

    /* Loading */

    loginBtn.disabled=true;

    loginBtn.innerHTML=
    '<span class="spinner-border spinner-border-sm"></span> Signing In...';

    try{

await signInWithEmailAndPassword(

auth,

username.value.trim(),

password.value

);

window.location.href="dashboard.html";

}

catch(error){

alert(error.message);

loginBtn.disabled=false;

loginBtn.innerHTML=
'<i class="bi bi-box-arrow-in-right"></i> Login';

}

});

/*==========================================
ENTER KEY
==========================================*/

document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        form.requestSubmit();

    }

});

/*==========================================
INPUT EFFECT
==========================================*/

document.querySelectorAll(".form-control").forEach(input=>{

    input.addEventListener("focus",function(){

        this.parentElement.style.transform="scale(1.02)";

    });

    input.addEventListener("blur",function(){

        this.parentElement.style.transform="scale(1)";

    });

});

/*==========================================
GOOGLE LOGIN
(UI READY)
==========================================*/

const googleBtn=document.querySelector(".btn-light");

if(googleBtn){

googleBtn.addEventListener("click",async function(){

try{

const provider=new GoogleAuthProvider();

await signInWithPopup(auth,provider);

window.location.href="dashboard.html";

}

catch(error){

alert(error.message);

}

});

}

/*==========================================
MICROSOFT LOGIN
(UI READY)
==========================================*/

const microsoftBtn=document.querySelector(".btn-dark");

if(microsoftBtn){

microsoftBtn.addEventListener("click",function(){

alert("Microsoft Login will be connected later.");

});

}

/*==========================================
END
==========================================*/
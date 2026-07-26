/*==================================================
Arvind Digital Hub
REGISTER.JS
==================================================*/

"use strict";

import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

/*==========================================
ELEMENTS
==========================================*/

const form = document.getElementById("registerForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const registerBtn = document.getElementById("registerBtn");
const terms = document.getElementById("terms");

/*==========================================
SHOW / HIDE PASSWORD
==========================================*/

document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", function () {

        const target = document.getElementById(
            this.dataset.target
        );

        const icon = this.querySelector("i");

        if (target.type === "password") {

            target.type = "text";
            icon.classList.remove("bi-eye-fill");
            icon.classList.add("bi-eye-slash-fill");

        } else {

            target.type = "password";
            icon.classList.remove("bi-eye-slash-fill");
            icon.classList.add("bi-eye-fill");

        }

    });

});

/*==========================================
EMAIL VALIDATION
==========================================*/

function validEmail(value){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

}

/*==========================================
MOBILE VALIDATION
==========================================*/

function validMobile(value){

    return /^[6-9][0-9]{9}$/.test(value);

}

/*==========================================
PASSWORD STRENGTH
==========================================*/

function strongPassword(value){

    return value.length >= 8;

}

/*==========================================
FORM SUBMIT
==========================================*/

form.addEventListener("submit",async function(e){

    e.preventDefault();

    document
    .querySelectorAll(".form-control")
    .forEach(input=>{

        input.classList.remove("error");

    });

    let valid=true;

    if(fullname.value.trim().length<3){

        fullname.classList.add("error");
        valid=false;

    }

    if(!validEmail(email.value.trim())){

        email.classList.add("error");
        valid=false;

    }

    if(!validMobile(mobile.value.trim())){

        mobile.classList.add("error");
        valid=false;

    }

    if(!strongPassword(password.value)){

        password.classList.add("error");
        alert("Password must contain at least 8 characters.");
        valid=false;

    }

    if(password.value!==confirmPassword.value){

        confirmPassword.classList.add("error");
        alert("Passwords do not match.");
        valid=false;

    }

    if(!terms.checked){

        alert("Please accept Terms & Conditions.");
        valid=false;

    }

    if(!valid){

        return;

    }

registerBtn.disabled = true;

registerBtn.innerHTML =
'<span class="spinner-border spinner-border-sm"></span> Creating Account...';

try{

const userCredential =
await createUserWithEmailAndPassword(

auth,

email.value.trim(),

password.value

);

await setDoc(

doc(db,"users",userCredential.user.uid),

{

fullname:fullname.value.trim(),

email:email.value.trim(),

mobile:mobile.value.trim(),

createdAt:new Date()

}

);

alert("Registration Successful");

window.location.href="login.html";

}

catch(error){

alert(error.message);

registerBtn.disabled=false;

registerBtn.innerHTML=

'<i class="bi bi-person-plus-fill"></i> Create Account';

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
GOOGLE SIGNUP
==========================================*/

const googleBtn=document.querySelector(".google-btn");

if(googleBtn){

googleBtn.addEventListener("click",function(){

alert("Google Sign Up will be connected with Firebase.");

});

}

/*==========================================
MICROSOFT SIGNUP
==========================================*/

const microsoftBtn=document.querySelector(".microsoft-btn");

if(microsoftBtn){

microsoftBtn.addEventListener("click",function(){

alert("Microsoft Sign Up will be connected later.");

});

}

/*==========================================
END
==========================================*/
import { auth } from "./firebase.js";

import {
signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click", async function(e){

e.preventDefault();

try{

await signOut(auth);

window.location.href="lndex.html";

}

catch(error){

alert(error.message);

}

});

}

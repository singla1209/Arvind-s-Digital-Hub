import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

onAuthStateChanged(auth, async(user)=>{

if(user){

const ref=doc(db,"users",user.uid);

const snap=await getDoc(ref);

if(snap.exists()){

document.getElementById("userName").textContent=snap.data().fullname;

}

}

});
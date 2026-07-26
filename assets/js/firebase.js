// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

// Authentication
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Firestore
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Storage
import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

// Analytics (Optional)
import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

const firebaseConfig = {

  apiKey: "AIzaSyAGk--oNHY3qihBgSYWFg3DuQC9qIvBKNw",

  authDomain: "arvind-s-digital-hub.firebaseapp.com",

  projectId: "arvind-s-digital-hub",

  storageBucket: "arvind-s-digital-hub.firebasestorage.app",

  messagingSenderId: "674974385827",

  appId: "1:674974385827:web:2116cc505532ef4fb9a116",

  measurementId: "G-122WW3PEDP"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

//const analytics = getAnalytics(app);

export {

app,

auth,

db,

storage

};

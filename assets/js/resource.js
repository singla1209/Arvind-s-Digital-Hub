/*==================================================
ARVIND DIGITAL HUB
assets/js/resource.js
==================================================*/

import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

/*====================================
GET RESOURCE ID
====================================*/

const params = new URLSearchParams(window.location.search);

const resourceId = params.get("id");

/*====================================
ELEMENTS
====================================*/

const title = document.getElementById("resourceTitle");
const category = document.getElementById("resourceCategory");
const description = document.getElementById("resourceDescription");
const date = document.getElementById("resourceDate");
const size = document.getElementById("resourceSize");
const downloads = document.getElementById("resourceDownloads");
const uploader = document.getElementById("resourceUploader");
const downloadBtn = document.getElementById("downloadBtn");

async function loadResource() {

    if (!resourceId) {

        title.textContent = "Resource Not Found";
        description.textContent = "No resource ID was supplied.";

        return;

    }

    try {

        const docRef = doc(db, "resources", resourceId);

        const snap = await getDoc(docRef);

        if (!snap.exists()) {

            title.textContent = "Resource Not Found";
            description.textContent = "This resource does not exist.";

            return;

        }

        const data = snap.data();

console.log("Resource Loaded:", data);

title.textContent =
    data.title || "Untitled";

category.textContent =
    data.category || "Other";

description.textContent =
    data.description || "No description available.";

date.textContent =
    data.uploadedAt
        ? data.uploadedAt.toDate().toLocaleDateString("en-GB")
        : "-";

size.textContent =
    formatFileSize(data.size);

downloads.textContent =
    data.downloads || 0;

uploader.textContent =
    "Admin";

downloadBtn.href =
    data.fileURL;

    }

    catch (error) {

        console.error(error);

    }

}

loadResource();

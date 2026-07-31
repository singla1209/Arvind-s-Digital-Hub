/*====================================
DASHBOARD
====================================*/

import { db } from "./firebase.js";

import {

    collection,
    getDocs

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const heroResourceCount =
    document.getElementById("heroResourceCount");

const heroDownloadCount =
    document.getElementById("heroDownloadCount");

const heroCategoryCount =
    document.getElementById("heroCategoryCount");

async function loadHeroStatistics() {

    try {

        const snap =
            await getDocs(collection(db, "resources"));

        let resources = 0;

        let downloads = 0;

        const categories = new Set();

        snap.forEach(doc => {

            const item = doc.data();

            resources++;

            downloads += item.downloads || 0;

            if (item.category) {

                categories.add(item.category);

            }

        });

        heroResourceCount.textContent = resources;

        heroDownloadCount.textContent = downloads;

        heroCategoryCount.textContent = categories.size;

    }

    catch (err) {

        console.error(err);

    }

}

loadHeroStatistics();

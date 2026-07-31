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

function animateCounter(element, target) {

    element.textContent = "0";

    let current = 0;

    const duration = 2000;   // 2 seconds

    const fps = 30;

    const totalSteps = Math.max(1, Math.floor(duration / (1000 / fps)));

    const increment = target / totalSteps;

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            element.textContent = target;

            clearInterval(timer);

        } else {

            element.textContent = Math.floor(current);

        }

    }, 1000 / fps);

}
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

      setTimeout(() => {

    animateCounter(heroResourceCount, resources);

    animateCounter(heroDownloadCount, downloads);

    animateCounter(heroCategoryCount, categories.size);

}, 300);
        
    }

    catch (err) {

        console.error(err);

    }

}

loadHeroStatistics();

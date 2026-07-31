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

    let current = 0;

    const duration = 1200;

    const stepTime = 20;

    const increment = Math.max(1, Math.ceil(target / (duration / stepTime)));

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        element.textContent = current;

    }, stepTime);

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

        animateCounter(heroResourceCount, resources);

        animateCounter(heroDownloadCount, downloads);

        animateCounter(heroCategoryCount, categories.size);

    }

    catch (err) {

        console.error(err);

    }

}

loadHeroStatistics();

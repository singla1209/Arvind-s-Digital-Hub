import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const notificationList =
    document.getElementById("notificationList");

async function loadNotifications() {

    if (!notificationList) return;

    try {

        const q = query(
            collection(db, "notifications"),
            where("active", "==", true),
            orderBy("createdAt", "desc"),
            limit(5)
        );

        const snap = await getDocs(q);

        if (snap.empty) {

            notificationList.innerHTML = `
                <div class="p-3 text-center text-muted">
                    No notifications
                </div>
            `;

            return;

        }

        notificationList.innerHTML = "";

        snap.forEach(doc => {

            const item = doc.data();

            notificationList.innerHTML += `

            <div class="p-3 border-bottom">

                <strong>${item.title}</strong>

                <div class="small text-muted">

                    ${item.message}

                </div>

            </div>

            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}

loadNotifications();

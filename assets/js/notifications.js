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
const notificationBadge =
    document.getElementById("notificationBadge");

async function loadNotifications() {

    if (!notificationList) return;

    try {

       const snap = await getDocs(collection(db, "notifications"));
        if (notificationBadge) {

    if (snap.empty) {

        notificationBadge.style.display = "none";

    } else {

        notificationBadge.style.display = "inline-block";

        notificationBadge.textContent = snap.size;

    }

}

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

<div
class="notification-item p-3 border-bottom"
data-id="${item.resourceId}">

<div class="d-flex align-items-start">

<div class="me-3">

<i class="bi bi-file-earmark-arrow-down-fill text-primary fs-4"></i>

</div>

<div class="flex-grow-1">

<div class="fw-semibold">

${item.title}

</div>

<div class="text-muted small">

${item.message}

</div>

<div class="small text-secondary mt-1">

<i class="bi bi-clock me-1"></i>

Just now

</div>

</div>

<div>

<span class="badge bg-success">

NEW

</span>

</div>

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

document.addEventListener("click", function (e) {

    const card = e.target.closest(".notification-item");

    if (!card) return;

    const id = card.dataset.id;

    if (!id) return;

    window.location.href = `resources.html?id=${id}`;

});

import { db, auth } from "./firebase.js";

import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    doc,
    setDoc,
    getDoc
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

        snap.forEach(docSnap => {

    const item = docSnap.data();

    item.notificationId = docSnap.id;

           notificationList.innerHTML += `

<div
class="notification-item p-3 border-bottom"
data-id="${item.resourceId}"
data-notification="${item.notificationId}">

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

async function markNotificationRead(notificationId) {

    const user = auth.currentUser;

    if (!user) return;

    await setDoc(

        doc(db, "userNotifications", `${user.uid}_${notificationId}`),

        {

            uid: user.uid,

            notificationId,

            read: true,

            readAt: new Date()

        }

    );

}

document.addEventListener("click", async function (e) {

    const card = e.target.closest(".notification-item");

    if (!card) return;

    const resourceId = card.dataset.id;

    const notificationId = card.dataset.notification;

    if (!resourceId || !notificationId) return;

    await markNotificationRead(notificationId);

    window.location.href = `resource.html?id=${resourceId}`;

});

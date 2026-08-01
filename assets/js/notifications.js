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
    getDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const notificationList =
    document.getElementById("notificationList");
const notificationBadge =
    document.getElementById("notificationBadge");

function timeAgo(timestamp) {

    if (!timestamp || !timestamp.toDate) {

        return "Just now";

    }

    const now = new Date();

    const time = timestamp.toDate();

    const seconds = Math.floor((now - time) / 1000);

    if (seconds < 60)
        return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60)
        return minutes + (minutes === 1 ? " minute ago" : " minutes ago");

    const hours = Math.floor(minutes / 60);

    if (hours < 24)
        return hours + (hours === 1 ? " hour ago" : " hours ago");

    const days = Math.floor(hours / 24);

    if (days === 1)
        return "Yesterday";

    if (days < 7)
        return days + " days ago";

    return time.toLocaleDateString("en-GB");

}

async function loadNotifications() {

    if (!notificationList) return;

    try {

       const snap = await getDocs(collection(db, "notifications"));
        const user = auth.currentUser;

let readNotifications = new Set();

if (user) {

    const readSnap = await getDocs(collection(db, "userNotifications"));

    readSnap.forEach(doc => {

        const data = doc.data();

        if (data.uid === user.uid) {

            readNotifications.add(data.notificationId);

        }

    });

}
        if (notificationBadge) {

    const unreadCount = snap.size - readNotifications.size;

    if (unreadCount <= 0) {

        notificationBadge.style.display = "none";

    } else {

        notificationBadge.style.display = "inline-block";

        notificationBadge.textContent = unreadCount;

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
            const isRead = readNotifications.has(item.notificationId);

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

${timeAgo(item.createdAt)}

</div>

</div>

<div>

${!isRead ? `
<span class="badge bg-success">

NEW

</span>
` : ""}

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

onSnapshot(

    collection(db, "notifications"),

    () => {

        loadNotifications();

    }

);

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

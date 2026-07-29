/*==================================================
ACCOUNTS EXPERT
assets/js/resources.js
Loads documents/downloads from Firestore + Storage
and renders them as cards on the dashboard.
==================================================*/

import { db } from "./firebase.js";
import {
  collection,
  query,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const container = document.getElementById("resourcesContainer");

// Maps a category name to a Bootstrap badge color + fallback icon
const CATEGORY_STYLES = {
  Excel:     { badge: "bg-success",           icon: "bi-file-earmark-excel-fill" },
  Python:    { badge: "bg-warning text-dark", icon: "bi-code-slash" },
  Documents: { badge: "bg-primary",           icon: "bi-file-earmark-text-fill" },
  Image:     { badge: "bg-info text-dark",    icon: "bi-image-fill" },
  Video:     { badge: "bg-danger",            icon: "bi-camera-video-fill" },
  Other:     { badge: "bg-secondary",         icon: "bi-file-earmark-fill" }
};

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function formatFileSize(bytes) {

    if (!bytes) return "";

    if (bytes < 1024) return bytes + " B";

    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + " KB";

    if (bytes < 1024 * 1024 * 1024)
        return (bytes / 1024 / 1024).toFixed(2) + " MB";

    return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";

}

function cardHTML(item) {

    const style =
        CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Other;

    return `

<div class="col-lg-4 col-md-6">

<div class="card resource-card h-100 shadow-sm">

<div class="card-body d-flex flex-column">

<span class="badge ${style.badge} mb-2">

${escapeHtml(item.category || "Other")}

</span>

<h5 class="fw-bold">

<i class="bi ${style.icon} me-2"></i>

${escapeHtml(item.title)}

</h5>

<p class="text-muted mb-3">

${escapeHtml(item.description)}

</p>

<div class="small text-secondary mb-3">

<div>

📅 ${escapeHtml(item.uploadDate || "")}

</div>

<div>

📦 ${formatFileSize(item.size)}

</div>

</div>

<div class="mt-auto d-grid gap-2">

<a href="${item.fileURL}"

target="_blank"

rel="noopener"

class="btn btn-primary">

<i class="bi bi-eye-fill me-1"></i>

View

</a>

<a href="${item.fileURL}"

download

class="btn btn-outline-secondary">

<i class="bi bi-download me-1"></i>

Download

</a>

</div>

</div>

</div>

</div>

`;

}

async function loadResources() {
  if (!container) return;

  try {
    const q = query(collection(db, "resources"), orderBy("uploadedAt", "desc"));
    const snap = await getDocs(q);

    if (snap.empty) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted py-4">
          No resources uploaded yet.
        </div>`;
      return;
    }

    let html = "";
    snap.forEach((doc) => {
      html += cardHTML(doc.data());
    });

    container.innerHTML = html;

  } catch (error) {
    console.error("Failed to load resources:", error);
    container.innerHTML = `
      <div class="col-12 text-center text-danger py-4">
        Could not load resources right now.
      </div>`;
  }
}

loadResources();

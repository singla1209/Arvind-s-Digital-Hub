/*==================================================
ACCOUNTS EXPERT
assets/js/resources.js
Loads documents/downloads from Firestore + Storage
and renders them as cards on the dashboard.
==================================================*/

import { db } from "./firebase.js";
console.log("Resources.js Version 2");
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const container = document.getElementById("resourcesContainer");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortResources");
const resourceInfo = document.getElementById("resourceInfo");
const pageSizeSelect = document.getElementById("pageSize");
const pagination = document.getElementById("pagination");

function loadCategories() {

    const categories = new Set();

    allResources.forEach(item => {

        if (item.category) {

            categories.add(item.category);

        }

    });

    categoryFilter.innerHTML = `
        <option value="">All Categories</option>
    `;

    [...categories]
        .sort()
        .forEach(category => {

            categoryFilter.innerHTML += `
                <option value="${category}">
                    ${category}
                </option>
            `;

        });

}

let allResources = [];

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

  let uploadDate = "";

if (item.uploadedAt && item.uploadedAt.toDate) {

    uploadDate = item.uploadedAt.toDate().toLocaleDateString("en-GB");

}

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

<div class="small text-secondary mb-3 d-flex flex-column gap-1">

    <div class="d-flex align-items-center gap-2">
        <i class="bi bi-calendar3"></i>
        <span>${uploadDate}</span>
    </div>

    <div class="d-flex align-items-center gap-2">
        <i class="bi bi-box-seam"></i>
        <span>${formatFileSize(item.size)}</span>
    </div>

    <div class="d-flex align-items-center gap-2">
        <i class="bi bi-download"></i>
        <span>${item.downloads || 0} Downloads</span>
    </div>

</div>

<div class="mt-auto d-grid gap-2">

<a
href="resource.html?id=${item.id}"
class="btn btn-primary">

<i class="bi bi-eye-fill me-1"></i>

View

</a>

<a href="#"

class="btn btn-outline-secondary download-btn"

data-id="${item.id}"

data-url="${item.fileURL}">

<i class="bi bi-download me-1"></i>

Download

</a>

</div>

</div>

</div>

</div>

`;

}

  let currentPage = 1;
const ITEMS_PER_PAGE = 9;

async function loadResources() 



{
  if (!container) return;

  try {
    const q = query(collection(db, "resources"), orderBy("uploadedAt", "desc"));
    const snap = await getDocs(q);
    allResources = [];

snap.forEach((docSnap) => {

    const item = docSnap.data();

    item.id = docSnap.id;

    allResources.push(item);

});
    if (snap.empty) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted py-4">
          No resources uploaded yet.
        </div>`;
      return;
    }

     updateResources();
    loadCategories();
    
  } catch (error) {
    console.error("Failed to load resources:", error);
    container.innerHTML = `
      <div class="col-12 text-center text-danger py-4">
        Could not load resources right now.
      </div>`;
  }
}


function updateResources() {

    let list = [...allResources];

    /* SEARCH */

    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword !== "") {

        list = list.filter(item =>

            (item.title || "").toLowerCase().includes(keyword) ||
            (item.description || "").toLowerCase().includes(keyword) ||
            (item.category || "").toLowerCase().includes(keyword) ||
            formatFileSize(item.size).toLowerCase().includes(keyword)

        );

    }

   /* CATEGORY */

if (categoryFilter.value !== "") {

    list = list.filter(item =>

        item.category === categoryFilter.value

    );

}

/* SORT */

switch (sortSelect.value) {

    case "oldest":

        list.reverse();
        break;

    case "title":

        list.sort((a, b) =>
            (a.title || "").localeCompare(b.title || "")
        );
        break;

    case "downloads":

        list.sort((a, b) =>
            (b.downloads || 0) - (a.downloads || 0)
        );
        break;

    case "latest":
    default:
        // Already ordered by uploadedAt desc from Firestore
        break;

}

const total = list.length;

const pageSize = Number(pageSizeSelect.value);

const totalPages = Math.ceil(total / pageSize) || 1;

if (currentPage > totalPages) {

    currentPage = totalPages;

}

const startIndex = (currentPage - 1) * pageSize;

const endIndex = startIndex + pageSize;

const pageData = list.slice(startIndex, endIndex);

/* Showing text */

if (resourceInfo) {

    if (total === 0) {

        resourceInfo.textContent =
            "Showing 0–0 of 0 resources";

    } else {

        resourceInfo.textContent =
            `Showing ${startIndex + 1}–${Math.min(endIndex, total)} of ${total} resources`;

    }

}
renderPagination(totalPages);

setupPaginationEvents(totalPages);

renderResources(pageData);

}



function renderPagination(totalPages) {

    if (!pagination) return;

    pagination.innerHTML = "";

    if (totalPages <= 1) return;

    /* Previous */

    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="#" data-page="prev">
                Previous
            </a>
        </li>
    `;

    /* Page Numbers */

    for (let i = 1; i <= totalPages; i++) {

        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#" data-page="${i}">
                    ${i}
                </a>
            </li>
        `;

    }

    /* Next */

    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#" data-page="next">
                Next
            </a>
        </li>
    `;

}

function setupPaginationEvents(totalPages) {

    if (!pagination) return;

    pagination.querySelectorAll(".page-link").forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const page = this.dataset.page;

            if (page === "prev") {

                if (currentPage > 1) {

                    currentPage--;

                }

            }

            else if (page === "next") {

                if (currentPage < totalPages) {

                    currentPage++;

                }

            }

            else {

                currentPage = Number(page);

            }

            updateResources();

        });

    });

}

function renderResources(list) {

    if (list.length === 0) {

        container.innerHTML = `
        <div class="col-12 text-center text-muted py-5">
            No matching resources found.
        </div>`;
        return;
    }

    let html = "";

    list.forEach(item => {

        html += cardHTML(item);

    });

    container.innerHTML = html;
  container.querySelectorAll(".download-btn").forEach(btn => {

    btn.addEventListener("click", handleDownload);

});

}

function searchResources(keyword) {

    keyword = keyword.trim().toLowerCase();

    if (keyword === "") {

        renderResources(allResources);
        return;

    }

    const filtered = allResources.filter(item => {

        return (
            (item.title || "").toLowerCase().includes(keyword) ||
            (item.description || "").toLowerCase().includes(keyword) ||
            (item.category || "").toLowerCase().includes(keyword) ||
            formatFileSize(item.size).toLowerCase().includes(keyword)
        );

    });

    renderResources(filtered);

}

function filterResources() {

    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "") {

        renderResources(allResources);
        return;

    }

    const filtered = allResources.filter(item =>

        item.category === selectedCategory

    );

    renderResources(filtered);

}


async function handleDownload(e) {

    e.preventDefault();

    const btn = e.currentTarget;

    const id = btn.dataset.id;

    const url = btn.dataset.url;

    try {

        await updateDoc(doc(db, "resources", id), {

            downloads: increment(1)

        });

    } catch (err) {

        console.error("Download counter failed:", err);

    }

    window.open(url, "_blank");

}
loadResources();

/*====================================
SEARCH RESOURCES
====================================*/

const searchInput = document.getElementById("resourceSearch");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        currentPage = 1;

        updateResources();

    });

}

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        currentPage = 1;

        updateResources();

    });

}

if (sortSelect) {

    sortSelect.addEventListener("change", function () {

        currentPage = 1;

        updateResources();

    });

}

if (pageSizeSelect) {

    pageSizeSelect.addEventListener("change", function () {

        currentPage = 1;

        updateResources();

    });

}

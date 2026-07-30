/*==================================================
ARVIND DIGITAL HUB
assets/js/resource.js
==================================================*/

console.log("Resource Details Page Loaded");

/*====================================
GET RESOURCE ID FROM URL
====================================*/

const params = new URLSearchParams(window.location.search);

const resourceId = params.get("id");

console.log("Resource ID:", resourceId);

/*====================================
CHECK URL
====================================*/

if (!resourceId) {

    document.getElementById("resourceTitle").textContent =
        "Resource Not Found";

    document.getElementById("resourceDescription").textContent =
        "No resource ID was supplied in the URL.";

}

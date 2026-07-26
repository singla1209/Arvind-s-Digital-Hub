/*==================================================
ACCOUNTS EXPERT
assets/js/app.js
==================================================*/

"use strict";

/*========================
PRELOADER
========================*/

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";

            setTimeout(() => {
                preloader.remove();
            }, 500);

        }, 600);
    }
});

/*========================
SIDEBAR
========================*/

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function openMenu() {

    sidebar.classList.add("active");
    overlay.classList.add("active");

}

function closeMenu() {

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

}

if(menuBtn){

menuBtn.addEventListener("click",openMenu);

}

if(closeBtn){

closeBtn.addEventListener("click",closeMenu);

}

if(overlay){

overlay.addEventListener("click",closeMenu);

}

/*========================
BACK TO TOP
========================*/

const backBtn = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>350){

backBtn.style.display="block";

}else{

backBtn.style.display="none";

}

});

if(backBtn){

backBtn.onclick=()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

};

}

/*========================
SEARCH COURSE
========================*/

const search=document.querySelector(".search-box input");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".course-card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"flex":"none";

});

});

}

/*========================
COURSE HOVER
========================*/

document.querySelectorAll(".course-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-8px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

/*========================
DARK MODE
========================*/

const darkSwitch=document.getElementById("darkMode");

if(darkSwitch){

if(localStorage.getItem("theme")=="dark"){

document.body.classList.add("dark");

darkSwitch.checked=true;

}

darkSwitch.addEventListener("change",()=>{

if(darkSwitch.checked){

document.body.classList.add("dark");

localStorage.setItem("theme","dark");

}else{

document.body.classList.remove("dark");

localStorage.setItem("theme","light");

}

});

}

/*========================
COUNTER
========================*/

document.querySelectorAll(".counter").forEach(counter=>{

counter.innerText="0";

const update=()=>{

const target=+counter.dataset.target;

const current=+counter.innerText;

const increment=target/80;

if(current<target){

counter.innerText=Math.ceil(current+increment);

setTimeout(update,20);

}else{

counter.innerText=target;

}

};

update();

});

/*========================
REVEAL ANIMATION
========================*/

const reveal=()=>{

const elements=document.querySelectorAll(".fade-up,.fade-left,.fade-right,.zoom-in");

elements.forEach(el=>{

const top=el.getBoundingClientRect().top;

const visible=window.innerHeight-80;

if(top<visible){

el.classList.add("show");

}

});

};

window.addEventListener("scroll",reveal);

reveal();

/*========================
BOOTSTRAP TOOLTIP
========================*/

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(item=>{

new bootstrap.Tooltip(item);

});

/*========================
AUTO ACTIVE MENU
========================*/

const page=location.pathname.split("/").pop();

document.querySelectorAll(".bottom-nav a").forEach(link=>{

const href=link.getAttribute("href");

if(href===page || (page==="" && href==="index.html")){

link.classList.add("active");

}else{

link.classList.remove("active");

}

});

/*========================
WHATSAPP
========================*/

const whatsapp=document.querySelector(".whatsapp-btn");

if(whatsapp){

whatsapp.addEventListener("click",(e)=>{

e.preventDefault();

window.open(

"https://wa.me/911234567890",

"_blank"

);

});

}

/*========================
NOTIFICATION DEMO
========================*/

const bell=document.querySelector(".notification");

if(bell){

bell.addEventListener("click",()=>{

alert("No new notifications.");

});

}

/*========================
END
========================*/
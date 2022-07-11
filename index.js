let toggleNavStatus = false;

const menuButton = document.querySelector('div.btn-toggle-nav');

console.log(menuButton)

let toggleNav = function() {
    let getSidebar = document.querySelector(".sidebar");
    let getSidebarUl = document.querySelector(".sidebar ul");
    let getSidebarTitle = document.querySelector(".sidebar span");
    let getSidebarLinks = document.querySelectorAll(".sidebar a");



    if (toggleNavStatus === false) {
        getSidebarUl.style.visibility = "visible";
        menuButton.style.width = "300px";
        getSidebar.style.width = "290px";
        getSidebarTitle.style.opacity = "0.5";

        for (let i = 0; i < getSidebarLinks.length; i++) {
            getSidebarLinks[i].style.opacity = "1";
        }

        toggleNavStatus = true;
    } else if (toggleNavStatus === true) {
        getSidebar.style.width = "90px";
        menuButton.style.width = "100px";
        getSidebarTitle.style.opacity = "0";

        for (let i = 0; i < getSidebarLinks.length; i++) {
            getSidebarLinks[i].style.opacity = "0";
        }

        getSidebarUl.style.visibility = "hidden";

        toggleNavStatus = false;
    }
}

menuButton.addEventListener('click', toggleNav)
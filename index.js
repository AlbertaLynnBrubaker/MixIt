let toggleNavStatus = false;

const menuButton = document.querySelector('.btn-toggle-nav');
const cocktailName = document.querySelector('#cocktail-name');
const searchForm = document.querySelector('#search');
const baseUrl = 'www.thecocktaildb.com/api/json/v1/1/';
const byName = 'search.php?s='
const byIngredient = 'filter.php?i='
const byLetter = 'search.php?f='
const random = 'random.php'

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

cocktailName.addEventListener('click', (e) => {
  searchForm.style.visibility = 'visible';
})

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  handleForm(e);
})

function handleForm(e) {
  const input = e.target.input.value;

  console.log(input);
}

menuButton.addEventListener('click', toggleNav)
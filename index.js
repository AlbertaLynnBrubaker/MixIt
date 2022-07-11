let toggleNavStatus = false;

const menuButton = document.querySelector('.btn-toggle-nav');
const cocktailName = document.querySelector('#cocktail-name');
const mainIngredient = document.querySelector('#main-ingredient');
const firstLetter = document.querySelector('#first-letter');
const nameSearchForm = document.querySelector('#search-name');
const ingredientSearchForm = document.querySelector('#search-ingredient');
const letterDropdown = document.querySelector('#letter-dropdown');
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
const byName = 'search.php?s=';
const byIngredient = 'filter.php?i=';
const byLetter = 'search.php?f=';
const random = 'random.php';

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
  ingredientSearchForm.style.display = 'none';
  nameSearchForm.style.display = 'block';
})

mainIngredient.addEventListener('click', (e) => {
  nameSearchForm.style.display = 'none';
  ingredientSearchForm.style.display = 'block';
})

firstLetter.addEventListener('click', () => {
  populateLetterDropdown();
  letterDropdown.style.display = 'block';
})

// Create random cocktail listener

nameSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const input = e.target.input.value;

  fetchRequest(byName, input)
  .then(data => console.log(data));
})

ingredientSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const input = e.target.input.value;

  fetchRequest(byIngredient, input)
  .then(data => console.log(data));
})

function fetchRequest(trailingUrl, input) {
  return fetch(baseUrl + trailingUrl + input)
  .then(res => res.json())
}

function populateLetterDropdown() {
  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
  ]

  alphabet.forEach(letter => {
    const option = document.createElement('option');

    option.value = letter.toLowerCase();
    option.textContent = letter;

    letterDropdown.append(option);
  })
}

menuButton.addEventListener('click', toggleNav)
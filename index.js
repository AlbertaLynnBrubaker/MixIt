let toggleNavStatus = false;

const menuButton = document.querySelector('.btn-toggle-nav');
const cocktailName = document.querySelector('#cocktail-name');
const mainIngredient = document.querySelector('#main-ingredient');
const firstLetter = document.querySelector('#first-letter');
const randomCocktail = document.querySelector('#random-cocktail');
const nameSearchForm = document.querySelector('#search-name');
const ingredientSearchForm = document.querySelector('#search-ingredient');
const letterDropdown = document.querySelector('#letter-dropdown');
const searchForms = document.querySelectorAll('.search');
const drinksContainer = document.querySelector('#drinks-container');
const drinksListContainer = document.querySelector('#drink-list');
const detailContainer = document.querySelector('#drink-details');
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
        drinksContainer.style.marginLeft = "320px"
        drinksContainer.style.width = "calc(100% - 320px)"

        for (let i = 0; i < getSidebarLinks.length; i++) {
            getSidebarLinks[i].style.opacity = "1";
        }

        toggleNavStatus = true;
    } else if (toggleNavStatus === true) {
        getSidebar.style.width = "90px";
        menuButton.style.width = "100px";
        getSidebarTitle.style.opacity = "0";
        drinksContainer.style.marginLeft = "120px"
        drinksContainer.style.width = "calc(100% - 120px)"

        for (let i = 0; i < getSidebarLinks.length; i++) {
            getSidebarLinks[i].style.opacity = "0";
        }

        getSidebarUl.style.visibility = "hidden";

        toggleNavStatus = false;
    }
}

function renderList(data) {
    drinksListContainer.innerHTML = ''

    renderDrinkCard(data.drinks[0])

    data.drinks.forEach(drink => {
        console.log(drink)
        const drinkItem = document.createElement('p');
        const drinkThumb = document.createElement('img');
        drinkThumb.className = "drink-thumb";

        drinkThumb.src = drink.strDrinkThumb;
        
        drinkItem.textContent = drink.strDrink;
        drinkItem.prepend(drinkThumb)
        drinksListContainer.append(drinkItem);

        drinkItem.addEventListener('click', () => renderDrinkCard(drink))
    })
}

function renderDrinkCard(drink) {
    detailContainer.innerHTML = ''
    const detailName = document.createElement('h3')
    const detailImage = document.createElement('img')
    const ingredientsTitle = document.createElement('h4')
    const detailIngredients = document.createElement('ul')
    const instructionsTitle = document.createElement('h4')
    const detailInstructions = document.createElement('p')
    const glassTitle = document.createElement('h4')
    const glassType = document.createElement('p')
    
    detailImage.className = "detail-image"
    detailName.textContent = drink.strDrink;
    detailImage.src = drink.strDrinkThumb;

    instructionsTitle.textContent = 'Instructions: '
    ingredientsTitle.textContent = 'Ingredients:'

    detailInstructions.textContent = drink.strInstructions;

    glassTitle.textContent = 'Glass: '
    glassType.textContent = drink.strGlass;

    const drinkIngredients = [];
    for (let i = 1; i < 16 ; i++) {
        if(drink[`strIngredient${i}`] === null) {
            break;
        }
        const ingredientString = drink[`strMeasure${i}`] + ' of ' + drink[`strIngredient${i}`]
        drinkIngredients.push(ingredientString)
    }
    drinkIngredients.forEach(ingredient => {
        const detailIngredient = document.createElement('li')
        detailIngredient.textContent = ingredient
        detailIngredients.append(detailIngredient)
    })

    detailContainer.append(
      detailName, 
      detailImage, 
      glassTitle, 
      glassType, 
      ingredientsTitle, 
      detailIngredients, 
      instructionsTitle, 
      detailInstructions
      )
}
cocktailName.addEventListener('click', (e) => {
  drinksListContainer.style.display = ''
  drinksListContainer.innerHTML = ''
    searchForms.forEach(searchForm => {
        searchForm.style.display = 'none'
    })
//   ingredientSearchForm.style.display = 'none';
  nameSearchForm.style.display = 'block';
})

mainIngredient.addEventListener('click', (e) => {
    searchForms.forEach(searchForm => {
        searchForm.style.display = 'none'
    })
//   nameSearchForm.style.display = 'none';
  ingredientSearchForm.style.display = 'block';
})

firstLetter.addEventListener('click', () => {
    searchForms.forEach(searchForm => {
        searchForm.style.display = 'none'
    })

  populateLetterDropdown();
  letterDropdown.style.display = 'block';
})

letterDropdown.addEventListener('change', (e) => {
  fetchRequest(byLetter, e.target.value)
  .then(renderList)
})

// Create random cocktail listener
randomCocktail.addEventListener('click', () => {
  drinksListContainer.style.display = 'none'
  detailContainer.style.width = '100%'

  fetchRequest(random)
  // .then(drink => console.log(drink.drinks))
  .then(drink => {
    renderDrinkCard(drink.drinks[0])
  })
})

nameSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const input = e.target.input.value;

  fetchRequest(byName, input)
  .then(renderList);

  nameSearchForm.reset();
})

ingredientSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const input = e.target.input.value;

  fetchRequest(byIngredient, input)
  .then(renderList);

  ingredientSearchForm.reset();
})

function fetchRequest(trailingUrl, input = '') {
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
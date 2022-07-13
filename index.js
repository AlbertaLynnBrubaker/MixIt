let toggleNavStatus = false;

const menuButton = document.querySelector('.btn-toggle-nav');
const headerMain = document.querySelector('.main');
const cocktailName = document.querySelector('#cocktail-name');
const mainIngredient = document.querySelector('#main-ingredient');
const firstLetter = document.querySelector('#first-letter');
const randomCocktail = document.querySelector('#random-cocktail');
const nameSearchForm = document.querySelector('#search-name');
const ingredientSearchForm = document.querySelector('#search-ingredient');
const letterDropdown = document.querySelector('#letter-dropdown');
const searchForms = document.querySelectorAll('.search');
const drinksListContainer = document.querySelector('#drink-list');
const detailContainer = document.querySelector('#drink-details');
const byName = 'search.php?s=';
const byIngredient = 'filter.php?i=';
const byLetter = 'search.php?f=';
const random = 'random.php';

function toggleNav() {
    const getSidebar = document.querySelector(".sidebar");
    const getSidebarUl = document.querySelector(".sidebar ul");
    const getSidebarTitle = document.querySelector(".sidebar span");
    const getSidebarLinks = document.querySelectorAll(".sidebar a");
    const drinksContainer = document.querySelector('#drinks-container');

    if (toggleNavStatus === false) {
        getSidebarUl.style.visibility = "visible";
        menuButton.style.width = "300px";
        getSidebar.style.width = "290px";
        getSidebarTitle.style.opacity = "0.5";
        drinksContainer.style.marginLeft = "320px";
        drinksContainer.style.width = "calc(100% - 320px)";
        headerMain.style.marginLeft = '300px';

        for (let i = 0; i < getSidebarLinks.length; i++) {
            getSidebarLinks[i].style.opacity = "1";
        }

        toggleNavStatus = true;
    } else if (toggleNavStatus === true) {
        getSidebar.style.width = "90px";
        menuButton.style.width = "100px";
        getSidebarTitle.style.opacity = "0";
        drinksContainer.style.marginLeft = "120px";
        drinksContainer.style.width = "calc(100% - 120px)";
        headerMain.style.marginLeft = '100px';

        for (let i = 0; i < getSidebarLinks.length; i++) {
            getSidebarLinks[i].style.opacity = "0";
        }

        getSidebarUl.style.visibility = "hidden";

        toggleNavStatus = false;
    }
}

// Render functions
function renderList(data) {
    drinksListContainer.innerHTML = '';

    fetchRequest(byName, data.drinks[0].strDrink)
        .then(drink => renderDrinkCard(drink.drinks[0]));

    data.drinks.forEach(drink => {
        const drinkListItem = document.createElement('li');
        const drinkName = document.createElement('h3');
        const drinkThumb = document.createElement('img');
        drinkThumb.className = "drink-thumb";
        drinkListItem.className = "drink-list-item";

        drinkThumb.src = drink.strDrinkThumb;
        
        drinkName.textContent = drink.strDrink;
        drinkListItem.append(drinkThumb);
        drinkListItem.append(drinkName);
        drinksListContainer.append(drinkListItem);

        drinkListItem.addEventListener('click', () => {
          fetchRequest(byName, drink.strDrink)
          .then(drink => renderDrinkCard(drink.drinks[0]));
        })
    })
}

function renderDrinkCard(drink) {
    detailContainer.innerHTML = '';
    const detailName = document.createElement('h3');
    const detailImage = document.createElement('img');
    const ingredientsTitle = document.createElement('h4');
    const detailIngredients = document.createElement('ul');
    const instructionsTitle = document.createElement('h4');
    const detailInstructions = document.createElement('p');
    const glassTitle = document.createElement('h4');
    const glassType = document.createElement('p');
    
    detailImage.className = "detail-image";
    detailName.textContent = drink.strDrink;
    detailImage.src = drink.strDrinkThumb;

    instructionsTitle.textContent = 'Instructions: ';
    ingredientsTitle.textContent = 'Ingredients:';

    detailInstructions.textContent = drink.strInstructions;

    glassTitle.textContent = 'Glass: ';
    glassType.textContent = drink.strGlass;

    const drinkIngredients = [];
    let ingredientString;
    for (let i = 1; i < 16 ; i++) {
        if(drink[`strIngredient${i}`] === null) {
            break;
        } else if (drink[`strMeasure${i}`] === null) {
          ingredientString = drink[`strIngredient${i}`];
        } else {
          ingredientString = drink[`strMeasure${i}`] + ' ' + drink[`strIngredient${i}`];
        }
        drinkIngredients.push(ingredientString);
    }
    
    drinkIngredients.forEach(ingredient => {
        const detailIngredient = document.createElement('li')
        detailIngredient.textContent = ingredient
        detailIngredients.append(detailIngredient)
    })

    detailContainer.append(
      detailName, detailImage, glassTitle, glassType, 
      ingredientsTitle, detailIngredients, instructionsTitle, detailInstructions
    )
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

// Event listeners
cocktailName.addEventListener('click', (e) => {
    drinksListContainer.style.display = ''
    drinksListContainer.innerHTML = ''
    searchForms.forEach(searchForm => {
        searchForm.style.display = 'none'
    })
  nameSearchForm.style.display = 'block';
})

mainIngredient.addEventListener('click', (e) => {
    drinksListContainer.style.display = ''
    drinksListContainer.innerHTML = ''
    searchForms.forEach(searchForm => {
        searchForm.style.display = 'none'
    })
    ingredientSearchForm.style.display = 'block';
})

firstLetter.addEventListener('click', () => {
    drinksListContainer.style.display = ''
    drinksListContainer.innerHTML = ''
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

randomCocktail.addEventListener('click', () => {
    drinksListContainer.style.display = 'none'
    detailContainer.style.width = '100%'
    searchForms.forEach(searchForm => {
        searchForm.style.display = 'none'
    })

    fetchRequest(random)
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

menuButton.addEventListener('click', toggleNav)

// Fetch Request
function fetchRequest(trailingUrl, input = '') {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/' + trailingUrl + input)
    .then(res => res.json())
}
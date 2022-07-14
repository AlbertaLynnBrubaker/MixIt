# Mix It: A Cocktail Search Engine

created by Alie Brubaker and Lucas Duncan using TheCocktailDB API

### Table of Contents:

1. Introduction
2. Project Mockup Presentation
3. How to Use Mix It
4. Accessing the API Source Material

## 1. Introduction

Mix It is a project we created for our inaugural phase as students at Flatiron School demonstrating our understanding of the basic tenets of front-end web application design. It is intended to show our capability of designing an SPA (single page application) using HTML, CSS and vanilla JavaScript. Specifically, it targets the use of event listeners, array iteration, and the use of server requests to get resources from a public API database that we then display in the DOM.

This project is a class project and is not intended for distribution purposes. Please seek out the publisher of [TheCocktailDB](https://www.thecocktaildb.com/contact.php) API to obtain permission for commercial use.

## 2. Project Mockup Presentation

When we pitched the project, we used a simple mockup created as a slideshow illustrating various stages of the end user's experience. That slideshow is available [here](https://docs.google.com/presentation/d/1PNzkMHKk4ll6-19h50aMxs0NGXd24IoVy_FTUnB8D0o/edit?usp=sharing).

## 3. How to Use Mix It

We decided to use a minimalist approach to the pagefront when the end user loads the page. The menu symbol is basically ubiquitous in webpage and smartphone UI design, so we felt safe letting our user determine that was the starting point for their experience using our search engine. 

Simply click the menu button, which opens the navigation context menu on the left side of the page. Choose which search option you wish to begin your search between: 

- Cocktail Name
- First Letter of Cocktail
- Drink Ingredient
- Random Cocktail

Each of the first three menu buttons will open a form in the header of the page, which allows the user to input their chosen cocktail or ingredient. Providing an input and clicking the submit button or selecting which letter each cocktail name should begin with will retreive and list the matching cocktails in the body of the page.

Finally, clicking on any of the cocktails in the list will load the details of the selected cocktail including an image, the type of glass to use, the ingredients involved in making the drink, what measures of each ingredient should be used, and the instructions on how to make the drink.

The final menu item in the sidebar will load the details of a cocktail randomly in the body of the page.

Remember to drink responsibly!

## Accessing the API Source Material

We used [TheCocktailDB](https://www.thecocktaildb.com/api.php) as the API for our project. The creator of the API can be reached at: [thedatadb@gmail.com](mailto:thedatadb@gmail.com).
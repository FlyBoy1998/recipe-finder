import apiKey from "./api.js";

const recipeInput = document.getElementById('recipe-search');
const recipesContainer = document.querySelector('.recipes-container');
const searchButton = document.querySelector('.search-button');

let userInput = '';

async function fetchData() {
    recipesContainer.innerHTML = 'Loading...';
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&apiKey=${apiKey}&number=24`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    const recipesContent = results.map((recipe) => {
        const {image: imageSrc, title} = recipe;
        return `
            <div class="recipe">
                <div class="recipe-image">
                    <img src="${imageSrc}" alt="${title}">
                </div>
                <h3 class="recipe-title">${title}</h3>
            </div>
        `
    }).join(''); 
    recipesContainer.innerHTML = recipesContent;
}

function searchRecipe(e) {
    e.preventDefault();
    userInput = recipeInput.value;
    console.log(userInput);
    fetchData();
}

searchButton.addEventListener('click', searchRecipe);
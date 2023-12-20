import apiKey from "./api.js";

const recipeInput = document.getElementById('recipe-search');
const recipesContainer = document.querySelector('.recipes-container');
const searchButton = document.querySelector('.search-button');
const paginationButtons = document.querySelector('.pagination-buttons');
const loader = document.querySelector('.loader');

let userInput = '';
let index = 0;
let recipeData = await fetchData();
let pages = paginate(recipeData);
console.log(pages);

async function fetchData() {
    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&apiKey=${apiKey}&number=24`;
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        return results;
    } catch (error) {
        console.log(error);
        recipesContainer.innerHTML = 'Sorry, there was an error!'
    }
}



function createRecipeElements(recipes) {
    recipesContainer.innerHTML = '';
    loader.classList.add('loader-visible');
    const recipesContent = recipes.map((recipe) => {
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
    loader.classList.remove('loader-visible');
    recipesContainer.innerHTML = recipesContent;
}

function searchRecipe(e) {
    userInput = recipeInput.value;
    e.preventDefault();
    console.log(userInput);
    setupUI();
}

function paginate(recipes) {
    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(recipes.length / itemsPerPage);
    const newRecipes = Array.from({ length: numberOfPages } , (_, index) => {
        const start = index * itemsPerPage;
        return recipes.slice(start, start + itemsPerPage);
    })
    return newRecipes;
}

function displayButtons(container, pages, activeIndex) {
    let btns = pages.map((_, pageIndex) => {
        return `
        <button class="page-btn ${activeIndex === pageIndex ? 'active' : 'null'}" data-index='${pageIndex}'">${pageIndex + 1}</button>
        `
    })
    container.innerHTML = btns.join('');
}

function setupUI() {
    createRecipeElements(pages[index]);
    displayButtons(paginationButtons, pages, index);
}

paginationButtons.addEventListener('click', (e) => {
    index = parseInt(e.target.dataset.index);
    console.log(index);
    setupUI();
})

searchButton.addEventListener('click', searchRecipe);
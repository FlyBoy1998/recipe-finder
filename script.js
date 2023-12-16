import apiKey from "./api.js";

const url = `https://api.spoonacular.com/recipes/complexSearch?query=risotto&apiKey=${apiKey}`;

async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}
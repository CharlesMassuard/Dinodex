import { fonduHeader } from "./header.js";
import DinosaursProvider from "../services/dinosaursProvider.js";
import FoodProvider from "../services/nourritureProvider.js";

let searchbar = document.getElementById("searchBar");

let dinosaurs = await DinosaursProvider.fetchDinosaurs();

let foods = await FoodProvider.fetchFoods();

searchbar.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        research(e.target.value);
    }
});

let loupe = document.getElementById("loupe");

loupe.addEventListener('click', function(e) {
    research(searchbar.value);
});

function research(value) {
    fonduHeader();
    let trouve = false;
    let search = value.toLowerCase();
    if(search.toLowerCase() === "dino" || search.toLowerCase() === "dinosaure" || search.toLowerCase() === "dinosaures" || search.toLowerCase() === "dinos") {
        window.location.href = "#/dinosaurs";
        trouve = true;
    } else if(search.toLowerCase() === "nourriture" || search.toLowerCase() === "nourritures") {
        window.location.href = "#/nourritures";
        trouve = true;
    } else if(search.toLowerCase() === "favoris" || search.toLowerCase() === "fav" || search.toLowerCase() === "favori"){
        window.location.href = "#/favoris";
        trouve = true;
    }
    dinosaurs.forEach(dino => {
        if(dino.nom.toLowerCase() === search.toLowerCase()) {
            window.location.href = `#/dinosaurs/${dino.id}`;
            trouve = true;
        }
    });
    foods.forEach(food => {
        if(food.nom.toLowerCase() === search.toLowerCase()) {
            window.location.href = `#/nourritures/${food.id}`;
            trouve = true;
        }
    });
    if(!trouve){
        window.location.href = `#/search/${search}`;
    }
}


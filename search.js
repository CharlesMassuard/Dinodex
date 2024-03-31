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
    let resultsFoods = [];
    let resultsDinos = [];
    let search = value.toLowerCase();
    dinosaurs.forEach(dino => {
        if(dino.nom.toLowerCase() === search.toLowerCase()) {
            window.location.href = `#/dinosaurs/${dino.id}`;
        }
        if (dino.nom.toLowerCase().includes(search.toLowerCase())) {
            resultsDinos.push(dino);
        }
    });
    foods.forEach(food => {
        if(food.nom.toLowerCase() === search.toLowerCase()) {
            window.location.href = `#/nourritures/${food.id}`;
        }
        if (food.nom.toLowerCase().includes(search.toLowerCase())) {
            resultsFoods.push(food);
        }
    });
    
}
    
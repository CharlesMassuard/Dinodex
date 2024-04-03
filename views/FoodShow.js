import NourritureProvider from "../services/nourritureProvider.js";
import Utils from '../services/utils.js';
import Nourriture from "../models/nourriture.js";

export default class FoodShow {
    async render() {
        
        let food = new Nourriture();
        let request = Utils.parseRequestURL();
        food = await NourritureProvider.getFood(request.id);
        document.title = `Dinodex | ${food.nom}`;

        let isFavoris;
        let favoris = localStorage.getItem("favorisFoods");
        if(favoris){
            isFavoris = favoris.includes(food.id);
        } else {
            isFavoris = false;
        }

        let foodShow = document.createElement("div");
        foodShow.setAttribute("id", "food");
        foodShow.innerHTML = `
            <div id="showItem">
                <div id="lineItem">
                    <div id="descItem">
                        <h2>${food.nom}</h2>
                        <p>${food.desc}</p>
                        <input type="button" id="buttonFavoris" value="${isFavoris ? "Retirer des favoris" : "Mettre en favoris"}" onclick="favorisFoods(${food.id})">
                    </div>
                    <div id="imgItem">
                        <img src="${food.image}" alt="${food.nom}">
                    </div>
                </div>
            </div>
        `;
        return foodShow.outerHTML;  
    }
}

window.favorisFoods = function(idFood){
    var fav = localStorage.getItem('favorisFoods');
    if (fav) {
        fav = JSON.parse(fav);
    } else {
        fav = [];
    }
    if(fav.includes(idFood)){
        fav = fav.filter(f => f != idFood);
    } else {
        fav.push(idFood);
    }
    localStorage.setItem('favorisFoods', JSON.stringify(fav));
    document.getElementById("buttonFavoris").value = fav.includes(idFood) ? "Retirer des favoris" : "Mettre en favoris";
}
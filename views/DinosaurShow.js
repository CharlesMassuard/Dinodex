import DinosaursProvider from "../services/dinosaursProvider.js";
import NourritureProvider from "../services/nourritureProvider.js";
import Dinosaurs from "../models/dinosaurs.js";
import Utils from '../services/utils.js';

export default class DinosaurShow {
    async render() {
        
        let dinosaur = new Dinosaurs();
        let request = Utils.parseRequestURL();
        dinosaur = await DinosaursProvider.getDinosaur(request.id);

        let foodsDino = dinosaur.food;
        let allFoods = await NourritureProvider.fetchFoods();
        let foods = [];
        foodsDino.forEach(food => {
            let foodD = allFoods.find(f => f.id == food);
            foods.push(foodD);
        });

        let favoris = localStorage.getItem("favoris");
        let isFavoris = favoris.includes(dinosaur.id);
        let value = "";

        let dinosaurShow = document.createElement("div");
        dinosaurShow.setAttribute("id", "dinosaur");
        dinosaurShow.innerHTML = `
            <div id="showDino">
                <h1>${dinosaur.nom}</h1>
                ${isFavoris ? value = "Retirer des favoris" : value = "Mettre en favoris"}
                <input type="button" id="buttonFavoris" value="${value}" onclick="favoris(${dinosaur.id})">
                <img src="${dinosaur.image}" alt="${dinosaur.nom}">
                <p>${dinosaur.description}</p>
                <h1>Alimentation</h1>
                <ul>
                    ${foods.map(food => `
                        <li>
                            <a href="#/nourritures/${food.id}">
                                <h2>${food.nom}</h2>
                                <img src="${food.image}" alt="${food.nom}">
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
        `;
        return dinosaurShow.outerHTML;
    }
}

window.favoris = function(idDino){
    var fav = localStorage.getItem('favoris');
    if (fav) {
        fav = JSON.parse(fav);
    } else {
        fav = [];
    }
    if(fav.includes(idDino)){
        fav = fav.filter(f => f != idDino);
    } else {
        fav.push(idDino);
    }
    localStorage.setItem('favoris', JSON.stringify(fav));
    document.getElementById("buttonFavoris").value = fav.includes(idDino) ? "Retirer des favoris" : "Mettre en favoris";
}
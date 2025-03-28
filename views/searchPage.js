import DinosaursProvider from "../services/dinosaursProvider.js";
import FoodProvider from "../services/nourritureProvider.js";
import Utils from '../services/utils.js';

export default class SearchPage {
    async render() {
        document.title = "Dinodex | Recherche";
        let request = Utils.parseRequestURL();
        let search = request.id;

        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        let foods = await FoodProvider.fetchFoods();

        let resultatsDinos = [];
        let resultatsFoods = [];

        for(let i = 0; i < dinosaurs.length; i++) {
            if(dinosaurs[i].nom.toLowerCase().includes(search.toLowerCase())) {
                resultatsDinos.push(dinosaurs[i]);
            }
        }
        for(let i = 0; i < foods.length; i++) {
            if(foods[i].nom.toLowerCase().includes(search.toLowerCase())) {
                resultatsFoods.push(foods[i]);
            }
        }

        let searchPage = document.createElement("div");
        searchPage.setAttribute("id", "listView");
        let ol = document.createElement("ol");

        if(resultatsDinos.length == 0 && resultatsFoods.length == 0){
            let noResult = document.createElement("div");
            noResult.innerHTML = `
                <div id="noFavoris">
                    <img src="https://media.tenor.com/5plaXY9f1uAAAAAj/dino-dinosaur.gif" alt="Dinosaure triste">    
                    <h1>Aucun résultat</h1>
                    <input type="button" id="buttonFavoris" value="Retour à l'accueil" onclick="window.location.href = '#/'">
                </div>
            `
            return noResult.outerHTML;
        } else {
            let p = document.createElement("p");
            p.innerHTML = `Résultats pour <i>"${search}"</i> :`;
            searchPage.appendChild(p);
            if(resultatsDinos.length > 0){
                resultatsDinos.forEach(dinosaur => {
                    let li = document.createElement("li");
                    li.innerHTML = `
                        <a href="#/dinosaurs/${dinosaur.id}">
                            <figure>
                                <img src="${dinosaur.image}" alt="${dinosaur.nom}">
                                <figcaption>"${dinosaur.nom}"</figcaption>
                            </figure>
                        </a>
                    `;
                    ol.appendChild(li);
                });
            }
            
            if(resultatsFoods.length > 0){
                resultatsFoods.forEach(food => {
                    let li = document.createElement("li");
                    li.innerHTML = `
                        <a href="#/nourritures/${food.id}">
                            <figure>
                                <img src="${food.image}" alt="${food.nom}">
                                <figcaption>"${food.nom}"</figcaption>
                            </figure>
                        </a>
                    `;
                    ol.appendChild(li);
                });
            }
        }
        
        searchPage.appendChild(ol);
        return searchPage.outerHTML;
    }
}
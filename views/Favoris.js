import { fonduHeader } from "../header.js";
import DinosaursProvider from "../services/dinosaursProvider.js";
import FoodProvider from "../services/nourritureProvider.js";

export default class favorisDinos{
    async render(){

        document.title = "Dinodex | Favoris";
        let favorisDinos = localStorage.getItem("favorisDinos");
        favorisDinos = JSON.parse(favorisDinos);
        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        let foods = await FoodProvider.fetchFoods();

        let favorisFoods = localStorage.getItem("favorisFoods");
        favorisFoods = JSON.parse(favorisFoods);

        let favoris = document.createElement("div");
        favoris.setAttribute("id", "listView");
        let olDinos = document.createElement("ol");
        let olFoods = document.createElement("ol");

        if(favorisDinos.length == 0 && favorisFoods.length == 0){
            let nofavorisDinos = document.createElement("div");
            nofavorisDinos.innerHTML = `
                <div id="noFavoris">
                    <img src="https://media.tenor.com/5plaXY9f1uAAAAAj/dino-dinosaur.gif" alt="Dinosaure triste">    
                    <h1>Vous n'avez pas de favoris</h1>
                    <input type="button" id="buttonFavoris" value="Ajouter des favoris" onclick="window.location.href = '#/dinosaurs'">
                </div>
            `
            return nofavorisDinos.outerHTML;
        } else {
            let buttonDeleteFavoris = document.createElement("input");
            buttonDeleteFavoris.setAttribute("type", "button");
            buttonDeleteFavoris.setAttribute("id", "buttonDeleteFavoris");
            buttonDeleteFavoris.setAttribute("value", "Supprimer tous les favoris");
            buttonDeleteFavoris.setAttribute("onclick", "deleteAllFavoris()");
            favoris.appendChild(buttonDeleteFavoris);
            if(favorisDinos.length > 0){
                let titre = document.createElement("h1");
                titre.setAttribute("id", "centeredSection");
                titre.innerHTML = "Dinosaures favoris";
                favoris.appendChild(titre);
                favorisDinos.forEach(id => {
                    let li = document.createElement("li");
                    let dino = dinosaurs.find(d => d.id == id);
                    let dinosAmeliores = localStorage.getItem("dinosAmeliores");
                    if(dinosAmeliores){
                        dinosAmeliores = JSON.parse(dinosAmeliores);
                    } else {
                        dinosAmeliores = [];
                    }
                    let isAmeliore = false;
                    for (let i = 0; i < dinosAmeliores.length; i++) {
                        let dinosaurId = parseInt(dino.id);
                        if (dinosAmeliores[i] === dinosaurId) {
                            dino.image = dino.tekImage;
                            dino.nom = "TEK " + dino.nom;
                            isAmeliore = true;
                        }
                    }
                    li.innerHTML = `
                        <a href="#/dinosaurs/${dino.id}">
                            <figure>
                                <img src="${dino.image}" alt="${dino.nom}">
                                <figcaption>"${dino.nom}"</figcaption>
                            </figure>
                        </a>
                    `;
                    olDinos.appendChild(li);
                });
                favoris.appendChild(olDinos);
            }
            if(favorisFoods.length > 0){
                let titreFoods = document.createElement("h1");
                titreFoods.setAttribute("id", "centeredSection");
                titreFoods.innerHTML = "Nourritures favorites";
                favoris.appendChild(titreFoods);
                favorisFoods.forEach(id => {
                    let li = document.createElement("li");
                    let food = foods.find(f => f.id == id);
                    li.innerHTML = `
                        <a href="#/nourritures/${food.id}">
                            <figure>
                                <img src="${food.image}" alt="${food.nom}">
                                <figcaption>"${food.nom}"</figcaption>
                            </figure>
                        </a>
                    `;
                    olFoods.appendChild(li);
                });
                favoris.appendChild(olFoods);
            }
            return favoris.outerHTML;
        }
    }
}

window.deleteAllFavoris = function(){
    if(confirm("Êtes-vous sûr de vouloir supprimer tous les favoris ? Cette action est irrévocable.")){
        localStorage.setItem("favorisDinos", JSON.stringify([]));
        localStorage.setItem("favorisFoods", JSON.stringify([]));
        window.location.reload();
    }
}
import DinosaursProvider from "../services/dinosaursProvider.js";
import NourritureProvider from "../services/nourritureProvider.js";
import Dinosaurs from "../models/dinosaurs.js";
import Utils from '../services/utils.js';

export default class DinosaurShow {
    async render() {
        
        let dinosaur = new Dinosaurs();
        let request = Utils.parseRequestURL();
        dinosaur = await DinosaursProvider.getDinosaur(request.id);
        document.title = "Dinodex | " + dinosaur.nom;

        let foodsDino = dinosaur.food;
        let allFoods = await NourritureProvider.fetchFoods();
        let foods = [];
        foodsDino.forEach(food => {
            let foodD = allFoods.find(f => f.id == food);
            foods.push(foodD);
        });
        let kibble = allFoods.find(f => f.id == dinosaur.kibble);
        console.log(foods);


        let isFavoris;
        let favoris = localStorage.getItem("favoris");
        if(favoris){
            isFavoris = favoris.includes(dinosaur.id);
        } else {
            isFavoris = false;
        }
        let value = "";

        let dinosaurShow = document.createElement("div");
        dinosaurShow.setAttribute("id", "dinosaur");
        dinosaurShow.innerHTML = `
            <div id="showItem">
                <div id="lineItem">
                    <div id="descItem">
                        <h2> Le ${dinosaur.nom}</h2>
                        <p>${dinosaur.description}</p>
                        <input type="button" id="buttonFavoris" value="${isFavoris ? "Retirer des favoris" : "Mettre en favoris"}" onclick="favoris(${dinosaur.id})">
                    </div>
                    <div id="imgItem">
                        <img src="${dinosaur.image}" alt="${dinosaur.nom}">
                    </div>
                </div>
                <div id="lineItem">
                    <div id="imgItem">
                        <img src="${kibble.image}" alt="${kibble.nom}">
                    </div>
                    <div id="descItem">
                        <h2>Kibble préférée</h2>
                        <p>La <b>${kibble.nom}</b> est la préférée du ${dinosaur.nom}. Elle permet de l'apprivoiser plus rapidement, et avec une meilleur capacité d'apprivoisement. Utiliser cette kibble pour apprivoiser le ${dinosaur.nom} permet d'augmenter les chances d'obtenir de meilleurs statistiques</p>
                        <input type="button" id="buttonFavoris" value="Plus d'informations" onclick="voirFood(${kibble.id})">
                    </div>
                </div>
                <div id="centeredSection">
                    <div class="tableContainer">
                        <h2>Statistiques</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Type</td>
                                    <td>${dinosaur.type}</td>
                                </tr>
                                <tr>
                                    <td>Apprivoisable</td>
                                    <td>${dinosaur.tameable ? "Oui" : "Non"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tableContainer">
                        <h2>Alimentation</h2>
                        <table>
                            <tbody>
                                ${foods.map(food => `
                                    <tr>
                                        <td>${food.nom}</td>
                                        <td><img src="${food.image}" alt="${food.nom}"></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
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

window.voirFood = function(idFood){
    window.location.href = `#/nourritures/${idFood}`;
}
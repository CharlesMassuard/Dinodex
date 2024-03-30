import NourritureProvider from "../services/nourritureProvider.js";
import Utils from '../services/utils.js';
import Nourriture from "../models/nourriture.js";

export default class FoodShow {
    async render() {
        
        let food = new Nourriture();
        let request = Utils.parseRequestURL();
        food = await NourritureProvider.getFood(request.id);
        document.title = `Dinodex | ${food.nom}`;

        let foodShow = document.createElement("div");
        foodShow.setAttribute("id", "food");
        foodShow.innerHTML = `
            <div id="showFood">
                <h1>${food.nom}</h1>
                <img src="${food.image}" alt="${food.nom}">
                <p>${food.description}</p>
            </div>
        `;
        return foodShow.outerHTML;  
    }
}
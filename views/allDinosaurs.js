import DinosaursProvider from "../services/dinosaursProvider.js";
import Dinosaurs from "../models/dinosaurs.js";

export default class AllDinosaurs {
    async render() {
        let dinosaursList = document.querySelector("#dinosaurs");
        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        let ol = document.createElement("ol");

        dinosaurs.forEach(dinosaur => {
            let li = document.createElement("li");
            li.innerHTML = `
                <a href="#dinosaurs/${dinosaur.id}">
                    <img src="${dinosaur.image}" alt="${dinosaur.nom}">
                    <h2>${dinosaur.nom}</h2>
                    <p>Type: ${dinosaur.type}</p>
                    <p>Tameable: ${dinosaur.tameable ? 'Yes' : 'No'}</p>
                    <p>Food: ${dinosaur.food.join(', ')}</p>
                </a>
            `;
            ol.appendChild(li);
        });
        dinosaursList.appendChild(ol);
        return dinosaursList;
    }
}
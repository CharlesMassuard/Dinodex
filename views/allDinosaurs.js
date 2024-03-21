import DinosaursProvider from "../services/dinosaursProvider.js";
import Dinosaurs from "../models/dinosaurs.js";

export default class AllDinosaurs {
    async render() {
        let dinosaursList = document.querySelector("#dinosaurs");
        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        dinosaurs.forEach(dinosaur => {
            let li = document.createElement("li");
            li.innerHTML = `
                <a href="#dinosaurs/${dinosaur.id}">
                    <h2>${dinosaur.nom}</h2>
                </a>
            `;
            dinosaursList.appendChild(li);
        });
    }
}
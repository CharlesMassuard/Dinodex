import DinosaursProvider from "../services/dinosaursProvider.js";
import Dinosaurs from "../models/dinosaurs.js";

export default class AllDinosaurs {
    async render() {
        
        let dinosaursList = document.createElement("div");
        dinosaursList.setAttribute("id", "dinosaurs");
        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        let ol = document.createElement("ol");

        dinosaurs.forEach(dinosaur => {
            let li = document.createElement("li");
            li.innerHTML = `
                <a href="#dinosaurs/${dinosaur.id}">
                    <figure>
                        <img src="../static/img/nature.png" alt="${dinosaur.nom}">
                        <figcaption>"${dinosaur.nom}"</figcaption>
                    </figure>
                </a>
            `;
            ol.appendChild(li);
        });
        dinosaursList.appendChild(ol);
        return dinosaursList.outerHTML;
    }
}
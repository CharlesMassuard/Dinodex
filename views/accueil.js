import DinosaursProvider from "../services/dinosaursProvider.js";
import { fonduRemettreGrandHeader } from "../header.js";

export default class Accueil {
    async render() {
        
        fonduRemettreGrandHeader();
        let dinosaursList = document.createElement("div");
        dinosaursList.setAttribute("id", "listView");
        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        let ol = document.createElement("ol");

        dinosaurs.forEach(dinosaur => {
            let li = document.createElement("li");
            li.innerHTML = `
            `;
            ol.appendChild(li);
        });
        dinosaursList.appendChild(ol);
        return dinosaursList.outerHTML;
    }
}
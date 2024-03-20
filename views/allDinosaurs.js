import DinosaursProvider from "../services/dinosaursProvider";
import Dinosaurs from "../models/dinosaurs";

export default class AllDinosaurs {
    async render() {
        let view = document.createElement("div");
        view.innerHTML = `
            <h1>All Dinosaurs</h1>
            <ul id="dinosaurs-list"></ul>
        `;

        let dinosaursList = view.querySelector("#dinosaurs-list");
        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        dinosaurs.forEach(dinosaur => {
            let li = document.createElement("li");
            li.innerHTML = `
                <a href="#dinosaurs/${dinosaur.id}">
                    <h2>${dinosaur.nom}</h2>
                    <img src="${dinosaur.image}" alt="${dinosaur.nom}">
                </a>
            `;
            dinosaursList.appendChild(li);
        });

        return view;
    }
}
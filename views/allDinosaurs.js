import DinosaursProvider from "../services/dinosaursProvider.js";

export default class AllDinosaurs {
    async render() {
        
        document.title = "Dinodex | Dinosaures";
        let dinosaursList = document.createElement("div");
        dinosaursList.setAttribute("id", "listView");
        let dinosaurs = await DinosaursProvider.fetchDinosaurs();
        let ol = document.createElement("ol");

        dinosaurs.forEach(dinosaur => {
            let li = document.createElement("li");
            let dinosAmeliores = localStorage.getItem("dinosAmeliores");
            if(dinosAmeliores){
                dinosAmeliores = JSON.parse(dinosAmeliores);
            } else {
                dinosAmeliores = [];
            }
            let isAmeliore = false;
            for (let i = 0; i < dinosAmeliores.length; i++) {
                let dinosaurId = parseInt(dinosaur.id);
                if (dinosAmeliores[i] === dinosaurId) {
                    dinosaur.image = dinosaur.tekImage;
                    dinosaur.nom = "TEK " + dinosaur.nom;
                    isAmeliore = true;
                }
            }
                li.innerHTML = `
                <a href="#/dinosaurs/${dinosaur.id}">
                    <figure>
                        <img class="lazy" data-src="${dinosaur.image}" alt="${dinosaur.nom}">
                        <figcaption>"${dinosaur.nom}"</figcaption>
                    </figure>
                </a>
            `;
            ol.appendChild(li);
        });
        dinosaursList.appendChild(ol);
        document.dispatchEvent(new Event('render-complete'));
        return dinosaursList.outerHTML;
    }
}
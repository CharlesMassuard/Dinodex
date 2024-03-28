import FoodProvider from "../services/nourritureProvider.js";

export default class AllFoods {
    async render() {
        let foodList = document.createElement("div");
        foodList.setAttribute("id", "nourritures");
        let foods = await FoodProvider.fetchFoods();
        let ol = document.createElement("ol");
        foods.forEach(food => {
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
        foodList.appendChild(ol);
        return foodList.outerHTML;
    }
}
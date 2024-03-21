import FoodProvider from "../services/nourritureProvider.js";

export default class AllFoods {
    async render() {
        let foodList = document.querySelector("#nourritures");
        let foods = await FoodProvider.fetchFoods();
        foods.forEach(food => {
            let li = document.createElement("li");
            li.innerHTML = `
                <a href="#nourritures/${food.id}">
                    <h2>${food.nom}</h2>
                </a>
            `;
            foodList.appendChild(li);
        });
    }
}
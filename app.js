import AllDinosaurs from "./views/allDinosaurs.js";
import AllFoods from "./views/allFoods.js";

let allDinosaurs = new AllDinosaurs();
let allFoods = new AllFoods();
window.addEventListener('load', () => allDinosaurs.render());
window.addEventListener('load', () => allFoods.render());
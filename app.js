import AllDinosaurs from "./views/allDinosaurs.js";
import AllFoods from "./views/allFoods.js";
import DinosaurShow from "./views/DinosaurShow.js";
import FoodShow from "./views/FoodShow.js";
import Favoris from "./views/Favoris.js";
import Utils from './services/utils.js';
import Error404 from './views/error404.js';

const routes = {
    '/': AllDinosaurs,
    '/dinosaurs/:id': DinosaurShow,
    '/nourritures': AllFoods,
    '/nourritures/:id': FoodShow,
    '/favoris': Favoris
};

const router = async () => {
    const content = null || document.getElementById('content');
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    window.scrollTo(0, 0);
}

localStorage.setItem("favoris", localStorage.getItem("favoris") || JSON.stringify([]));
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
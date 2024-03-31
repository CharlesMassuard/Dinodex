import AllDinosaurs from "./views/allDinosaurs.js";
import Accueil from "./views/accueil.js";
import AllFoods from "./views/allFoods.js";
import DinosaurShow from "./views/DinosaurShow.js";
import FoodShow from "./views/FoodShow.js";
import Favoris from "./views/Favoris.js";
import Utils from './services/utils.js';
import Error404 from './views/error404.js';
import SearchPage from './views/searchPage.js';

const routes = {
    '/': Accueil,
    '/dinosaurs': AllDinosaurs,
    '/dinosaurs/:id': DinosaurShow,
    '/nourritures': AllFoods,
    '/nourritures/:id': FoodShow,
    '/favoris': Favoris,
    '/search/:id': SearchPage
};

const router = async () => {
    const content = null || document.getElementById('content');
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    window.scrollTo(0, 0);
}

localStorage.setItem("favorisDinos", localStorage.getItem("favorisDinos") || JSON.stringify([]));
localStorage.setItem("favorisFoods", localStorage.getItem("favorisFoods") || JSON.stringify([]));
localStorage.setItem("dinosAmeliores", localStorage.getItem("dinosAmeliores") || JSON.stringify([]));
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
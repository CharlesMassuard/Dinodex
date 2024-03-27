import AllDinosaurs from "./views/allDinosaurs.js";
import AllFoods from "./views/allFoods.js";
import Utils from './services/utils.js';
import Error404 from './views/error404.js';

let allDinosaurs = new AllDinosaurs();
let allFoods = new AllFoods();

const routes = {
    '/': AllDinosaurs,
    '/nourritures': AllFoods
};

const router = async () => {
    const content = null || document.getElementById('content');
    let request = Utils.parseRequestURL();
    console.log(request);
    console.log(request.resource);
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    console.log(parsedURL);
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404;
    console.log(page);
    content.innerHTML = await page.render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
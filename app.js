import AllDinosaurs from "./views/allDinosaurs.js";
import AllFoods from "./views/allFoods.js";
import Utils from "./services/utils.js";

let allDinosaurs = new AllDinosaurs();
let allFoods = new AllFoods();
window.addEventListener('load', () => allDinosaurs.render());
window.addEventListener('load', () => allFoods.render());


// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/dinosaurs'          : AllDinosaurs,
    '/dinosaur/:id'       : AllDinosaurs,
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const content = null || document.querySelector('#content');

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404
    
    content.innerHTML = await page.render();
}

// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);
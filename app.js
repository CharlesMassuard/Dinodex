import AllDinosaurs from "./views/allDinosaurs.js";
import Accueil from "./views/accueil.js";
import AllFoods from "./views/allFoods.js";
import DinosaurShow from "./views/DinosaurShow.js";
import FoodShow from "./views/FoodShow.js";
import Favoris from "./views/Favoris.js";
import Utils from './services/utils.js';
import Error404 from './views/error404.js';
import SearchPage from './views/searchPage.js';
import Persos from "./views/persos.js";

const routes = {
    '/': Accueil,
    '/dinosaurs': AllDinosaurs,
    '/dinosaurs/:id': DinosaurShow,
    '/nourritures': AllFoods,
    '/nourritures/:id': FoodShow,
    '/favoris': Favoris,
    '/search/:id': SearchPage,
    '/persos': Persos
};

const router = async () => {
    const content = null || document.getElementById('content');
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    window.scrollTo(0, 0);

    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
        });
    }
}


localStorage.setItem("favorisDinos", localStorage.getItem("favorisDinos") || JSON.stringify([]));
localStorage.setItem("favorisFoods", localStorage.getItem("favorisFoods") || JSON.stringify([]));
localStorage.setItem("dinosAmeliores", localStorage.getItem("dinosAmeliores") || JSON.stringify([]));
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
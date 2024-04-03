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
        this.initLazyLoad();
        dinosaursList.appendChild(ol);
        return dinosaursList.outerHTML;
    }

    initLazyLoad() {
        const config = { childList: true, subtree: true };
        const observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    this.lazyLoadImages();
                    observer.disconnect(); // Disconnect the observer after the first batch of images is loaded
                    break;
                }
            }
        });
        observer.observe(document.body, config);
    }

    lazyLoadImages() {
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
}
import DinosaursProvider from "../services/dinosaursProvider.js";
import NourritureProvider from "../services/nourritureProvider.js";
import Dinosaurs from "../models/dinosaurs.js";
import Utils from '../services/utils.js';

export default class DinosaurShow {
    async render() {
        
        let dinosaur = new Dinosaurs();
        let request = Utils.parseRequestURL();
        dinosaur = await DinosaursProvider.getDinosaur(request.id);
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

        document.title = "Dinodex | " + dinosaur.nom;

        let foodsDino = dinosaur.food;
        let allFoods = await NourritureProvider.fetchFoods();
        let foods = [];
        foodsDino.forEach(food => {
            let foodD = allFoods.find(f => f.id == food);
            foods.push(foodD);
        });
        let kibble = allFoods.find(f => f.id == dinosaur.kibble);


        let isFavoris;
        let favoris = localStorage.getItem("favorisDinos");
        if(favoris){
            isFavoris = favoris.includes(dinosaur.id);
        } else {
            isFavoris = false;
        }

        let dinosaurShow = document.createElement("div");
        dinosaurShow.setAttribute("id", "dinosaur");
        dinosaurShow.innerHTML = `
            <div id="showItem">
                <div id="lineItem">
                    <div id="descItem">
                        <h2> Le ${dinosaur.nom}</h2>
                        <p>${dinosaur.description}</p>
                        <input type="button" id="buttonFavoris" value="${isFavoris ? "Retirer des favoris" : "Mettre en favoris"}" onclick="favorisDinos(${dinosaur.id})">
                        ${!isAmeliore && dinosaur.tekVariant ? `<input type="button" id="buttonFavoris" value="Améliorer en TEK" onclick="ameliorerDino(${dinosaur.id}, '${dinosaur.nom}')">` : ''}
                    </div>
                    <div id="imgItem">
                        <img src="${dinosaur.image}" alt="${dinosaur.nom}">
                    </div>
                </div>
                <div id="lineItem">
                    <div id="imgItem">
                        <img src="${kibble.image}" alt="${kibble.nom}">
                    </div>
                    <div id="descItem">
                        <h2>Kibble préférée</h2>
                        <p>La <b>${kibble.nom}</b> est la préférée du ${dinosaur.nom}. Elle permet de l'apprivoiser plus rapidement, et avec une meilleur capacité d'apprivoisement. Utiliser cette kibble pour apprivoiser le ${dinosaur.nom} permet d'augmenter les chances d'obtenir de meilleurs statistiques</p>
                        <input type="button" id="buttonFavoris" value="Plus d'informations" onclick="voirFood(${kibble.id})">
                    </div>
                </div>
                <div id="centeredSection">
                    <div class="tableContainer">
                        <h2>Statistiques</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Type</td>
                                    <td>${dinosaur.type}</td>
                                </tr>
                                <tr>
                                    <td>Apprivoisable</td>
                                    <td>${dinosaur.tameable ? "Oui" : "Non"}</td>
                                </tr>
                                <tr>
                                    <td>Variante TEK</td>
                                    <td>${dinosaur.tekVariant ? "Oui" : "Non"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tableContainer">
                        <h2>Alimentation</h2>
                        <table>
                            <tbody>
                                ${foods.map(food => `
                                    <tr>
                                        <td>${food.nom}</td>
                                        <td><img src="${food.image}" alt="${food.nom}"></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        return dinosaurShow.outerHTML;
    }
}

window.favorisDinos = function(idDino){
    var fav = localStorage.getItem('favorisDinos');
    if (fav) {
        fav = JSON.parse(fav);
    } else {
        fav = [];
    }
    if(fav.includes(idDino)){
        fav = fav.filter(f => f != idDino);
    } else {
        fav.push(idDino);
    }
    localStorage.setItem('favorisDinos', JSON.stringify(fav));
    document.getElementById("buttonFavoris").value = fav.includes(idDino) ? "Retirer des favoris" : "Mettre en favoris";
}

window.voirFood = function(idFood){
    window.location.href = `#/nourritures/${idFood}`;
}

window.ameliorerDino = async function(idDino, nomDino){
    let dinosaur = await DinosaursProvider.getDinosaur(idDino);
    if(confirm("Etes-vous sûr de vouloir améliorer "+nomDino+" en TEK ?")){
        
        let dinosAmeliores = localStorage.getItem("dinosAmeliores");
        if(dinosAmeliores){
            dinosAmeliores = JSON.parse(dinosAmeliores);
        } else {
            dinosAmeliores = [];
        }
        if(!dinosAmeliores.includes(idDino)){
            dinosAmeliores.push(idDino);
        }
        localStorage.setItem('dinosAmeliores', JSON.stringify(dinosAmeliores));
        console.log(dinosAmeliores);


        //VIDEO
        // Créer un élément vidéo
        let video = document.createElement('video');

        // Définir l'URL de la vidéo
        video.src = '../static/video/ameliorationDino.mp4';

        // Définir le style de la vidéo
        video.style.position = 'absolute';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.opacity = '0';
        video.volume = 0.1;

        // Ajouter une transition à l'opacité de la vidéo
        video.style.transition = 'opacity 1s ease-in-out';

        // Vider le corps du document
        document.body.innerHTML = '';

        // Ajouter l'élément vidéo au corps du document
        document.body.appendChild(video);

        // Utiliser requestAnimationFrame pour retarder l'application de l'opacité à 1
        window.requestAnimationFrame(function() {
            window.requestAnimationFrame(function() {
                video.style.opacity = '1';
            });
        });

        // Lancer la vidéo
        video.play();

        // Ajouter un gestionnaire d'événements pour l'événement 'timeupdate'
        video.ontimeupdate = function() {
            // Si la vidéo est à 3 secondes de la fin
            if(video.duration - video.currentTime <= 3) {
                // Créer un élément img
                let img = document.createElement('img');

                // Définir l'URL de l'image
                img.src = dinosaur.tekImage; // Accéder à l'attribut 'image' de 'dinosaur'

                // Définir le style de l'image
                img.style.position = 'fixed';
                img.style.top = '50%';
                img.style.left = '50%';
                img.style.transform = 'translate(-50%, -50%)';
                img.style.maxWidth = '80%';
                img.style.maxHeight = '80%';
                img.style.objectFit = 'contain';
                img.style.opacity = '0';

                // Ajouter une transition à l'opacité de l'image
                img.style.transition = 'opacity 1s ease-in-out';

                // Ajouter l'élément img au corps du document
                document.body.appendChild(img);

                // Utiliser requestAnimationFrame pour retarder l'application de l'opacité à 1
                window.requestAnimationFrame(function() {
                    window.requestAnimationFrame(function() {
                        img.style.opacity = '1';
                    });
                });
            }
        };

        // Ajouter un gestionnaire d'événements pour l'événement 'ended'
        // Ajouter un gestionnaire d'événements pour l'événement 'ended'
        video.onended = function() {
            let button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('id', 'buttonGetAmelioration');
            button.setAttribute('value', 'Récupérer le TEK '+nomDino);
            button.setAttribute('onclick', 'window.location.reload()');
            button.style.position = 'absolute';
            button.style.top = '75%';
            button.style.left = '50%';
            button.style.transform = 'translate(-50%, 0)';
            button.style.opacity = '0';
            button.style.transition = 'opacity 1s ease-in-out';

            // Ajouter le bouton au corps du document
            document.body.appendChild(button);

            // Utiliser requestAnimationFrame pour retarder l'application de l'opacité à 1
            window.requestAnimationFrame(function() {
                window.requestAnimationFrame(function() {
                    button.style.opacity = '1';
                });
            });
        };
    }
}
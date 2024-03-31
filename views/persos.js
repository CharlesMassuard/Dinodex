export default class Persos{

    async render(){
        document.title = "Dinodex | Personnages";
        let laPage = document.createElement("div");
        laPage.setAttribute("id", "personnages");
        
        let imgPrincipal = document.createElement("img");
        imgPrincipal.setAttribute("src", "../static/img/persos/persoBase.png");
        imgPrincipal.setAttribute("alt", "Personnage séléctionné");
        imgPrincipal.setAttribute("id", "imgPrincipal");
        laPage.appendChild(imgPrincipal);

        let imgList = document.createElement("div");
        imgList.setAttribute("id", "imgList");

        let img1 = document.createElement("img");
        img1.setAttribute("src", "../static/img/persos/teteBob.png");
        img1.setAttribute("alt", "Personnage de base");
        img1.setAttribute("title", "Personnage de base");
        img1.setAttribute("onclick", "changePerso('persoBase')");
        let img2 = document.createElement("img");
        img2.setAttribute("src", "https://ark.wiki.gg/images/e/ec/Flak_Helmet.png");
        img2.setAttribute("alt", "Armure en métal");
        img2.setAttribute("title", "Armure en métal");
        img2.setAttribute("onclick", "changePerso('flak')");
        let img3 = document.createElement("img");
        img3.setAttribute("src", "https://ark.wiki.gg/images/f/f6/Manticore_Helmet_Skin.png");
        img3.setAttribute("alt", "Skin de la manticore");
        img3.setAttribute("onclick", "changePerso('manticore')");
        img3.setAttribute("title", "Skin de la manticore");
        let img4 = document.createElement("img");
        img4.setAttribute("src", "https://ark.wiki.gg/images/8/81/Corrupted_Helmet_Skin.png");
        img4.setAttribute("alt", "Skin corrompu");
        img4.setAttribute("onclick", "changePerso('corrompu')");
        img4.setAttribute("title", "Skin corrompu");
        let img5 = document.createElement("img");
        img5.setAttribute("src", "https://ark.wiki.gg/images/7/7b/Master_Controller_Helmet_Skin.png");
        img5.setAttribute("alt", "Casque Master Controller");
        img5.setAttribute("title", "Casque Master Controller"); 
        img5.setAttribute("onclick", "changePerso('casqueMaitreControlleur')");
        
        imgList.appendChild(img1);
        imgList.appendChild(img2);
        imgList.appendChild(img3);
        imgList.appendChild(img4);
        imgList.appendChild(img5);
        laPage.appendChild(imgList);

        return laPage.outerHTML;
    }
}

window.changePerso = function(perso){
    document.getElementById("imgPrincipal").setAttribute("src", "../static/img/persos/" + perso + ".png");
}
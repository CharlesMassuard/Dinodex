import ArmuresProvider from "../services/armuresProvider.js";

export default class Persos{

    async render(){
        document.title = "Dinodex | Personnages";
        let laPage = document.createElement("div");
        laPage.setAttribute("id", "personnages");
        
        let imgPrincipal = document.createElement("img");
        imgPrincipal.setAttribute("src", "../static/img/persos/persoBase.png");
        imgPrincipal.setAttribute("alt", "Personnage séléctionné");
        imgPrincipal.setAttribute("id", "imgPrincipal");

        let imgList = document.createElement("div");
        imgList.setAttribute("id", "imgList");

        let armures = await ArmuresProvider.fetchArmures();
        armures.forEach(armure => {
            let img = document.createElement("img");
            img.setAttribute("src", armure.image);
            img.setAttribute("alt", armure.nom);
            img.setAttribute("title", armure.nom)
            img.setAttribute("onclick", "changerArmure('" + armure.id +"')");
            imgList.appendChild(img);
        });

        let stats = document.createElement("div");
        stats.setAttribute("id", "stats");
        let nomArmure = document.createElement("h2");
        nomArmure.setAttribute("id", "nomArmure");
        nomArmure.innerHTML = "Sans armure";
        stats.appendChild(nomArmure);
        let armureProtection = document.createElement("p");
        armureProtection.setAttribute("id", "armureProtection");
        armureProtection.innerHTML = "<b>Armure :</b> 0";
        stats.appendChild(armureProtection);
        let resistanceFroid = document.createElement("p");
        resistanceFroid.setAttribute("id", "resistanceFroid");
        resistanceFroid.innerHTML = "<b>Résistance au froid :</b> 0";
        stats.appendChild(resistanceFroid);
        let resistanceChaud = document.createElement("p");
        resistanceChaud.setAttribute("id", "resistanceChaud");
        resistanceChaud.innerHTML = "<b>Résistance à la chaleur :</b> 0";
        stats.appendChild(resistanceChaud);

        laPage.appendChild(imgList);
        laPage.appendChild(imgPrincipal);
        laPage.appendChild(stats);

        return laPage.outerHTML;
    }
}

window.changerArmure = function(armure){
    ArmuresProvider.fetchArmures().then(armures => {
        armure = armures.find(a => a.id == armure);

        document.getElementById("imgPrincipal").setAttribute("src", armure.image);
        document.getElementById("nomArmure").innerHTML = armure.nom;
        document.getElementById("armureProtection").innerHTML = "<b>Armure : </b>" + armure.armure;
        document.getElementById("resistanceFroid").innerHTML = "<b>Résistance au froid : </b>" + armure.resistanceFroid;
        document.getElementById("resistanceChaud").innerHTML = "<b>Résistance à la chaleur : </b>" + armure.resistanceChaud;
    });
}
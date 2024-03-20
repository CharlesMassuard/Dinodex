export default class Dinosaurs{

    constructor(id, nom, type, tamable, nourriture, image){
        this.id = id
        this.nom = nom
        this.type = type
        this.tamable = tamable
        this.nourriture = nourriture
        this.image = image
    }

    getId(){
        return this.id
    }

    getNom(){
        return this.nom
    }

    getType(){
        return this.type
    }

    getTamable(){
        return this.tamable
    }

    getNourriture(){
        return this.nourriture
    }

    getImage(){
        return this.image
    }

}
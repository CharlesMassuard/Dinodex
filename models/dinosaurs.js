export default class Dinosaurs{

    constructor(id, nom, type, tameable, nourriture, image){
        this.id = id
        this.nom = nom
        this.type = type
        this.tameable = tamable
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

    getTameable(){
        return this.tameable
    }

    getNourriture(){
        return this.nourriture
    }

    getImage(){
        return this.image
    }

}
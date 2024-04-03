export default class Nourriture{

    constructor(id, nom, type, image){
        this.id = id
        this.nom = nom
        this.type = type
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

    getImage(){
        return this.image
    }
}
export default class Error404 {
    async render () {
        document.title = "Dinodex | Erreur 404";
        let view =  `
        <div id="noFavoris">
            <img src="https://media.tenor.com/5plaXY9f1uAAAAAj/dino-dinosaur.gif" alt="Dinosaure triste">    
            <h1>Erreur 404</h1>
            <h2>La page demandée n'existe pas</h2>
        </div>
        `;
        return view
    }
}
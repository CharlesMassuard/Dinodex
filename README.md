# DinoDex par Massuard Charles et Ludmann Dorian

DinoDex est une application web de type single page qui utilise JavaScript afin de rendre la naviguation de l'application en une vraie expérience visuelle. Sur DinoDex, retrouvez toutes les informations sur les dinosaures de ARK: Survival Evolved.  

## Requirements

Attention, pour pouvoir lancer l'application à l'aide des commandes disponibles plus tard, vous aurez besoin de **Python** et **NodeJs**
  
## Lancement  

Pour lancer l'application, entrez les commandes suivantes dans le répertoire courant (./):
```bash
npx json-server ./dinosaurs.json
python -m http.server
```

## Fonctionnalités
- Plusieurs vues:
    - Listing
    - Détail des dinosaures et évolutions 
    - Gestion des favoris en local
- Pagination  
- JSON relationnel avec des relations diverses et variées  
- Barre de recherche
- Lazy loading

## Lancement du serveur

Pour lancer le serveur, utilisez la commande suivante :

```markdown
python -m http.server
```

### Modèles

- `dinosaurs.js` : Ce fichier contient le modèle pour les dinosaures.
- `nourriture.js` : Ce fichier contient le modèle pour la nourriture.

### Providers

- `armuresProvider.js` : Ce fichier contient le fournisseur de données pour les armures.
- `dinosaursProvider.js` : Ce fichier contient le fournisseur de données pour les dinosaures.
- `nourritureProvider.js` : Ce fichier contient le fournisseur de données pour la nourriture.
- `utils.js` : Ce fichier contient des fonctions utilitaires.

### Services

- `app.js` : Ce fichier est le point d'entrée de l'application. Il initialise l'application et gère le routage.
- `search.js` : Ce fichier gère la fonctionnalité de recherche.

### Views

- `accueil.js` : Ce fichier contient la vue pour la page d'accueil.
- `allDinosaurs.js` : Ce fichier contient la vue pour la page de liste de tous les dinosaures.
- `allFoods.js` : Ce fichier contient la vue pour la page de liste de toutes les nourritures.
- `DinosaurShow.js` : Ce fichier contient la vue pour la page de détail d'un dinosaure.
- `error404.js` : Ce fichier contient la vue pour la page d'erreur 404.
- `Favoris.js` : Ce fichier contient la vue pour la page des favoris.
- `FoodShow.js` : Ce fichier contient la vue pour la page de détail d'une nourriture.
- `persos.js` : Ce fichier contient la vue pour la page des personnages.
- `searchPage.js` : Ce fichier contient la vue pour la page de recherche.

### Routage

Le routage est géré dans le fichier `app.js`. Il utilise l'URL pour déterminer quelle vue afficher.

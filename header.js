let headerPetit = false;
let fonduApplique = false;

function fonduHeader() {
    headerPetit = true;
    let header = document.querySelector('header');
    let descSite = document.getElementById('descSite');
    let titreSite = document.getElementById('titre');
    let seeMore = document.getElementById('seeMore');
    
    // Add these lines to animate the background
    header.style.backgroundAttachment = 'fixed';

    titreSite.style.marginTop = '15vh';
    titreSite.addEventListener('mouseover', function() {
        this.style.letterSpacing = '10px';
        this.style.transform = 'scale(1.05)';
    });
    
    titreSite.addEventListener('mouseout', function() {
        this.style.letterSpacing = 'normal';
        this.style.transform = 'scale(1)';
    });

    descSite.style.transition = 'opacity 1.5s';
    descSite.style.opacity = '0';

    seeMore.style.transition = 'opacity 1.5s';
    seeMore.style.opacity = '0';
  
    // Calculate the height of the window in pixels
    let windowHeight = window.innerHeight;
    
    // Set the height of the header to the height of the window
    header.style.height = windowHeight + 'px';
    
    // Add a transition to the header
    header.style.transition = 'height 1s, border-radius 2s, background-position 2s';
    
    // Set the height and borderRadius of the header to the target values after the animation
    setTimeout(function() {
        header.style.height = '80px'; // Increase this value to reduce less the header
        header.style.position = 'fixed';
        header.style.backgroundPosition = 'center 300%'; // Move this line here
    }, 100); // Delay the height change to allow the transition to take effect
}

function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
}

function changementPage(){
    if(!headerPetit){
        fonduHeader();
    }
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
}

function appliquerFondu() {
    if(window.location.hash === '#/' || window.location.hash === '' && window.scrollY > 100){
        window.location.href = '#/dinosaurs';
    }
    if (!fonduApplique && window.scrollY > 100) { // Appliquer le fondu si on a défilé de plus de 100 pixels
        fonduHeader();
        fonduApplique = true; // Marquer que le fondu a été appliqué
    }
}

window.addEventListener('scroll', appliquerFondu);


function fonduRemettreGrandHeader() {
    if(headerPetit) {
        headerPetit = false;
        let header = document.querySelector('header');
        let descSite = document.getElementById('descSite');
        let titreSite = document.getElementById('titre');
        let seeMore = document.getElementById('seeMore');
        
        // Add these lines to animate the background
        header.style.backgroundAttachment = 'fixed';

        titreSite.style.removeProperty('margin-top');
        titreSite.addEventListener('mouseover', function() {
            this.style.letterSpacing = '10px';
            this.style.transform = 'scale(1.3)';
        });
        
        titreSite.addEventListener('mouseout', function() {
            this.style.letterSpacing = 'normal';
            this.style.transform = 'scale(1)';
        });

        descSite.style.transition = 'opacity 1.5s';
        descSite.style.opacity = '1';

        seeMore.style.transition = 'opacity 1.5s';
        seeMore.style.opacity = '1';
        
        // Set the height and borderRadius of the header to the target values after the animation
        setTimeout(function() {
            header.style.height = '100vh'; // Increase this value to reduce less the header
            header.style.position = 'relative';
            header.style.removeProperty('background-position');
        }, 100); // Delay the height change to allow the transition to take effect
    }
}

document.getElementById('menu-bar').addEventListener('click', menuOnClick);
document.getElementById('nav').addEventListener('click', changementPage);
document.querySelector('header').addEventListener('click', function() {
    if(window.location.hash === '#/' || window.location.hash === '') {
        fonduRemettreGrandHeader();
    }
});

document.getElementById('seeMore').addEventListener('click', function(event) {
    event.stopPropagation();
    fonduHeader();
    window.location.href = '#/dinosaurs';
});

document.addEventListener('DOMContentLoaded', function() {
    if(window.location.hash !== '#/' || window.location.hash !== '') {
        fonduHeader();
    }
});

export {fonduRemettreGrandHeader, fonduHeader};
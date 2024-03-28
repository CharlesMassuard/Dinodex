let headerPetit = false;
let fonduApplique = false;

function fonduHeader() {
    headerPetit = !headerPetit;
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
    if (!fonduApplique && window.scrollY > 100) { // Appliquer le fondu si on a défilé de plus de 100 pixels
        fonduHeader();
        fonduApplique = true; // Marquer que le fondu a été appliqué
    }
}

window.addEventListener('scroll', appliquerFondu);
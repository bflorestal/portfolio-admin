// Menu burger
let menu_burger = document.getElementById("menu");
let show = 0;

// Fonction d'affichage au clic
function display() {
    if (show == 0) {
        menu_burger.style.display = "block";
        show = 1;
    } else {
        menu_burger.style.display = "none";
        show = 0;
    }
}
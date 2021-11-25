// Menu burger
let menu_burger = document.getElementById("menu");
let show = 0;

function display() {
    if (show == 0) {
        menu_burger.style.display = "block";
        show = 1;
    } else {
        menu_burger.style.display = "none";
        show = 0;
    }
}

/**********************AJOUT PROJET**********************/
function addProj() {
    let btnAddProj = document.getElementById("btnAddProj");
    var urlDataProj = "";
}

/**********************MODIF PROJET**********************/
function modProj() {
    let btnModProj = document.getElementById("btnModProj");
    console.log(btnModProj);
}

/**********************SUPPR PROJET**********************/
function rmvProj() {
    let btnRmvProj = document.getElementById("btnRmvProj");
    console.log(btnRmvProj);
}
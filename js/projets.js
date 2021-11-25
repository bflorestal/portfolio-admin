// Array contenant les données
let projetsListe = [
    { 
      "id": 1, 
      "name": "Alpha", 
      "description": "Le tout premier projet",
      "url": "https://google.com/",
      "image": "https://picsum.photos/100"
    },
    { 
      "id": 2, 
      "name": "Beta", 
      "description": "Projet beta, bientôt terminé",
      "url": "https://qwant.com/",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Qwant_new_logo_2018.svg/langfr-800px-Qwant_new_logo_2018.svg.png"
    },
];
console.table(projetsListe); // Array dans la console

// Trouver le corps du tableau
let monTableau = document.getElementById("monTableau");
let tableauBody = monTableau.querySelector("tbody");
// Trouver les catégories du tableau
let listeTableCategories = document.getElementById("categories").children;
// Mettre les catégories du tableau dans un array
const projCategories = [];
for (let k = 0; k < listeTableCategories.length; k++) {
    projCategories.push(listeTableCategories[k].textContent);
}
// Création d'un double de projCategories sans ID
const projCategoriesNoID = projCategories;
projCategoriesNoID.shift();

// Boutons CRUD
let btnAddProj = document.getElementById("btnAddProj");
let btnConfirmAP = document.getElementById("btnConfirmAP");
let btnCancelAP = document.getElementById("btnCancelAP");
let btnModProj = document.getElementById("btnModProj");
let btnRmvProj = document.getElementById("btnRmvProj");

// Ajout des données de l'array dans le tableau
for (let i = 0; i < projetsListe.length ; i++) {
    // Création des lignes
    let projetRow = document.createElement("tr");
    projetRow.id = `tabProj${projetsListe[i].id}`; // un ID par ligne
    tableauBody.appendChild(projetRow);
    // Ajout des données de l'array 1 par 1 au tableau
    for (const [key, value] of Object.entries(projetsListe[i])) {
        // key = nom caractéristiques projet, value = caractéristiques projet
        // Création des cellules
        let projetCell = document.createElement("td");
        // Balise <a> si c'est le lien
        if (`${key}` == "url") {
            let projetLien = document.createElement("a");
            projetLien.href = `${value}`;
            projetLien.target = "_blank"; // Ouvrir dans un nouvel onglet
            projetLien.textContent = "Cliquez ici";
            projetRow.appendChild(projetCell);
            projetCell.appendChild(projetLien); // Ajout du lien dans la cellule
        } else if (`${key}` == "image") { // Balise <img> si c'est l'img
            let projetImg = document.createElement("img");
            projetImg.src = `${value}`;
            projetImg.alt = `${projetsListe[i].name}`;
            projetRow.appendChild(projetCell);
            projetCell.appendChild(projetImg); // Ajout du lien dans la cellule
        } else { // S'il n'y a que du texte
            projetCell.textContent = `${value}`;
            projetRow.appendChild(projetCell); // Ajout du texte dans la cellule
        }
    }
}

// Fonction qui récupère l'ID du projet en GET
function findGetParameter(projectID) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&"); // Pour enlever "?" et "&"
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("="); // Pour enlever "=" et n'avoir que l'ID
        if (tmp[0] === projectID) result = decodeURIComponent(tmp[1]);
    }
    return result;
}
// Élément de l'URL en GET à vérifier
let checkInURL = "id";
// Stockage de l'ID qui est dans l'URL
let whichIDInURL = 0;
window.onload = function(){
   whichIDInURL = findGetParameter(checkInURL);
}

// Ajout projet
let newProjID = 0;
const newProjCont = [];
function addProj() {
    // Empêche d'ajouter plusieurs fois d'un coup
    btnAddProj.style.display = "none";

    // Création d'une ligne dans le tableau
    let newProjRow = document.createElement("tr");
    newProjRow.id = "newProjRow";
    // Ajout de la ligne au tableau
    tableauBody.appendChild(newProjRow);

    // Pour mettre le bon ID au nouveau projet
    let projIDCount = 0;
    // Compter le nombre de projets présents dans l'array
    projetsListe.forEach(element => {
        projIDCount += 1;
    });
    newProjID = projIDCount + 1; // ID du projet qui va être ajouté
    
    // Création balise td avec id en texte
    newProjIDCell = document.createElement("td");
    newProjIDCell.textContent = `${newProjID}`;
    newProjRow.appendChild(newProjIDCell);

    // Création des td nom/description/URL/image dans le tableau
    projCategoriesNoID.forEach(elm => {
        let newProjCat = `newProj${elm}`;
        newProjTextCell = document.createElement("td");
        newProjRow.appendChild(newProjTextCell);
        newProjTCInput = document.createElement("input");
        newProjTCInput.type = "text";
        newProjTCInput.name = newProjCat;
        newProjTCInput.id = newProjCat;
        newProjTCInput.placeholder = `${elm}...`;
        newProjTextCell.appendChild(newProjTCInput);
    });

    // Mettre l'ID du nouveau projet en href du bouton confirmer (GET)
    btnConfirmAP.href = `?id=${newProjID}`;
}

// Affichage du bouton de confirmation
btnAddProj.addEventListener("click", () => {
    btnConfirmAP.parentNode.style.display = "flex";
});
// Confirmation ajout projet
function confirmAddProj() {
    const newProjElems = [];
    // Mettre l'ID dans le tableau newProjElems
    let npIDFirstElem = newProjRow.querySelector("td");
    let idINT = parseInt(npIDFirstElem.textContent);
    newProjElems.push(idINT);
    // Prendre la valeur de chaque input et rajouter au tableau newProjElems
    let newProjAllRows = newProjRow.querySelectorAll("td input");
    for (let l = 0; l < newProjAllRows.length; l++){
        newProjElems.push(newProjAllRows[l].value);
    }
    
    // Création d'un objet pour le nouveau projet
    let newProjObj = new Object(
        {
            id: 0,
            name: "",
            description: "",
            url: "",
            image: ""
        }
    );
    
    let indexOE = 0; // Initialisation d'un compteur pour Object.entries
    for (const [key, value] of Object.entries(newProjObj)) {
        newProjObj[key] = newProjElems[indexOE];
        indexOE++;
    }
    
    // Ajouter l'objet au tableau projetsListe
    projetsListe.push(newProjObj);
}

// Annuler l'ajout d'un projet
btnCancelAP.addEventListener("click", () => {
    let pageLoc = window.location.pathname.substr(7); // Enlève infos GET
    window.location = pageLoc;
});


// Modification projet
function modProj() {
    console.log(`Vous avez cliqué sur ${btnModProj.textContent}.`);
}

// Suppression projet
function rmvProj() {
    console.log(`Vous avez cliqué sur ${btnRmvProj.textContent}.`);
}
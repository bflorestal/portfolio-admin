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
let btnAPChoice = document.getElementById("btnAPChoice");
let btnConfirmAP = document.getElementById("btnConfirmAP");
let btnCancelAP = document.getElementById("btnCancelAP");
let btnMPChoice = document.getElementById("btnMPChoice");
// Modifier/Supprimer
let actionsHTML = `<i class="fas fa-edit" onclick="modProj(this.id)"></i><i class="fas fa-trash-alt" onclick="rmvProj(this.id)"></i>`;

// Ajout des données de l'array dans le tableau
function createTableau() {
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
        // Création des actions pour chaque projet
        let projetCellActions = document.createElement("td");
        projetCellActions.innerHTML = actionsHTML;
        // Modification de l'id par rapport à l'id du projet
        let PCAc = projetCellActions.children;
        for (let o = 0; o < PCAc.length; o++) {
            if (PCAc[o].classList.contains("fa-edit")) {
                PCAc[o].id = `modifProj${projetsListe[i].id}`;
            } else if (PCAc[o].classList.contains("fa-trash-alt")) {
                PCAc[o].id = `removeProj${projetsListe[i].id}`;
            }
        }
        projetRow.appendChild(projetCellActions);
    }
}
window.onload = createTableau(); // La fonction s'effectue au chargement de la page

// Ajout projet
let newProjID = 0;
const newProjCont = [];
function addProj() {

    // Empêche d'ajouter plusieurs fois d'un coup
    btnAddProj.style.display = "none";
    btnAPChoice.style.display = "flex";
    // Empêche de modif ou suppr un autre projet pendant l'ajout
    let allActionsP = document.querySelectorAll("tbody tr td i");
    for (let prot = 0; prot<allActionsP.length; prot++) {
        test = allActionsP[prot].style.display = "none";
    }

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
        // Cellule vide pour les actions
        if (elm == "Actions") {
            newProjTextCell.innerHTML = "";
        } else {
            newProjTCInput = document.createElement("input");
            newProjTCInput.type = "text";
            newProjTCInput.name = newProjCat;
            newProjTCInput.id = newProjCat;
            newProjTCInput.placeholder = `${elm}...`;
            newProjTextCell.appendChild(newProjTCInput);
        }
    });
}

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
    
    // Ajoute l'objet au tableau projetsListe si tout a été rempli
    if (newProjObj.id && newProjObj.name && newProjObj.description && newProjObj.url && newProjObj.image) {
        projetsListe.push(newProjObj);
    }
    // Initialisation d'un compteur et une variable qui stocke les caractéristiques de l'objet
    let countNPRc = 1; 
    let contenuCell = "";
    // Si le nouveau projet a bien été complété, l'ajouter au tableau
    if (newProjObj.id && newProjObj.name && newProjObj.description && newProjObj.url && newProjObj.image) {
        // Si l'objet correspond bien au dernier élément de la liste des projets
        if (newProjObj == projetsListe.at(-1)) {
            // Remplace l'input par son contenu
            for (const [key, value] of Object.entries(projetsListe.at(-1))) {
                if (key != "id") { // ID déjà présent donc pas modifié
                    if (key == "url"){ // Balise a pour l'URL
                        contenuCell = `<a href="${value}" target="_blank">Cliquez ici</a>`;
                        newProjRow.children[countNPRc].innerHTML = contenuCell;
                    } else if (key == "image") { // Balise img pour l'image
                        contenuCell = `<img src="${value}" alt="${value}" />`;
                        newProjRow.children[countNPRc].innerHTML = contenuCell;
                    } else { // Texte pour le reste
                        contenuCell = value;
                        newProjRow.children[countNPRc].innerHTML = contenuCell;
                    }
                    countNPRc++;
                }
            }
            newProjRow.children[5].innerHTML = actionsHTML; // Affiche les actions
            let NPRlc = newProjRow.children[5].children;
            console.log(NPRlc)
            // Pour mettre les ID sur Modifier et Supprimer
            for (let NPRlccount = 0 ; NPRlccount < NPRlc.length; NPRlccount++) {
                if (NPRlc[NPRlccount].classList.contains("fa-edit")) {
                    NPRlc[NPRlccount].id = `modifProj${newProjObj.id}`;
                } else if (NPRlc[NPRlccount].classList.contains("fa-trash-alt")) {
                    NPRlc[NPRlccount].id = `removeProj${newProjObj.id}`;
                }
            }
            newProjRow.id = `tabProj${projetsListe.at(-1).id}`; // Pour éviter de supprimer l'ancienne ligne quand on annule après un ajout
        }
        btnAPChoice.style.display = "none"; // Les boutons Confirmer/Annuler disparaissent
        btnAddProj.style.display = "block"; // Le bouton ajouter réapparaît
        // Pour faire réapparaître les actions
        let allActionsS = document.querySelectorAll("tbody tr td i");
        for (let cb = 0; cb < allActionsS.length; cb++) {
            allActionsS[cb].style.display = "inline-block";
        }
    }
}

// Annuler l'ajout d'un projet
btnCancelAP.addEventListener("click", () => {
    newProjRow.remove(); // La ligne du tableau est supprimée
    btnAPChoice.style.display = "none"; // Les boutons Confirmer/Annuler disparaissent
    btnAddProj.style.display = "block"; // Le bouton ajouter réapparaît
    // Pour faire réapparaître les actions
    let allActionsS = document.querySelectorAll("tbody tr td i");
    for (let cb = 0; cb < allActionsS.length; cb++) {
        allActionsS[cb].style.display = "inline-block";
    }
});


// Modification projet
function modProj(clicked_id) {

    // Récupère la ligne (<tr>) du projet
    let projRowToMod = document.getElementById(clicked_id).parentNode.parentNode;

    // Stocke l'ID dans une variable (utile pour array)
    let IDprojToMod = projRowToMod.id.substr(7);

    // Modification des td nom/description/URL/image dans le tableau
    let pRTMc = projRowToMod.children; // Cellules de la ligne à modifier

    // Apparition/disparition des options CRUD
    btnAddProj.style.display = "none"; // Le bouton ajouter disparaît
    
    // Enlever les boutons modifier/supprimer des autres projets
    let allProjectRows = document.querySelectorAll("tbody tr");
    // Pour parcourir la liste des lignes du tableau
    allProjectRows.forEach(projectRow => {
        // Enlever les boutons modifier et supprimer des autres projets
        if (projectRow.id.substr(7) !== IDprojToMod) {
            projectRow.lastChild.innerHTML = "";
        }
    });

    // Stocke les informations à mettre dans l'input
    let infoInInput = "";
    // Stocke l'index (dans projCategoriesNoID) de ce qu'il faut mettre dans l'input
    let indmodQuelleInfo = 0;
    // Stocke ce qu'il faut mettre dans l'input
    let modQuelleInfo = "";

    // Pour parcourir le tableau pRTMc
    for (let pRTMCcount = 1; pRTMCcount < pRTMc.length; pRTMCcount++) {
        // À chaque catégorie (sauf ID), effectue une modification
        if (pRTMc[pRTMCcount] == projRowToMod.lastChild) {
            pRTMc[pRTMCcount].innerHTML = "" // Empêche de modifier ou supprimer pendant qu'on modifie déjà
        } else {
            // Création des input
            modProjTCInput = document.createElement("input");
            // Récupération des données à mettre dans les input
            infoInInput = pRTMc[pRTMCcount].innerHTML;

            // Si on a un <a> ou un <img>, prendre le lien comme value, sinon prendre le texte
            if (infoInInput.includes('<a href=')){
                infoInInput = pRTMc[pRTMCcount].firstChild.href;
                modProjTCInput.value = `${infoInInput}`;
            } else if (infoInInput.includes('<img src=')) {
                infoInInput = pRTMc[pRTMCcount].firstChild.src;
                modProjTCInput.value = `${infoInInput}`;
            } else {
                modProjTCInput.value = `${infoInInput}`;
            }
            modProjTCInput.type = "text";

            indmodQuelleInfo = pRTMCcount - 1;
            modQuelleInfo = projCategoriesNoID[indmodQuelleInfo];

            modProjTCInput.name = `modProj${modQuelleInfo}`;
            modProjTCInput.id = `modProj${modQuelleInfo}`;
            modProjTCInput.placeholder = `${modQuelleInfo}...`;
            //appendChild
            pRTMc[pRTMCcount].appendChild(modProjTCInput);
        }
    }
}

// Suppression projet
function rmvProj(clicked_id) {
    // Récupère la ligne (<tr>) du projet
    let projRowToRmv = document.getElementById(clicked_id).parentNode.parentNode;
    // Stocke l'ID dans une variable (utile pour array)
    let IDprojToRmv = projRowToRmv.id.substr(7);
    // Récupère l'objet dans l'array qui a cet ID
    projetsListe.forEach(element => {
        if(element.id == IDprojToRmv) {
            let indexDuProjet = projetsListe.indexOf(element); // Récupère l'index du projet qui a cet ID dans l'array
            projetsListe.splice(indexDuProjet, 1); // Supprime le projet de l'array
        }
    });
    // Supprime la ligne du tableau
    projRowToRmv.remove();
}
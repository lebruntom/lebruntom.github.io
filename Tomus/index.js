//Remplissage du profil
document.getElementById("motTrouve").innerHTML =
  localStorage.getItem("victoire");
document.getElementById("motJouer").innerHTML =
  localStorage.getItem("motjouer");
document.getElementById("coupMoyen").innerHTML =
  localStorage.getItem("coupMoyen");

//Selection du theme au chargement de la page
if (localStorage.getItem("theme") == 1) {
  document.getElementById("body").style.backgroundColor = "#c1c1c1";
  document.getElementById("sombre").checked = "false";
  document.getElementById("clair").checked = "true";
}
if (localStorage.getItem("theme") == 2) {
  document.getElementById("body").style.backgroundColor = "#959393";
  document.getElementById("clair").checked = "false";
  document.getElementById("sombre").checked = "true";
}

//retourne les données d'un documents texte
var rawFile = new XMLHttpRequest();
rawFile.open(
  "GET",
  "https://raw.githubusercontent.com/lebruntom/lebruntom.github.io/master/Tomus/mots.txt",
  false
);
rawFile.onreadystatechange = function () {
  let array = rawFile.responseText.split("\n");
  return array;
};
rawFile.send(null);

//Stock la reponse de la fonction dans un tableau
let tousLesMots = rawFile.onreadystatechange();

//sélectionne un mot aléatoire dans le tableau
let leMot = tousLesMots[Math.floor(Math.random() * tousLesMots.length)];

//Sélection d'un mot entre 5 et 8 caractères & tri pour avoir un mot moins difficile
while (
  leMot.length < 5 ||
  leMot.length > 8 ||
  leMot.indexOf("é") > -1 ||
  leMot.indexOf("á") > -1 ||
  leMot.indexOf("à") > -1 ||
  leMot.indexOf("ã") > -1 ||
  leMot.indexOf("â") > -1 ||
  leMot.indexOf("è") > -1 ||
  leMot.indexOf("ê") > -1 ||
  leMot.indexOf("í") > -1 ||
  leMot.indexOf("ì") > -1 ||
  leMot.indexOf("î") > -1 ||
  leMot.indexOf("õ") > -1 ||
  leMot.indexOf("ó") > -1 ||
  leMot.indexOf("ò") > -1 ||
  leMot.indexOf("ô") > -1 ||
  leMot.indexOf("ú") > -1 ||
  leMot.indexOf("ù") > -1 ||
  leMot.indexOf("û") > -1 ||
  leMot.indexOf("ï") > -1 ||
  leMot.indexOf("æ") > -1 ||
  leMot.indexOf("œ") > -1 ||
  leMot.indexOf("ü") > -1 ||
  leMot.indexOf("ç") > -1 ||
  leMot.substring(leMot.length - 3, leMot.length) == "ons" ||
  leMot.substring(leMot.length - 2, leMot.length) == "ez" ||
  leMot.substring(leMot.length - 5, leMot.length) == "aient" ||
  leMot.substring(leMot.length - 3, leMot.length) == "ent" ||
  leMot.substring(leMot.length - 1, leMot.length) == "a" ||
  leMot.substring(leMot.length - 2, leMot.length) == "ai" ||
  leMot.substring(leMot.length - 3, leMot.length) == "ais" ||
  leMot.substring(leMot.length - 3, leMot.length) == "ait" ||
  leMot.substring(leMot.length - 1, leMot.length) == "o" ||
  leMot.substring(leMot.length - 1, leMot.length) == "s" ||
  leMot.substring(leMot.length - 3, leMot.length) == "ont"
) {
  leMot = tousLesMots[Math.floor(Math.random() * tousLesMots.length)];
}

let lemot2 = leMot; //Stockage dans une 2eme variable du mot
let wordLength = leMot.length; //Prend la longueur du mot

//Créer les inputs au chargement de la page
document.addEventListener(
  "DOMContentLoaded",
  async function () {
    //Création des inputs
    for (let p = 1; p < 7; p++) {
      for (let i = 1; i < wordLength + 1; i++) {
        var zone = document.createElement("input");
        zone.type = "text";
        zone.id = `${p}-${i}`;
        zone.maxLength = "1";

        var container = document.getElementById(`essai-${p}`);
        container.appendChild(zone);
      }
    }

    //Enleve les accents et mets la première lettre en majuscule
    let SansAccent = leMot[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    document.getElementById("1-1").value = SansAccent[0].toUpperCase();

    //Selectionne le deuxième par défaut
    await document.getElementById("1-2").select();
  },
  false
);

let essaiActuel = 1; //Iniatialisé à 1 car c'est le premier essai au chargement de la page

//Passe à l'essai suivant quand on appuie sur 'entrer'
document.addEventListener("keydown", async function (event) {
  leMot = lemot2;
  if (event.keyCode == 13) {
    //Si la derniere case de la ligne en cours est remplie
    if (
      (await document.getElementById(`${essaiActuel}-${wordLength}`).value
        .length) == 1
    ) {
      let MotLigne = ""; //Mot saisi pour l'essai en cours
      //Remplissage de cette variable avec les donnes de la ligne
      for (let p = 1; p < wordLength + 1; p++) {
        MotLigne += document.getElementById(`${essaiActuel}-${p}`).value;
      }

      let MotExiste = ""; //Prendra la valeur d'un mot du dictionnaire dans la boucle
      let i = 0;
      let trouve = false;
      let nbLettresCorrect = 0; //Nombre de lettres correct par ligne

      //Verification si le mot saisi existe dans le dictionnaire
      while (i < tousLesMots.length && !trouve) {
        //Enlève tous les accents du mot
        MotExiste = tousLesMots[i]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        //Test si mot existe
        if (MotLigne == MotExiste.toUpperCase()) {
          trouve = true;
        } else {
          i++;
        }
      }
      //Si mot existe
      if (trouve) {
        let leMotComplet = leMot; //Stockage du mot à trouvef dans une varible
        let lettreCorrectes = ""; //Initialisation chaine de caractères qui prendra les lettres correctes
        nbLettresCorrect = 0; //remise à zéro du nombre de lettre trouvées pour la ligne en cours
        let cpt = 0; //Initialisation compteur 0
        let lettresTrouvees = ""; //Savoir les lettres rentré dans la ligne
        for (let x = 1; x < wordLength + 1; x++) {
          //Prend la valeur de la lettre du mot à trouver en fonction de la boucle
          MotExiste = leMotComplet[x - 1]
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

          //Si la lettre du mot à trouver est égale à la lettre saisie
          if (
            (await MotExiste.toUpperCase()) ==
            document.getElementById(`${essaiActuel}-${x}`).value
          ) {
            lettreCorrectes += document.getElementById(
              `${essaiActuel}-${x}`
            ).value; //Ajout lettre correcte dans la variable
            nbLettresCorrect++; //+1 lettre correcte

            let secondes = 250 * x; //Temps avant excution de la fonction
            //Délais avant d'afficher pour afficher petit à petit
            setTimeout(function declancherRouge() {
              document.getElementById(
                `${essaiActuel}-${x}`
              ).style.backgroundColor = "#DF1300"; //Cahngement du fond en rouge
              let lettreInconnu = document.getElementById(
                `${essaiActuel}-${x}`
              ).value; //prend la valeur de la lettre à giser
              document.getElementById(
                `${lettreInconnu.toLowerCase()}`
              ).style.backgroundColor = "#DF1300"; //Lettre grisée en rouge
              document.getElementById(
                `${lettreInconnu}`
              ).style.backgroundColor = "#DF1300"; //Lettre grisée en rouge
            }, secondes);
          }
        }

        //Enleve du mot les lettres biens placées
        leMot = leMot.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        leMot = leMot.toUpperCase();
        for (let t = 0; t < lettreCorrectes.length; t++) {
          leMot = leMot.replace(lettreCorrectes[t], "");
        }
        for (let a = 1; a < wordLength + 1; a++) {
          cpt = 0; //Remise à zéro du compteur
          //A chaque passage dans la boucle on rajoute à la chaine de caractère la lettre de l'input
          lettresTrouvees += document.getElementById(
            `${essaiActuel}-${a}`
          ).value;

          //Si la lettre de la ligne à déja été saisie plus tôt dans la ligne
          if (
            lettresTrouvees.split(
              document.getElementById(`${essaiActuel}-${a}`).value
            ).length -
              1 !=
            null
          ) {
            //Alors cpt prend le nombre de fois où la lettre existe dans la ligne
            cpt =
              lettresTrouvees.split(
                document.getElementById(`${essaiActuel}-${a}`).value
              ).length - 1;
          }

          MotExiste = leMotComplet[a - 1]
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); //Enleve accents
          let lettreParcourue = document.getElementById(
            `${essaiActuel}-${a}`
          ).value; //Prend la lettre de l'input que l'on parcours

          //Si la lettre parcourue existe moins ou autant de fois dans le mots de la ligne que dans le mot à deviner
          if (
            MotLigne.split(lettreParcourue).length - 1 <=
            leMotComplet.split(lettreParcourue).length - 1
          ) {
            //Si la lettre du mot à trouver est différente à la lettre saisie
            if (
              (await MotExiste.toUpperCase()) !=
              document.getElementById(`${essaiActuel}-${a}`).value
            ) {
              let secondes = 250 * a; //Temps avant excution de la fonction
              //Délais avant d'afficher pour afficher petit à petit
              setTimeout(function declancherJaune() {
                document.getElementById(
                  `${essaiActuel}-${a}`
                ).style.backgroundColor = "#ffd000"; //Changement du fond en jaune
              }, secondes);
            }
          }
          //Sinon, si le nombre de fois ou la lettre existe est inférieur ou égale au nombre où elle esxiste dans le mot à deviner
          else if (cpt <= leMot.split(lettreParcourue).length - 1) {
            //Si la lettre du mot à trouver est différente à la lettre saisie
            if (
              (await MotExiste.toUpperCase()) !=
              document.getElementById(`${essaiActuel}-${a}`).value
            ) {
              let secondes = 250 * a; //Temps avant excution de la fonction
              //Délais avant d'afficher pour afficher petit à petit
              setTimeout(function declancherJaune() {
                document.getElementById(
                  `${essaiActuel}-${a}`
                ).style.backgroundColor = "#ffd000"; //Changement du fond en jaune
              }, secondes);
            }
          } else {
            //Si la lettre n'est pas une lettre correcte
            if (
              lettreCorrectes.split(
                document.getElementById(`${essaiActuel}-${a}`).value
              ).length -
                1 ==
              0
            ) {
              let lettreInconnu = document.getElementById(
                `${essaiActuel}-${a}`
              ).value; //Prend la valuer à griser
              document.getElementById(
                `${lettreInconnu.toLowerCase()}`
              ).style.backgroundColor = "grey"; //Lettre grisée en gris
              document.getElementById(
                `${lettreInconnu}`
              ).style.backgroundColor = "grey"; //Lettre grisée en gris
            }
          }
        }
        //Si toutes les lettres sont bonnes == Victoire
        if (nbLettresCorrect == wordLength) {
          //Nombre de mots joués +1
          if (essaiActuel == 1) {
            let unEnplus = Number(localStorage.getItem("motjouer")) + 1;
            localStorage.setItem("motjouer", unEnplus);
          }

          //Nombre de victoire +1
          let victoire = Number(localStorage.getItem("victoire")) + 1;
          localStorage.setItem("victoire", victoire);

          //si coup moyen existe
          if (localStorage.getItem("coupMoyen") != 0) {
            //Calcul du coup moyen pour trouver le bon mot
            let moyenneCoup =
              ((Number(localStorage.getItem("victoire")) - 1) *
                Number(localStorage.getItem("coupMoyen")) +
                essaiActuel) /
              Number(localStorage.getItem("victoire"));
            localStorage.setItem("coupMoyen", moyenneCoup.toFixed(1));
          } else {
            //Calcul du coup moyen pour trouver le bon mot
            let moyenneCoup =
              ((Number(localStorage.getItem("victoire")) - 1) * 0 +
                essaiActuel) /
              Number(localStorage.getItem("victoire"));
            localStorage.setItem("coupMoyen", moyenneCoup);
          }

          let secondes = 300 * wordLength; //Temps avant execution pour laisser le temps aux cases de changer de couleur

          //Cases en readonly
          for (let i = 1; i < wordLength + 1; i++) {
            document.getElementById(`${essaiActuel}-${i}`).readOnly = "true";
          }

          //Mots suivant apres avoir coloré les lettres
          setTimeout(async function victory() {
            //Affichage message victoire
            document.getElementById("rejouer").style.display = "block";
            document.getElementById("victoire").style.display = "block";
            document.getElementById(
              "reponse"
            ).innerHTML = `Mot trouvé en ${essaiActuel} essai !`;
            location.href = "#resultats";
          }, secondes);
        }
        //Défaite
        else if (essaiActuel == 6) {
          let secondes = 300 * wordLength; //Temps avant execution de la fonction

          //Cases en readonly
          for (let i = 1; i < wordLength + 1; i++) {
            document.getElementById(`${essaiActuel}-${i}`).readOnly = "true";
          }

          //Mots suivant apres avoir coloré les lettres
          setTimeout(async function Defaite() {
            //Affichage message victoire
            document.getElementById("rejouer").style.display = "block";
            document.getElementById("defaite").style.display = "block";
            document.getElementById(
              "motResult"
            ).innerHTML = `Le mot correct était : ${leMotComplet.toUpperCase()}`;
            document.getElementById(
              "reponse"
            ).innerHTML = `Réesaye pour tenter de trouver le prochain mot !`;
            location.href = "#resultats";
          }, secondes);
        }
        //Sinon passe à la ligne suivante
        else {
          let secondes = 300 * wordLength; //Temps avant execution

          //Mots suivant apres avoir coloré les lettres
          setTimeout(async function ligneSuivante() {
            essaiActuel++; //Nombre d'essai +1
            if ((await essaiActuel) == 2) {
              let unEnplus = Number(localStorage.getItem("motjouer")) + 1;
              localStorage.setItem("motjouer", unEnplus);
            }
            leMotComplet = leMotComplet
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""); //Enleve accent saisi

            document.getElementById(`${essaiActuel}-1`).value = leMotComplet
              .substring(0, 1)
              .toUpperCase(); //Prend en valeur la premiere lettre du mot à trouver
            await document.getElementById(`${essaiActuel}-2`).select(); //Select le 2eme de la prochaine ligne
          }, secondes);
        }
      }
      //Sinon le mot n'existe pas dans le dictionnaire alors affichage message mot inconnu
      else {
        document.getElementById("motInconnu").style.opacity = "1";

        setTimeout(function Hidden() {
          document.getElementById("motInconnu").style.opacity = "0";
        }, 2000);
      }
    }
  }
});

//Passer à la case suivante quand la case d'avant est remplie
document.addEventListener("keydown", async function (event) {
  for (let i = 2; i < wordLength + 1; i++) {
    document.getElementById(`${essaiActuel}-${i}`).oninput = function () {
      let str = document.getElementById(`${essaiActuel}-${i}`).value;
      if (str.length == 1) {
        document.getElementById(`${essaiActuel}-${i}`).value = document
          .getElementById(`${essaiActuel}-${i}`)
          .value.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""); //Enleve l'accent saisi
        document.getElementById(`${essaiActuel}-${i}`).value = document
          .getElementById(`${essaiActuel}-${i}`)
          .value.toUpperCase(); //Met la lettre en majuscule
        document.getElementById(`${essaiActuel}-${i + 1}`).select(); //Selectionne la suivante
      }
    };
  }
});

//Quand on clique sur la touche "supprimer"
document.addEventListener("keydown", async function (event) {
  if (event.keyCode == 8) {
    let i = 2; // On commence à chercher à partir de la case 2
    let trouve = false; //Variable pour le while

    //Rechere de la bonne case pour la suppression
    while (i < wordLength + 1 && !trouve) {
      if (
        (await document.getElementById(`${essaiActuel}-${i + 1}`).value
          .length) == 0
      ) {
        await document.getElementById(`${essaiActuel}-${i}`).focus();
        trouve = true;
      }
      i++;
    }
  }
});

//Sélectionne la bonne case peut importe ou on clique dans la page
document.getElementById("body").onclick = function () {
  let i = 2; // On commence à chercher à partir de la case 2
  let trouve = false; //Variable pour le while
  let position = 0; //prendra la valeur de la position de la casse à selectionner
  //Rechere de la bonne case à selectionner
  while (i < wordLength + 1 && !trouve) {
    //Si pour il y a une case de vide pour l'eesai actuel
    if (document.getElementById(`${essaiActuel}-${i}`).value.length != 1) {
      position = i; //Stock la bonne position
      trouve = true; //Fin du while
    }
    i++;
  }
  if (trouve) {
    document.getElementById(`${essaiActuel}-${position}`).focus(); //On selectionne la case trouvée
  } else {
    document.getElementById(`${essaiActuel}-${wordLength}`).focus(); //On selectionne la derniere case pour l'essai actuel
  }
};

//Rejouer, on refresh la page
function rejouer() {
  location.href = "#";
  location.reload();
}
//Redirection vers popin reset
function reset() {
  location.href = "#reset";
}
//Retour vers popin profil
function resetCancel() {
  location.href = "#profil";
}
//Reinitialisation des statistique, refresh la page et retour sur le popin profil
function resetConfirm() {
  location.href = "#profil";
  localStorage.removeItem("coupMoyen");
  localStorage.removeItem("victoire");
  localStorage.removeItem("motjouer");
  location.reload();
  location.href = "#profil";
}

//Changment du theme
function theme(x) {
  //Theme clair sinon sombre
  if (x == 1) {
    document.getElementById("body").style.backgroundColor = "#c1c1c1"; //Changement de couleur du background
    localStorage.setItem("theme", "1"); //Garde en mémoire le thème choisi
  } else {
    document.getElementById("body").style.backgroundColor = "#959393"; //Changement de couleur du background
    localStorage.setItem("theme", "2"); //Garde en mémoire le thème choisi
  }
}

const cercles = document.getElementsByClassName("cercle");
const grands = document.getElementsByClassName("zoom-grand");
const petits = document.getElementsByClassName("zoom-petit");
const traits = document.getElementsByClassName("traits");

// document.addEventListener('DOMContentLoaded', () => {
//   fetch('public/data/data.json')
//   .then((response) => response.json())
//   .then((data) => {
//     document.querySelector('#texte-zoom-reliure').textContent = data.textezoomreliure
//   })
// })

function afficherZoom(cible1, cible2, cible3, cible4) {
  for (let i = 0; i < cercles.length; i++) {
    cercles[i].classList.remove("active");
    grands[i].classList.remove("active");
    petits[i].classList.remove("active");
    traits[i].classList.remove("active");
  }
  cible1.classList.add("active");
  cible2.classList.add("active");
  cible3.classList.add("active");
  cible4.classList.add("active");
}

for (let i = 0; i < cercles.length; i++) {
  let cercleCible = cercles[i];
  let grandCible = grands[i];
  let petitCible = petits[i];
  let traitCible = traits[i];
  cercles[i].addEventListener("click", () => {
    afficherZoom(cercleCible, grandCible, petitCible, traitCible);
  });
}

// const buttonTermine = document.getElementsByClassName("bouton-termine");

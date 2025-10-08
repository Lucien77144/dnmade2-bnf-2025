document.addEventListener('DOMContentLoaded', () => {
    fetch('data/data.json')
        .then((response) => response.json())
        .then((data) => {

            document.querySelector('#annee-1').textContent = data.annees[0].date
            document.querySelector('#annee-2').textContent = data.annees[1].date
            document.querySelector('#annee-3').textContent = data.annees[2].date
            document.querySelector('#annee-4').textContent = data.annees[3].date
            document.querySelector('#annee-5').textContent = data.annees[4].date

            document.querySelector('#description-1').textContent = data.annees[0].description
            document.querySelector('#description-2').textContent = data.annees[1].description
            document.querySelector('#description-3').textContent = data.annees[2].description
            document.querySelector('#description-4').textContent = data.annees[3].description
            document.querySelector('#description-5').textContent = data.annees[4].description

        });
});




window.onload = function () {

    let points = document.getElementsByClassName("point");
    let annees = document.getElementsByClassName("annee");
    let tirets = document.getElementsByClassName("vl");
    let descriptions = document.getElementsByClassName("description");
    let pointsBas = document.getElementsByClassName("pointBas");

    console.log(points)
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        let annee = annees[i];
        let tiret = tirets[i];
        let description = descriptions[i];
        let pointBas = pointsBas[i];
        point.addEventListener('click', function () {
            changerEtat(point, annee, tiret, description, pointBas);
        });
    }

    function changerEtat(cible1, cible2, cible3, cible4, cible5) {
        for (let i = 0; i < points.length; i++) {
            annees[i].classList.remove('active');
            points[i].classList.remove('active');
            tirets[i].classList.remove('active');
            descriptions[i].classList.remove('active');
            pointsBas[i].classList.remove('active');
        };
        cible1.classList.add('active');
        cible2.classList.add('active');
        cible3.classList.add('active');
        cible4.classList.add('active');
        cible5.classList.add('active');
    }
}
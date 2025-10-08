//a mettre dans le DOM
document.addEventListener('DOMContentLoaded', () => {
  fetch('/public/data/brush.json')
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('#text').textContent = data.text;
    });
  
  //Partie de Sara
  const brush = document.getElementById('brush');
  const reveal = document.getElementById('revealImage');
  let animating = false;
  brush.addEventListener('click', () => {
    if (animating) return;
    animating = true;
    brush.classList.add('active');
    reveal.classList.add('active');
  })
  //Fin partie de Sara
});

const data = require('/public/data/brush.json');
console.log(data);



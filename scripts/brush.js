document.addEventListener('DOMContentLoaded', () => {
  fetch('../styles/views/brush.json')
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('#text').textContent = data.text;
    });
    
})

const data = require ('../styles/views/brush.json');
console.log(data);

const brush = document.getElementById('brush');
const reveal = document.getElementById('revealImage');
let animating = false;

brush.addEventListener('click', () => {
  if (animating) return;
  animating = true;

  brush.classList.add('active'); 
  reveal.classList.add('active'); 

});

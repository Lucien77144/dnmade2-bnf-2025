document.addEventListener('DOMContentLoaded', () => {
  fetch('../styles/views/brush.json')
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('#text').textContent = data.text;
    });
    
})

const data = require ('../styles/views/brush.json');
console.log(data);


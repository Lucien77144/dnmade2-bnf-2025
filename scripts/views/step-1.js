
let json
fetch('../public/data/step-1.json')
.then((Response) => Response.json())
.then((step1) => {
json=step1
})
document.addEventListener('DOMContentLoaded', () => {
  start()
})

function start() {
  const imgContainer = document.querySelector('.image')
  const mainImage = document.getElementById('mainImage')

  const sideImage = document.createElement('img')
  sideImage.src = '../img/zoom.webp'
  sideImage.alt = 'Deuxième manuscrit'
  sideImage.style.display = 'none'
  sideImage.classList.add('side-image')
  imgContainer.appendChild(sideImage)

  let visible = false;

mainImage.addEventListener('click', (event) => {
  event.stopPropagation(); // empêche de compter comme un clic "ailleurs"
  
  if (!visible) {
    sideImage.style.display = "block";
    requestAnimationFrame(() => {
      sideImage.style.opacity = 1;
      sideImage.style.transform = "scale(1) rotate(0deg)";
    });
    visible = true;
  }
});

document.addEventListener('click', () => {
  if (visible) {
    sideImage.style.opacity = 0;
    sideImage.style.transform = "scale(0.98) rotate(0deg)";
    setTimeout(() => {
      sideImage.style.display = "none";
    }, 400);
    visible = false;
  }
});
}
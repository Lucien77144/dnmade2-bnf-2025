
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

  mainImage.addEventListener('click', () => {
    sideImage.style.display = 'block'
    sideImage.style.opacity = 1
    sideImage.style.transform = 'scale(1) rotate(0deg)'
  })
}
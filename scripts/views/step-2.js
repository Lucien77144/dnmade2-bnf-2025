let json

// Chargement du JSON
fetch('../public/data/step-1.json')
  .then((response) => response.json())
  .then((step1) => {
    json = step1
  })

// Démarrage une fois le DOM chargé
document.addEventListener('DOMContentLoaded', start)

function start() {
  const imgContainer = document.querySelector('.image')
  const mainImage = document.getElementById('mainImage')
  const overlay = document.getElementById('overlay')
  const feather = document.getElementById('feather')

  // Création de l'image secondaire (zoom)
  const sideImage = document.createElement('img')
  sideImage.src = '../public/images/zoom.webp'
  sideImage.alt = 'Deuxième manuscrit'
  sideImage.style.display = 'none'
  sideImage.classList.add('side-image')
  imgContainer.appendChild(sideImage)

  let visible = false
  let overlayAnimating = false
  let featherUsed = false

  // 🪶 Animation plume + rideau beige
  feather.addEventListener('click', () => {
    if (overlayAnimating) return
    overlayAnimating = true
    feather.style.cursor = 'default'

    const imageRect = mainImage.getBoundingClientRect()
    const startTime = Date.now()
    const duration = 4000 // plus lent : 4 secondes

    function animate() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // adoucit le mouvement

      // Fait descendre le rideau beige progressivement
      const revealHeight = imageRect.height * eased
      overlay.style.clipPath = `inset(${revealHeight}px 0 0 0)`

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Quand c’est fini, on fait disparaître le beige
        overlay.style.transition = 'opacity 1.5s ease'
        overlay.style.opacity = '0'
        setTimeout(() => {
          overlay.style.display = 'none'
          overlay.style.opacity = '1' // reset
          overlayAnimating = false
          feather.classList.add('hidden')
          featherUsed = true
          mainImage.style.cursor = 'pointer'
        }, 1500)
      }
    }

    animate()
  })

  // 🖼️ Clic sur l’image principale (affiche le zoom)
  mainImage.addEventListener('click', (event) => {
    event.stopPropagation()
    if (!visible && !overlayAnimating && featherUsed) {
      sideImage.style.display = 'block'
      requestAnimationFrame(() => {
        sideImage.style.opacity = 1
        sideImage.style.transform = 'scale(1) rotate(0deg)'
      })
      visible = true
    }
  })

  // 🔙 Clic ailleurs pour fermer
  document.addEventListener('click', () => {
    if (visible && !overlayAnimating && featherUsed) {
      sideImage.style.opacity = 0
      sideImage.style.transform = 'scale(0.98) rotate(0deg)'
      setTimeout(() => {
        sideImage.style.display = 'none'
      }, 400)
      visible = false
    }
  })
}

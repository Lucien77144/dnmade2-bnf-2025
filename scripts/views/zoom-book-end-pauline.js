// Pauline


 
import {resizePreview} from "./zoom-book-end-anaelle.js"
export let zoomIndex = 0;

window.addEventListener('DOMContentLoaded', (e) => {
  /*---------------------------------------------------
  -----------------------------------------------------
  
  AGGRANDIR ET RETRECIR L'IMAGE
  
  -----------------------------------------------------
  -----------------------------------------------------*/

  const zoomInButton = document.getElementById('zoom-book-end-zoom-in-button')
  const zoomOutButton = document.getElementById('zoom-book-end-zoom-out-button')
  const containerEl = document.getElementById('zoom-book-end-container')
  const imageEl = document.getElementById('zoom-book-end-image')


  const sizes = {
    width: imageEl.offsetWidth,
    height: imageEl.offsetHeight,
  }

  const SCALE_SIZES = [ 1, 2, 3, 4, 5, ]
  const tl = gsap.timeline({
    duration: 0.5,
    ease: 'ease-in-out',
  })

  function zoomIn() {
    zoomIndex++

    if (zoomIndex > SCALE_SIZES.length - 1) return

    const scale = SCALE_SIZES[zoomIndex]
    zoom(scale)
    console.log(imageEl.offsetWidth)
    resizePreview(zoomIndex)
  }

  function zoomOut() {
    zoomIndex--

    if (zoomIndex < 0) return

    const scale = SCALE_SIZES[zoomIndex]
    zoom(scale)
    resizePreview(zoomIndex)
  }

  function zoom(scale) {
    // Set the width scale
    const currentWidth = sizes.width * scale
    const currentHeight = sizes.height * scale

    // Instant finish previous zoom
    tl.totalProgress(1)

    // Set the width scale and scroll to center the image
    tl.to(imageEl, {
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      onStart: () => {
        containerEl.classList.add('zoomed')
      },
      onUpdate: () => {
        const left = containerEl.scrollWidth - containerEl.clientWidth
        const top = containerEl.scrollHeight - containerEl.clientHeight

        containerEl.scrollTo({
          left: left / 2,
          top: top / 2,
          behavior: 'instant',
        })
      },
    })
  }

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)
  console.log(imageEl.offsetWidth)
})


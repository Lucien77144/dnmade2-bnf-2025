//import ScrollSmoother from "./gsap/umd/ScrollSmoother.js";
//import ScrollTrigger from "./gsap/umd/ScrollTrigger.js";

window.addEventListener('DOMContentLoaded', () => {
  /*---------------------------------------------------
  -----------------------------------------------------
  
  AGGRANDIR ET RETRECIR L'IMAGE
  
  -----------------------------------------------------
  -----------------------------------------------------*/

  zoomInButton = document.getElementById('zoom-book-end-zoom-in-button')
  zoomOutButton = document.getElementById('zoom-book-end-zoom-out-button')
  zoomBookEndPhotoReliure = document.getElementById('zoom-book-end-image')
  let zoomIndex = 0

  const SCALE_SIZES = [1, 1.2, 1.6, 2, 2.2]
  function zoomIn() {
    if (zoomIndex < SCALE_SIZES.length - 1) {
      zoomIndex++
    }
    zoomBookEndPhotoReliure.style.transform = `scale(${SCALE_SIZES[zoomIndex]})`

    // Add zoomed class when scale > 1
    if (SCALE_SIZES[zoomIndex] > 1) {
      bookZoomEndContainer.classList.add('zoomed')
    }
  }
  const bookZoomEndContainer = document.getElementById(
    'zoom-book-end-container'
  )

  const previewMovingFrame = document.querySelector('#zoom-book-end-image')

  function bookZoomPreview(x, y) {
    const movingX = Math.floor((192 / x) * 100)
    const movingY = Math.floor((108 / y) * 100)

    if (movingX >= 101) {
      previewMovingFrame.style.left = '100%'
    } else if (movingX <= 0) {
      previewMovingFrame.style.left = '0%'
    } else {
      previewMovingFrame.style.left = movingX + '%'
    }

    previewMovingFrame.style.top = movingY + '%'

    console.log(movingX, movingY)
  }

  bookZoomEndContainer.addEventListener(
    'touchmove',
    (event) => {
      const touchX = event.touches[0].offsetX
      const touchY = event.touches[0].offsetY

      bookZoomPreview(touchX, touchY)
    },
    { passive: true }
  )

  function zoomOut() {
    if (zoomIndex > 0) {
      zoomIndex--
    }
    zoomBookEndPhotoReliure.style.transform = `scale(${SCALE_SIZES[zoomIndex]})`

    // Remove zoomed class when back to scale 1
    if (SCALE_SIZES[zoomIndex] <= 1) {
      bookZoomEndContainer.classList.remove('zoomed')
    }
  }

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)
})

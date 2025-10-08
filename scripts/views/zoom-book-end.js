//import ScrollSmoother from "./gsap/umd/ScrollSmoother.js";
//import ScrollTrigger from "./gsap/umd/ScrollTrigger.js";

window.addEventListener('DOMContentLoaded', () => {
  /*---------------------------------------------------
  -----------------------------------------------------
  
  AGGRANDIR ET RETRECIR L'IMAGE
  
  -----------------------------------------------------
  -----------------------------------------------------*/

  const zoomInButton = document.getElementById('zoom-book-end-zoom-in-button')
  const zoomOutButton = document.getElementById('zoom-book-end-zoom-out-button')
  const containerEl = document.getElementById('zoom-book-end-container')
  const imageEl = document.getElementById('zoom-book-end-image')

  let zoomIndex = 0

  const sizes = {
    width: imageEl.offsetWidth,
    height: imageEl.offsetHeight,
  }

  const SCALE_SIZES = [1.2, 1.6, 2, 2.2]
  const tl = gsap.timeline({
    duration: 0.5,
    ease: 'ease-in-out',
  })

  function zoomIn() {
    const scale = SCALE_SIZES[zoomIndex]

    if (zoomIndex >= SCALE_SIZES.length - 1) return
    zoomIndex++

    // Set the width scale
    const currentWidth = sizes.width * scale
    // previewMovingFrame.style.width = `${currentWidth}px`

    // Instant finish previous zoom
    tl.totalProgress(1)

    // Set the width scale and scroll to center the image
    tl.to(imageEl, {
      width: `${currentWidth}px`,
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

  function bookZoomPreview(x, y) {
    const movingX = Math.floor((192 / x) * 100)
    const movingY = Math.floor((108 / y) * 100)

    if (movingX >= 101) {
      imageEl.style.left = '100%'
    } else if (movingX <= 0) {
      imageEl.style.left = '0%'
    } else {
      imageEl.style.left = movingX + '%'
    }

    imageEl.style.top = movingY + '%'
  }

  containerEl.addEventListener(
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
    imageEl.style.transform = `scale(${SCALE_SIZES[zoomIndex]})`

    // Remove zoomed class when back to scale 1
    if (SCALE_SIZES[zoomIndex] <= 1) {
      containerEl.classList.remove('zoomed')
    }
  }

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)
})

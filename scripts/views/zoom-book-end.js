// import ScrollSmoother from "./gsap/umd/ScrollSmoother.js";
// import ScrollTrigger from "./gsap/umd/ScrollTrigger.js";

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
  const previewSpanEl = document.querySelector('#zoom-book-end-preview span')

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
    zoomIndex++

    if (zoomIndex > SCALE_SIZES.length - 1) return

    const scale = SCALE_SIZES[zoomIndex]
    zoom(scale)
  }

  function zoomOut() {
    zoomIndex--

    if (zoomIndex < 0) return

    const scale = SCALE_SIZES[zoomIndex]
    zoom(scale)
  }

  function zoom(scale) {
    // Set the width scale
    const currentWidth = sizes.width * scale

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
    let movingX = (x / 1920) * 100
    let movingY = (y / 1080) * 100

    if (movingX >= 101) {
      movingX = ((1920 - previewSpanEl.offsetWidth * 2) / 1920) * 100
    } else if (movingX < 0) {
      movingX = 0
    }

    if (movingY >= 101) {
      movingY = ((1080 - previewSpanEl.offsetHeight * 2) / 1080) * 100
    } else if (movingY < 0) {
      movingY = 0
    }

    previewSpanEl.style.top = movingY + '%'
    previewSpanEl.style.left = movingX + '%'
  }

  console.log(zoomIndex)

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)

  let saveLastTouchX = 0
  let saveLastTouchY = 0

  containerEl.addEventListener(
    'touchstart',
    () => {
      previewSpanEl.style.width = '20%'
      previewSpanEl.style.height = '10%'

      const touchX = saveLastTouchX
      const touchY = saveLastTouchY

      bookZoomPreview(touchX, touchY)
    },
    { passive: true }
  )

  containerEl.addEventListener(
    'touchmove',
    (event) => {
      const touchX = event.touches[0].pageX
      const touchY = event.touches[0].pageY

      saveLastTouchX = touchX
      saveLastTouchY = touchY

      bookZoomPreview(touchX, touchY)
    },
    { passive: true }
  )

  containerEl.addEventListener(
    'touchend',
    () => {
      const touchX = saveLastTouchX
      const touchY = saveLastTouchY

      bookZoomPreview(touchX, touchY)
    },
    { passive: true }
  )
})

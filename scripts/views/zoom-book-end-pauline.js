// Pauline
import { resizePreview } from './zoom-book-end-anaelle.js'
export let zoomIndex = 0

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

  const SCALE_SIZES = [1, 2, 3, 4, 5]
  const sizes = {
    defaultWidth: imageEl.offsetWidth,
    defaultHeight: imageEl.offsetHeight,
    scale: SCALE_SIZES[0],
  }

  const tl = gsap.timeline({
    duration: 0.5,
    ease: 'ease-in-out',
  })

  function zoomIn() {
    zoomIndex++

    if (zoomIndex > SCALE_SIZES.length - 1) return

    sizes.scale = SCALE_SIZES[zoomIndex]

    zoom()
    resizePreview(zoomIndex)
  }

  function zoomOut() {
    zoomIndex--

    if (zoomIndex < 0) return

    sizes.scale = SCALE_SIZES[zoomIndex]

    zoom()
    resizePreview(zoomIndex)
  }

  function getScrollableSizes() {
    return {
      width: containerEl.scrollWidth - containerEl.clientWidth,
      height: containerEl.scrollHeight - containerEl.clientHeight,
    }
  }

  function zoom() {
    // Instant finish previous zoom
    tl.totalProgress(1)

    // Get the scrollable size
    const scrollable = getScrollableSizes()

    // If the axis is scrollable, convert the user coordinates to a factor (0-1), else set factor to 0.5
    const userScrollFactor = {
      x: scrollable.width ? containerEl.scrollLeft / scrollable.width : 0.5,
      y: scrollable.height ? containerEl.scrollTop / scrollable.height : 0.5,
    }

    // Set the new width & height
    const width = sizes.defaultWidth * sizes.scale + 'px'
    const height = sizes.defaultHeight * sizes.scale + 'px'

    // Set the new width & height with gsap animation
    tl.to(imageEl, {
      width,
      height,
      onStart: () => {
        containerEl.classList.add('zoomed')
      },
      onUpdate: () => {
        // Get the scrollable size (updated at each tick by gsap)
        const scrollable = getScrollableSizes()

        // Scroll to the new position
        containerEl.scrollTo({
          left: scrollable.width * userScrollFactor.x,
          top: scrollable.height * userScrollFactor.y,
          behavior: 'instant',
        })
      },
    })
  }

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)
})

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

  // Get the viewport size (in pixels)
  const vp = {
    width: containerEl.clientWidth,
    height: containerEl.clientHeight,
  }
  // Get the viewport origin (the center of the screen, in pixels)
  const vpOrigin = {
    x: vp.width / 2,
    y: vp.height / 2,
  }

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
    if (zoomIndex + 1 > SCALE_SIZES.length - 1) return
    zoomIndex++

    sizes.scale = SCALE_SIZES[zoomIndex]

    zoom()
    resizePreview(zoomIndex)
  }

  function zoomOut() {
    if (zoomIndex - 1 < 0) return
    zoomIndex--

    sizes.scale = SCALE_SIZES[zoomIndex]

    zoom()
    resizePreview(zoomIndex)
  }
  function zoom() {
    // Instant finish previous zoom
    tl.totalProgress(1)

    // Get the scrollable area size (in pixels)
    const scroll = {
      width: containerEl.scrollWidth,
      height: containerEl.scrollHeight,
    }

    // Get the target scroll position (from 0 to 1)
    const target = { x: 0.5, y: 0.5 }

    // If the width is scrollable
    if (scroll.width) {
      // Get the center of the viewport in the container (in pixels)
      const vpX = containerEl.scrollLeft + vpOrigin.x

      // Convert the viewport position to a target position (from 0 to 1)
      target.x = vpX / scroll.width
    }

    // If the height is scrollable
    if (scroll.height) {
      // Get the center of the viewport in the container (in pixels)
      const vpY = containerEl.scrollTop + vpOrigin.y

      // Convert the viewport position to a target position (from 0 to 1)
      target.y = vpY / scroll.height
    }

    // Set the new width & height of the image
    const width = sizes.defaultWidth * sizes.scale + 'px'
    const height = sizes.defaultHeight * sizes.scale + 'px'

    // Set the new width & height with gsap animation
    tl.to(imageEl, {
      width,
      height,
      onStart: () => containerEl.classList.add('zoomed'),
      onUpdate: () => {
        // Get the total scroll size, that might have changed (in pixels)
        const scroll = {
          width: containerEl.scrollWidth,
          height: containerEl.scrollHeight,
        }

        // Get the target scroll position in the container (in pixels)
        const left = target.x * scroll.width - vpOrigin.x
        const top = target.y * scroll.height - vpOrigin.y

        // Scroll to the target position
        containerEl.scrollTo({
          left,
          top,
          behavior: 'instant',
        })
      },
    })
  }

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)
})

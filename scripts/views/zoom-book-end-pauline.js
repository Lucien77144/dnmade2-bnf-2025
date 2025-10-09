// Pauline

import {
  saveLastTouchX,
  saveLastTouchY,
  resizePreview,
} from './zoom-book-end-anaelle.js'
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

  //get factor

  const sizes = {
    width: imageEl.offsetWidth,
    height: imageEl.offsetHeight,
  }

  const SCALE_SIZES = [1, 2, 3, 4, 5]
  const tl = gsap.timeline({
    duration: 0.5,
    ease: 'ease-in-out',
  })

  function zoomIn() {
    zoomIndex++

    if (zoomIndex > SCALE_SIZES.length - 1) return

    const scale = SCALE_SIZES[zoomIndex]
    zoom(scale)
    // console.log(imageEl.offsetWidth)
    resizePreview(zoomIndex)
  }

  function zoomOut() {
    zoomIndex--

    if (zoomIndex < 0) return

    const scale = SCALE_SIZES[zoomIndex]
    zoom(scale)
    resizePreview(zoomIndex)
  }

  let currentWidth = sizes.width
  let currentHeight = sizes.height
  function zoom(scale) {

    // Save previous Width
    const prevWidth = currentWidth
    const prevHeight = currentHeight

    // Set the width scale
     currentWidth = sizes.width * scale
     currentHeight = sizes.height * scale

    //get factor

    const UserpositionX = containerEl.scrollLeft + containerEl.clientWidth / 2
    const UserpositionY = containerEl.scrollTop + containerEl.clientHeight / 2

    const imageW = containerEl.scrollWidth
    const imageH = containerEl.scrollHeight

    let lastXfactor = UserpositionX / imageW
    let lastYfactor = UserpositionY / imageH
    console.log(UserpositionY, prevHeight, imageH)
    console.log(lastYfactor)

    lastXfactor = containerEl.clientWidth > imageW ? 0.5 : lastXfactor // if else poiur une variable en 1 ligne
    lastYfactor = containerEl.clientHeight > imageH ? 0.5 : lastYfactor

    // console.log(saveLastTouchX, saveLastTouchY)   maj+ cmd + :

    // Instant finish previous zoom
    tl.totalProgress(1)

    imageEl.lastXfactor ??= lastXfactor
    imageEl.lastYfactor ??= lastYfactor

    // Set the width scale and scroll to center the image
    tl.to(
      imageEl,
      {
        width: `${currentWidth}px`,
        height: `${currentHeight}px`,
        lastXfactor,
        lastYfactor,
        onStart: () => containerEl.classList.add('zoomed'),
        onUpdate: () => {
          const width = imageW / 2
          //  - (containerEl.clientWidth * imageEl.lastXfactor)
          const height = imageH / 2
          //  - (containerEl.clientHeight * imageEl.lastYfactor)

          containerEl.scrollTo({
            left: width,
            top: height,
            behavior: 'instant',
          })
        },
      },
    )
  }

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)
  // console.log(imageEl.offsetWidth)
})

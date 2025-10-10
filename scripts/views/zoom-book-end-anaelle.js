// Anaelle

export let saveLastTouchX = 50
export let saveLastTouchY = 50

import { getZoomTarget } from './zoom-book-end-pauline.js'

// récupération des éléments

const previewSpanEl = document.querySelector('#zoom-book-end-preview span')
const previewBookContainerEl = document.querySelector('#zoom-book-end-preview')
const containerEl = document.getElementById('zoom-book-end-container')

// plein écran et premiere action
let fullScreen = true

// start

window.addEventListener('DOMContentLoaded', () => {
  const rect = containerEl.getBoundingClientRect()

  previewBookContainerEl.style.width = rect.width / 4 + 'px'
  previewBookContainerEl.style.height = rect.height / 4 + 'px'


  containerEl.addEventListener(
    'touchmove',
    () => {
      if (!fullScreen) {

        const target = getZoomTarget()
        console.log(target.x, target.y)

        let posX = target.x * 100;
        let posY = target.y * 100;

        console.log(posY,posX)

        previewSpanEl.style.left = `${posX}%`
        previewSpanEl.style.top = `${posY}%`
      }
    },
    { passive: true }
  )
})

export function resizePreview(index) {

  let scalePreviewSize = [100, 50, 33.33, 25, 20]

  previewSpanEl.style.transition =
    'width 0.3s ease-in-out, height 0.3s ease-in-out'

  gsap.fromTo(
    previewSpanEl,
    {
      width: scalePreviewSize[index] + `%`,
      height: scalePreviewSize[index] + `%`,
    },
    {
      width: scalePreviewSize[index] + `%`,
      height: scalePreviewSize[index] + `%`,
    }
  )

  if (index <= 0) {
    fullScreen = true
    previewSpanEl.style.top = '50%'
    previewSpanEl.style.left = '50%'
    previewSpanEl.style.transform = 'translate(-50%, -50%)'
  } else {
    fullScreen = false
  }
}

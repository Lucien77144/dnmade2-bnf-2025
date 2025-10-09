// Anaelle

export let saveLastTouchX = 50
export let saveLastTouchY = 50

const previewSpanEl = document.querySelector('#zoom-book-end-preview span')
const previewBookContainerEl = document.querySelector('#zoom-book-end-preview')
const containerEl = document.getElementById('zoom-book-end-container')


let fullScreen = true
let hasUserTouched = false

function toPercentX(x, baseWidth) {
  return (x / baseWidth) * 100
}
function toPercentY(y, baseHeight) {
  return (y / baseHeight) * 100
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

window.addEventListener('DOMContentLoaded', () => {
  const rect = containerEl.getBoundingClientRect()

  previewBookContainerEl.style.width = rect.width / 4 + 'px'
  previewBookContainerEl.style.height = rect.height / 4 + 'px'

  let lastTouchX = 0
  let lastTouchY = 0
  let ticking = false

  function updatePreviewPosition() {

    const xPercent = toPercentX(lastTouchX, rect.width);
    const yPercent = toPercentY(lastTouchY, rect.height);

    const halfWidth = toPercentX(previewBookContainerEl.offsetWidth / 8, rect.width);
    const halfHeight = toPercentY(previewBookContainerEl.offsetHeight / 8, rect.height);

    saveLastTouchX = clamp(100 - xPercent, halfWidth, 100 - halfWidth);
    saveLastTouchY = clamp(100 - yPercent, halfHeight, 100 - halfHeight);

    previewSpanEl.style.left = `${saveLastTouchX}%`;
    previewSpanEl.style.top = `${saveLastTouchY}%`;
    ticking = false;
  } 
  

  containerEl.addEventListener(
    'touchmove',
    (event) => {
      if (fullScreen == false) {
        const touch = event.touches[0];

        lastTouchX = touch.pageX - containerEl.offsetLeft
        lastTouchY = touch.pageY - containerEl.offsetTop

        
    if (!ticking) {
      requestAnimationFrame(updatePreviewPosition)
      console.log(touch.pageX, touch.pageY)
      ticking = true
    }
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
    hasUserTouched = false
    previewSpanEl.style.top = '50%'
    previewSpanEl.style.left = '50%'
    previewSpanEl.style.transform = 'translate(-50%, -50%)'
  } else {
    fullScreen = false
    hasUserTouched = true
  }
}

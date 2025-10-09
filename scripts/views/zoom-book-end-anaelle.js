// Anaelle

export let saveLastTouchX = 50
export let saveLastTouchY = 50

// récupération des éléments 

const previewSpanEl = document.querySelector('#zoom-book-end-preview span')
const previewBookContainerEl = document.querySelector('#zoom-book-end-preview')
const containerEl = document.getElementById('zoom-book-end-container')

// plein écran et premiere action 
let fullScreen = true
let hasUserTouched = false

// fonctions de math, poucentage et valeur min et max DONT TOUCH

function toPercentX(x, baseWidth) {
  return (x / baseWidth) * 100
}
function toPercentY(y, baseHeight) {
  return (y / baseHeight) * 100
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

// start 

window.addEventListener('DOMContentLoaded', () => {

  const rect = containerEl.getBoundingClientRect()

  previewBookContainerEl.style.width = rect.width / 4 + 'px'
  previewBookContainerEl.style.height = rect.height / 4 + 'px'

// Position de départ du rectangle 
  let startPosX = saveLastTouchX;
  let startPosY = saveLastTouchY;

  //position de départ du toucher
  let startTouchX;
  let startTouchY;

  containerEl.addEventListener('touchstart', (event) => {

    const touch = event.touches[0];

    startTouchX = touch.pageX
    startTouchY = touch.pageY

    
  }, { passive: true })

  containerEl.addEventListener(
    'touchmove',
    (event) => {
  
        const touch = event.touches[0];

        const deltaY = touch.pageY - startTouchY;
        const deltaX = touch.pageX - startTouchX;
        

        const moveY = toPercentY(deltaY, previewSpanEl.getBoundingClientRect().height);
        const moveX = toPercentX(deltaX, previewSpanEl.getBoundingClientRect().width);

        saveLastTouchY = clamp(startPosY - moveY, 0,100);
        saveLastTouchX = clamp(startPosX - moveX, 0, 100);

        previewSpanEl.style.left = `${saveLastTouchX}%`
        previewSpanEl.style.top = `${saveLastTouchY}%`

        console.log(saveLastTouchY, saveLastTouchX)
        
    },{ passive: true }
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

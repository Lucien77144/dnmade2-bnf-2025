// Anaelle

export let saveLastTouchX = 50
export let saveLastTouchY = 50

import { getZoomTarget } from './zoom-book-end-pauline.js'

// récupération des éléments

let previewSpanEl
let  previewBookContainerEl 
let containerEl
let imageEl;
let titleEl


let zoomIndex = 0;

// plein écran et premiere action
let fullScreen = true

 function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
} 

// start

window.addEventListener('DOMContentLoaded', () => {

  containerEl = document.getElementById('zoom-book-end-container')
  imageEl = document.getElementById('zoom-book-end-image')
  titleEl = document.querySelector(".zoom-title-tuto");


  const rect = containerEl.getBoundingClientRect()

  previewSpanEl = document.querySelector('#zoom-book-end-preview span')
 previewBookContainerEl = document.querySelector('#zoom-book-end-preview')


  previewBookContainerEl.style.width = rect.width / 4 + 'px'
  previewBookContainerEl.style.height = rect.height / 4 + 'px'

  containerEl.addEventListener("touchstart", () => {
  titleEl.style.opacity = "0"
   titleEl.style.transition = "all 0.2s ease-in-out"

   setTimeout(() => {
    titleEl.style.display = "none";
   },500)

  })



  containerEl.addEventListener(
    'scroll',
    () => {
      if (!fullScreen) {

        const target = getZoomTarget()

        let posX = target.x * 100
        let posY = target.y * 100

        if(zoomIndex <=1 ){
        previewSpanEl.style.left = `${posX}%`
        previewSpanEl.style.top = `${posY}%`
        }
        else if(zoomIndex == 2){
        previewSpanEl.style.left = `${clamp(posX, 45, 55)}%`
        previewSpanEl.style.top = `${clamp(posY,10,80)}%`
        }
        else{
        previewSpanEl.style.left = `${clamp(posX, 40, 60)}%`
        previewSpanEl.style.top = `${clamp(posY,5,85)}%`
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

  if (index < 0) {
    fullScreen = true
    previewSpanEl.style.top = '50%'
    previewSpanEl.style.left = '50%'
    previewSpanEl.style.transform = 'translate(-50%, -50%)'
  }
  else {
    fullScreen = false
  }

  zoomIndex = index

}

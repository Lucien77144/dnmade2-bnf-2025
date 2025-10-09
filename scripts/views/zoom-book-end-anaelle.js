// Anaelle

export let saveLastTouchX = 50
export let saveLastTouchY = 50


const previewSpanEl = document.querySelector('#zoom-book-end-preview span')
const previewBookContainerEl = document.querySelector('#zoom-book-end-preview')
const containerEl = document.getElementById('zoom-book-end-container');

let fullScreen = true
let hasUserTouched = false

function returnPercentageX(x) {
  return Math.round((x / 1920) * 100)
}

function returnPercentageY(y) {
  return Math.round((y / 1080) * 100);
}

window.addEventListener('DOMContentLoaded', () => {

  previewBookContainerEl.style.width =
    containerEl.getBoundingClientRect().width / 4 + 'px'
  previewBookContainerEl.style.height =
    containerEl.getBoundingClientRect().height / 4 + 'px'



  containerEl.addEventListener(
    'touchmove',
    (event) => {
      
      if (fullScreen == false) {

        const touchX = event.touches[0].pageX
        const touchY = event.touches[0].pageY

        saveLastTouchY = 100 - returnPercentageY(touchY)
        saveLastTouchX = 100 - returnPercentageX(touchX)

        if(saveLastTouchX >= 101){
          saveLastTouchX = 100 - previewBookContainerEl.offsetWidth / 2
        }
        else if(saveLastTouchX <= 0){
         saveLastTouchX = 0;
        }

        if(saveLastTouchY >= 101){
          saveLastTouchY = 100 - previewBookContainerEl.offsetHeight/ 2
        }
        else if(saveLastTouchY <= 0){
         saveLastTouchY = 0;
        }

      previewSpanEl.style.top = saveLastTouchY + "%";
      previewSpanEl.style.left = saveLastTouchX + "%";
      
      console.log(saveLastTouchX,saveLastTouchY)
    }
  },
    { passive: true }
  )
}) 

export function resizePreview(index) {
  let scalePreviewSize = [100, 80, 50, 25]

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
    previewSpanEl.style.top = "50%";
    previewSpanEl.style.left = "50%";
    previewSpanEl.style.transform = 'translate(-50%, -50%)'
  } else{
    fullScreen = false
    hasUserTouched = true
  }
}

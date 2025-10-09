// Anaelle

export let saveLastTouchX = 50
export let saveLastTouchY = 50


const previewSpanEl = document.querySelector('#zoom-book-end-preview span')
const previewBookContainerEl = document.querySelector('#zoom-book-end-preview')
const containerEl = document.getElementById('zoom-book-end-container')

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
    containerEl.getBoundingClientRect().width / 6
  previewBookContainerEl.style.height =
    containerEl.getBoundingClientRect().height / 6

  let touchXStart
  let touchYStart


  let lastPosX = returnPercentageX(previewSpanEl.getBoundingClientRect().left);
  let lastPosY = returnPercentageY(previewSpanEl.getBoundingClientRect().top);

  containerEl.addEventListener(
    'touchstart',
    (event) => {

      hasUserTouched = true;

      touchXStart =  returnPercentageX(event.touches[0].pageX)
      touchYStart =  returnPercentageY(event.touches[0].pageY)

      previewSpanEl.style.top = 100 - lastPosY + "%";
      previewSpanEl.style.left = 100 - lastPosX + "%";

    },
    { passive: true }
  )

  containerEl.addEventListener(
    'touchmove',
    (event) => {
      
      if (fullScreen == false) {

        const touchX = event.touches[0].pageX
        const touchY = event.touches[0].pageY

        saveLastTouchY = 100 - returnPercentageY(touchY)
        saveLastTouchX = 100 - returnPercentageX(touchX)
        

      previewSpanEl.style.top = saveLastTouchY + "%";
      previewSpanEl.style.left = saveLastTouchX + "%";
      
    }else{
       previewSpanEl.style.top = "50%";
      previewSpanEl.style.left = "50%";
    }
  },
    { passive: true }
  )

/*   containerEl.addEventListener(
    'touchend',
    () => {
      if (fullScreen == false) {
      touchXEnd = saveLastTouchX;
      touchYEnd = saveLastTouchY;

      spanTop = touchYEnd 
      }
    },
    { passive: true }
  )
}) */
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
  } else if (index > 0) {
    fullScreen = false
    hasUserTouched = true
    
  }
}

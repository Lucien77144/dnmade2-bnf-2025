// Anaelle


const previewSpanEl = document.querySelector('#zoom-book-end-preview span')

let fullScreen = true

window.addEventListener('DOMContentLoaded', () => {
  let saveLastTouchX
  let saveLastTouchY

  const containerEl = document.getElementById('zoom-book-end-container')
  const previewSpanEl = document.querySelector('#zoom-book-end-preview span')

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

    console.log(movingX, movingY)
  }

  /* containerEl.addEventListener(
    'touchstart',
    () => {
    
    if(!fullScreen){
    previewSpanEl.style.top = (saveLastTouchX / 1920) * 100 + '%'
    previewSpanEl.style.left = (saveLastTouchY / 1080) * 100 + '%'
    }
    else{
    previewSpanEl.style.top = '50%'
    previewSpanEl.style.left = '50%'
    previewSpanEl.style.transform = 'translate(-50%, -50%)'
    }
    },
    { passive: true }
  ) */

  containerEl.addEventListener(
    'touchmove',
    (event) => {
      if (fullScreen == false) {
        const touchX = event.touches[0].pageX
        const touchY = event.touches[0].pageY

        saveLastTouchX = touchX
        saveLastTouchY = touchY

        bookZoomPreview(touchX, touchY)
      }
    },
    { passive: true }
  )

  containerEl.addEventListener(
    'touchend',
    () => {
      if (fullScreen == false) {
        const touchX = saveLastTouchX
        const touchY = saveLastTouchY

        bookZoomPreview(touchX, touchY)
      }
    },
    { passive: true }
  )
})

export function resizePreview(index) {
  let scalePreviewSize = [100, 60, 40, 20]

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

  console.log(fullScreen)
}

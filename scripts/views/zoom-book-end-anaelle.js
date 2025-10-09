// Anaelle

 const previewSpanEl = document.querySelector('#zoom-book-end-preview span')

window.addEventListener('DOMContentLoaded', (e) => {
  /*---------------------------------------------------
  -----------------------------------------------------
  
  AGGRANDIR ET RETRECIR L'IMAGE
  
  -----------------------------------------------------
  -----------------------------------------------------*/

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
  }

  let saveLastTouchX = 0
  let saveLastTouchY = 0




  containerEl.addEventListener(
    'touchstart',
    () => {
      previewSpanEl.style.width = '20%'
      previewSpanEl.style.height = '10%'

      const touchX = saveLastTouchX
      const touchY = saveLastTouchY

      bookZoomPreview(touchX, touchY)
    },
    { passive: true }
  )

  containerEl.addEventListener(
    'touchmove',
    (event) => {
      const touchX = event.touches[0].pageX
      const touchY = event.touches[0].pageY

      saveLastTouchX = touchX
      saveLastTouchY = touchY

      bookZoomPreview(touchX, touchY)
    },
    { passive: true }
  )

  containerEl.addEventListener(
    'touchend',
    () => {
      const touchX = saveLastTouchX
      const touchY = saveLastTouchY

      bookZoomPreview(touchX, touchY)
    },
    { passive: true }
  )
})

  export function resizePreview(index){
    previewSpanEl.style.width = index * 10 + "%";
  }
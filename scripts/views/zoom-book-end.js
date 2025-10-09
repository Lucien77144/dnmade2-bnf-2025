
window.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  }
)

  const zoomInButton = document.getElementById('zoom-book-end-zoom-in-button')
  const zoomOutButton = document.getElementById('zoom-book-end-zoom-out-button')
  const containerEl = document.getElementById('zoom-book-end-container')
  const imageEl = document.getElementById('zoom-book-end-image')

  let zoomIndex = 0

  const sizes = {
    width: imageEl.offsetWidth,
    height: imageEl.offsetHeight,
  }

  const SCALE_SIZES = [1.6, 1.6, 2, 2.2]
  const tl = gsap.timeline({
    duration: 0.5,
    ease: 'ease-in-out',
  })

  function zoomIn() {
    const scale = SCALE_SIZES[zoomIndex]

    if (zoomIndex >= SCALE_SIZES.length - 1) return
    zoomIndex++
zoom(scale);

  }

  function zoomOut() {
    
    const scale = SCALE_SIZES[zoomIndex]

    if (zoomIndex >= SCALE_SIZES.length - 1) return
    zoomIndex++
zoom(scale);

  }

/* ---------------------------------------------------------
VIEWPORT NAVIGATE Image
---------------------------------------------------------
 */

let bookZoomEndContainer = document.getElementById("zoom-book-end-container");
let bookZoomPreviewContainer = document.getElementById("zoom-book-end-preview");

let previewMovingFrame = document.querySelector("#zoom-book-end-preview span");

let saveLastTouchX = 0;
let saveLastTouchY = 0;


function bookZoomPreview(x,y){


    let movingX = x / 1920 * 100 ;
    let movingY = y / 1080 * 100 ;

    if(movingX >= 101)
    {
        movingX = (1920 - (previewMovingFrame.offsetWidth * 2)) / 1920 * 100
    }
    else if( movingX < 0){
        movingX = 0;
    }

     if(movingY >= 101)
    {
        movingY = (1080 - (previewMovingFrame.offsetHeight * 2)) / 1080 * 100
    }
    else if( movingY < 0){
        movingY = 0;
    }

    previewMovingFrame.style.top = movingY + "%";
    previewMovingFrame.style.left = movingX + "%";

  function zoom(scale){

        // Set the width scale
        const currentWidth = sizes.width * scale
        
    
        // Instant finish previous zoom
        tl.totalProgress(1) //on termone l'animation précédente
    
        // Set the width scale and scroll to center the image
        // tl = timeline, déclarée au début
        // on relance l'animation
        tl.to(imageEl, {
          width: `${currentWidth}px`,
         /* onStart: () => {
            containerEl.classList.add('zoomed')
          },*/
          onUpdate: () => {
            const width = containerEl.scrollWidth - containerEl.clientWidth
            const height = containerEl.scrollHeight - containerEl.clientHeight
    
            containerEl.scrollTo({
              left: width / 2,
              top: height / 2,
              behavior: 'instant',
              //à chaque frame on se remet au milieu
            })
          },
        })

  }



bookZoomEndContainer.addEventListener("touchstart", () => {

    let touchX = saveLastTouchX;
    let touchY = saveLastTouchY;

    bookZoomPreview(touchX, touchY);
   
} , { passive: true });



bookZoomEndContainer.addEventListener("touchmove", (event) => {

    let touchX = event.touches[0].pageX;
    let touchY = event.touches[0].pageY;

    saveLastTouchX = touchX;
    saveLastTouchY = touchY

 /*---------------------------------------------------
  -----------------------------------------------------
  
ANAELLE
  
  -----------------------------------------------------
  -----------------------------------------------------*/



  function bookZoomPreview(x, y) {
    const movingX = Math.floor((192 / x) * 100)
    const movingY = Math.floor((108 / y) * 100)

    if (movingX >= 101) {
      imageEl.style.left = '100%'
    } else if (movingX <= 0) {
      imageEl.style.left = '0%'
    } else {
      imageEl.style.left = movingX + '%'
    }

    imageEl.style.top = movingY + '%'
bookZoomEndContainer.addEventListener("touchend", () => {

    let touchX = saveLastTouchX;
    let touchY = saveLastTouchY;
    
    bookZoomPreview(touchX, touchY);
} , { passive: true });  

// Viewport Preview size //


function resizeSpanPreview(index){
  
    previewMovingFrame.style.width = 10 * index + "%"
    previewMovingFrame.style.height = 10 * index + "%"
}
/* ------------------------------------
BOUTONS ZOOM 
------------------------------------ */


  let zoomInButton = document.getElementById('zoom-book-end-zoom-in-button')
  let zoomOutButton = document.getElementById('zoom-book-end-zoom-out-button')
  let zoomBookEndPhotoReliure = document.getElementById('zoom-book-end-image')
  let zoomIndex = 0

  const SCALE_SIZES = [6, 9, 12, 18];

  function zoomIn() {
    console.log('zoomIn pressed')

    zoomBookEndPhotoReliure.style.transform = `scale(${SCALE_SIZES[zoomIndex]})`

    if (zoomIndex === SCALE_SIZES.length) {
      // zoomIndex = 0
    }
    else if(zoomIndex < 0){
         zoomIndex = 0
    }
    else {
      zoomIndex++
    }

    resizeSpanPreview(zoomIndex);

    console.log(zoomIndex)
}

function zoomOut() {

    if(zoomIndex <= 0){
    zoomIndex = 0;
    zoomBookEndPhotoReliure.style.transform = `scale(1)`
    }
    else{
    console.log('zoomOut pressed')
    zoomIndex = zoomIndex - 1
    zoomBookEndPhotoReliure.style.transform = `scale(${SCALE_SIZES[zoomIndex]})`
    console.log(zoomIndex)
    }

resizeSpanPreview(zoomIndex);

  }

  containerEl.addEventListener(
    'touchmove',
    (event) => {
      const touchX = event.touches[0].offsetX
      const touchY = event.touches[0].offsetY

      bookZoomPreview(touchX, touchY)
    },
    { passive: true }
  )

 

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)

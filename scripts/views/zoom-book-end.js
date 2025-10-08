
window.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  }
)


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

    console.log(movingX, movingY)
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

    bookZoomPreview(touchX, touchY);
} , { passive: true });


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

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)

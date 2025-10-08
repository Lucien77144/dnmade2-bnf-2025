//import ScrollSmoother from "./gsap/umd/ScrollSmoother.js";
//import ScrollTrigger from "./gsap/umd/ScrollTrigger.js";

window.addEventListener('DOMContentLoaded', (e) => {
  /*---------------------------------------------------
  -----------------------------------------------------
  
  AGGRANDIR ET RETRECIR L'IMAGE
  
  -----------------------------------------------------
  -----------------------------------------------------*/

  e.preventDefault();


  let zoomInButton = document.getElementById('zoom-book-end-zoom-in-button')
  let zoomOutButton = document.getElementById('zoom-book-end-zoom-out-button')
  let zoomBookEndPhotoReliure = document.getElementById('zoom-book-end-image')
  let zoomIndex = 0






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
  
    previewMovingFrame.style.width = "20%"
    previewMovingFrame.style.height = "10%"

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








const SCALE_SIZES = [1.2, 1.6, 2, 2.2]
function zoomIn() {
  console.log('zoomIn pressed')

  zoomBookEndPhotoReliure.style.width = `calc(40vw*${SCALE_SIZES[zoomIndex]})`

  if (zoomIndex === SCALE_SIZES.length - 1) {
    // zoomIndex = 0
  } else {
    zoomIndex++
  }

  console.log(zoomIndex)
}



bookZoomEndContainer.addEventListener("touchend", () => {

    let touchX = saveLastTouchX;
    let touchY = saveLastTouchY;
    
    bookZoomPreview(touchX, touchY);
} , { passive: true });  

/* ------------------------------------
BOUTONS ZOOM 
------------------------------------ */

function zoomOut() {
  console.log('zoomOut  pressed')

  zoomBookEndPhotoReliure.style.width = `calc(40vw*${SCALE_SIZES[zoomIndex]})`

  if (zoomIndex === SCALE_SIZES.length - 1) {
    // zoomIndex = 0
  } else {
    zoomIndex--
  }

  console.log(zoomIndex)
}
function zoomOut() {
    console.log('zoomOut pressed')
    zoomIndex = zoomIndex - 1
    zoomBookEndPhotoReliure.style.transform = `scale (${zoomIndex})`
    zoomIndex = zoomIndex - 1
    console.log(zoomIndex)
  }

  zoomInButton.addEventListener('click', zoomIn)
  zoomOutButton.addEventListener('click', zoomOut)
})

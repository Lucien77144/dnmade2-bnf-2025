//import ScrollSmoother from "./gsap/umd/ScrollSmoother.js";
//import ScrollTrigger from "./gsap/umd/ScrollTrigger.js";

window.addEventListener('DOMContentLoaded', () => {
  /*---------------------------------------------------
  -----------------------------------------------------
  
  AGGRANDIR ET RETRECIR L'IMAGE
  
  -----------------------------------------------------
  -----------------------------------------------------*/

  zoomInButton = document.getElementById('zoom-book-end-zoom-in-button')
  zoomOutButton = document.getElementById('zoom-book-end-zoom-out-button')
  zoomBookEndPhotoReliure = document.getElementById('zoom-book-end-image')
  let zoomIndex = 0

  const SCALE_SIZES = [1.2, 1.6, 2, 2.2]
  function zoomIn() {
    console.log('zoomIn pressed')

    zoomBookEndPhotoReliure.style.transform = `scale(${SCALE_SIZES[zoomIndex]})`

    if (zoomIndex === SCALE_SIZES.length - 1) {
      // zoomIndex = 0
    } else {
      zoomIndex++
    }

    console.log(zoomIndex)
  }
let bookZoomEndContainer = document.getElementById("zoom-book-end-container");

let bookWidth = bookZoomEndContainer.offsetWidth;
let bookHeight = bookZoomEndContainer.offsetHeight;

let zoomFramePreview = document.getElementById("zoom-book-end-preview");
zoomFramePreview.style.width = bookWidth / 4 + "px";
zoomFramePreview.style.height = bookHeight / 4 + "px";

let ZFPBoundingClient = zoomFramePreview.getBoundingClientRect();


/* bottom
: 
972
height
: 
864
left
: 
192
right
: 
1728
top
: 
108
width
: 
1536
x
: 
192
y
: 
108 */

let previewMovingFrame = document.querySelector("#zoom-book-end-preview span")

let PMFCenterX = previewMovingFrame.offsetWidth / 2;
let PMFCenterY = previewMovingFrame.offsetHeight / 2;
    previewMovingFrame.style.position = "absolute";

function bookZoomPreview(x,y){


    let movingX = Math.floor(192/x * 100);
    let movingY = Math.floor( 108/y * 100);

    if(movingX >= 101){
            previewMovingFrame.style.left = "100%";
    }
    else if(movingX <= 0){
        previewMovingFrame.style.left = "0%";
    }
    else{
         previewMovingFrame.style.left = movingX + "%";
    }


    previewMovingFrame.style.top = movingY + "%";

    console.log(movingX, movingY)
}

bookZoomEndContainer.addEventListener("touchmove", (event) => {

    let touchX = event.touches[0].offsetX;
    let touchY = event.touches[0].offsetY;

    bookZoomPreview(touchX, touchY);
} , { passive: true });

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

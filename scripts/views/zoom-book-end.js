

window.addEventListener("DOMContentLoaded",(e)=>{

e.preventDefault();

/* const element=document.querySelector("#zoom-book-end-image")
        pinchZoom(element);  
    console.log("hello world") */

}
)


/* function pinchZoom(imageElement){
    let imageElementScale = 1;
  
    let start = {};
  
    // Calculate distance between two fingers
    const distance = (event) => {
      return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
    };
  
    imageElement.addEventListener('touchstart', (event) => {
      // console.log('touchstart', event);
      if (event.touches.length === 2) {
        event.preventDefault(); // Prevent page scroll
  
        // Calculate where the fingers have started on the X and Y axis
        start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        start.distance = distance(event);
      }
    });
  
    imageElement.addEventListener('touchmove', (event) => {
      // console.log('touchmove', event);
      if (event.touches.length === 2) {
        event.preventDefault(); // Prevent page scroll
  
        // Safari provides event.scale as two fingers move on the screen
        // For other browsers just calculate the scale manually
        let scale;
        if (event.scale) {
          scale = event.scale;
        } else {
          const deltaDistance = distance(event);
          scale = deltaDistance / start.distance;
        }
        imageElementScale = Math.min(Math.max(1, scale), 4);
  
        // Calculate how much the fingers have moved on the X and Y axis
        const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2; // x2 for accelarated movement
        const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2; // x2 for accelarated movement
  
        // Transform the image to make it grow and move with fingers
        const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
        imageElement.style.transform = transform;
        imageElement.style.WebkitTransform = transform;
        imageElement.style.zIndex = "9999";
      }
    });
  
    imageElement.addEventListener('touchend', (event) => {
      // console.log('touchend', event);
      // Reset image to it's original format
      imageElement.style.transform = "";
      imageElement.style.WebkitTransform = "";
      imageElement.style.zIndex = "";
    });
  } */


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

bookZoomEndContainer.addEventListener("touchend", (event) => {

    let touchX = saveLastTouchX;
    let touchY = saveLastTouchY;
    
    bookZoomPreview(touchX, touchY);
} , { passive: true });
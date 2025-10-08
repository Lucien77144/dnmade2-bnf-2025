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


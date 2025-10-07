let bookZoomEndContainer = document.getElementById("zoom-book-end-container");

function bookZoomPreview(x,y){

    let previewMovingFrame = document.querySelector("#zoom-book-end-preview span")

    let PMFWidth = previewMovingFrame.innerWidth ;
    let PMFHeight = previewMovingFrame.innerHeight;

    previewMovingFrame.style.position = "absolute";
    previewMovingFrame.style.top = y/2 + "px";
    previewMovingFrame.style.left = x/2+ "px";
}

bookZoomEndContainer.addEventListener("touchmove", (event) => {
 let touchX = event.touches[0].pageX;
 let touchY = event.touches[0].pageY;

 console.log(touchX, touchY);

bookZoomPreview(touchX,touchY);
})



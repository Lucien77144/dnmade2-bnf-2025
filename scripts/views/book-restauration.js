const viewBookRestauration = document.querySelector('section#view-book-restauration');
const gemsList = document.querySelectorAll('.gems-list');
const gameBook = document.querySelector('.game-book');

function pageGameInit() {

  const targetPosition = [
    [100, 200],
    [150, 250],
    [200, 300],
    [250, 350],
    [300, 400],
    [350, 450],
  ]

  let count = 0;
  gemsList.forEach((value, i) => {
    for (let j = 0; j < 3; j++) {
      //const element = array[i];
      const gemContent = document.createElement('div');
      gemContent.classList.add('gemContent')
      gemContent.setAttribute('data-gemcontentid', count);

      const xButton = document.createElement('img');
      xButton.classList.add('xButton');
      xButton.src = '../../public/images/ui/info-button.svg';
      gemContent.appendChild(xButton);

      const gemImages = document.createElement('div');
      const gemImageDragable = document.createElement('img');
      const gemImageGhost = document.createElement('img');

      //const imageUrl = `../../public/images/game/gems/gem-${count}.png`;
      const imageUrl = `../../public/images/game/gems/gem-0.png`;
      gemImageDragable.src = imageUrl;
      gemImageGhost.src = imageUrl;

      gemImageDragable.setAttribute('data-gemid', count);
      gemImageDragable.classList.add('gem-dragable', 'gem');
      gemImageGhost.classList.add('gem-ghost', 'gem');

      gemImages.appendChild(gemImageGhost);
      gemImages.appendChild(gemImageDragable);

      gemContent.appendChild(gemImages);

      value.appendChild(gemContent);


      /* Init dragable zone position */

      const pos = targetPosition[count];

      const droppableZone = document.createElement('div');
      droppableZone.setAttribute('data-droppable-for-gemid', count);
      droppableZone.classList.add('droppable-zone');
      droppableZone.style.top = pos[1] + 'px';
      droppableZone.style.left = pos[0] + 'px';
      gameBook.appendChild(droppableZone);

      count++
    }
  });

}

pageGameInit();

// function hitTest(item1, item2){
//   console.log(item1, item2)
// }

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Draggable)

  const overlapThreshold = "60%";
  const item = ".draggable"
  const dropArea = ".drop__box";

  // selection de la pierre

// function dragDrop(e){

// }

  const onDragStart = (e) => {
    gsap.to(item, {duration: 0.1, scale: 1.2, rotate: 'random(-9,9)', zIndex: 100})
    console.log(e)
  }

  Draggable.create(item, {
    inertia: true,
    onDragStart,
    onDragEnd: function(e) {
  

    if(!this.hitTest(dropArea, overlapThreshold)) {

    gsap.to(item, {
      duration: 0.7, 
      x:0, 
      y:0, 
      scale: 1, 
      rotate: 0, 
      ease:'elastic.out(.45)'
    });
    } else {
      gsap.to(item, {
        x: 0,
        y: 500,
        scale: 0.5,
        rotate: 0,
        ease:'elastic.out(.45)',
      })
    }
  
  },
  });
});



function createPopup(id){
    let popupNode = document.querySelector(id);
    let overlay = popupNode.querySelector(".overlay");
    let closeBtn = popupNode.querySelector(".close-btn");

    function openPopup(){
        popupNode.classList.add("active");
    }

    function closePopup(){
        popupNode.classList.remove("active");
    }

    overlay.addEventListener("click", closePopup); //click pour écran tactile aussi ??
    closeBtn.addEventListener("click", closePopup);

    return openPopup;
}

let popup = createPopup("#popup");

document.querySelector("#open-popup").addEventListener("click", popup);

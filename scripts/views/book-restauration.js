let json;

document.addEventListener('DOMContentLoaded', async () => {
  gsap.registerPlugin(Draggable)

  const response = await fetch('../../public/data/book-restauration.json');
  json = await response.json();

  console.log(json);
});


const viewBookRestauration = document.querySelector('section#view-book-restauration');
const gemsList = document.querySelectorAll('.gems-list');
const gameBook = document.querySelector('.game-book');


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





function pageGameInit() {

  const targetPosition = [
    [100, 200],
    [150, 250],
    [200, 300],
    [250, 350],
    [300, 400],
    [350, 450],
  ]


    const backButton = document.querySelector('.back-button');
  const closeButton = document.querySelector('.close-button');

  backButton.addEventListener('click', () => {
    console.warn('Implement back navigation');
    //window.location.href = 'library.html';
  });

  closeButton.addEventListener('click', () => {
    console.warn('Implement close navigation');
    //window.location.href = 'library.html';
  });



  let count = 0;
  gemsList.forEach((value, i) => {
    for (let j = 0; j < 3; j++) {
      //const element = array[i];
      const gemContent = document.createElement('div');
      gemContent.classList.add('gemContent')
      gemContent.setAttribute('data-gemcontentid', count);

      const infoButton = document.createElement('img');
      infoButton.classList.add('infoButton');
      infoButton.src = '../../public/images/ui/info-button.svg';

      infoButton.addEventListener('click', () => {
        popup();
      });
      
      gemContent.appendChild(infoButton);

      const gemImages = document.createElement('div');
      const gemImageDragable = document.createElement('img');
      const gemImageGhost = document.createElement('img');

      //const imageUrl = `../../public/images/game/gems/gem-${count}.png`;
      const imageUrl = `../../public/images/game/gems/gem-0.png`;
      gemImageDragable.src = imageUrl;
      gemImageGhost.src = imageUrl;

      gemImageDragable.setAttribute('data-gemid', count);
      gemImageDragable.classList.add('gem-draggable', 'gem');
      gemImageGhost.classList.add('gem-ghost', 'gem');

      gemImages.appendChild(gemImageGhost);
      gemImages.appendChild(gemImageDragable);

      gemContent.appendChild(gemImages);

      value.appendChild(gemContent);

      const overlapThreshold = "100%";
      /* Init dragable zone position */

      const pos = targetPosition[count];

      const droppableZone = document.createElement('div');
      droppableZone.setAttribute('data-droppable-for-gemid', count);
      droppableZone.classList.add('droppable-zone');
      droppableZone.style.top = pos[1] + 'px';
      droppableZone.style.left = pos[0] + 'px';
      gameBook.appendChild(droppableZone);

      /* Init draggable item */

      const onDragStart = (e) => {
        gsap.to(gemImageDragable, {duration: 0.1, scale: 1.2, rotate: 'random(-9,9)', zIndex: 100})
        console.log(e)
      }

      Draggable.create(gemImageDragable, {
        inertia: true,
        onDragStart,
        onDragEnd: function(e) {
      

          if(!this.hitTest(droppableZone, overlapThreshold)) {

            gsap.to(gemImageDragable, {
              x: 0,
              y: 0,
              duration: 0.7, 
              scale: 1, 
              rotate: 0, 
              ease:'elastic.out(.45)'
            });
          
          } else {
            gsap.to(gemImageDragable, {
              scale: 0.5,
              rotate: 0,
              ease:'elastic.out(.45)',
            })
          }
      
        },
      });

      count++
    }
  });

}

pageGameInit();

// function hitTest(item1, item2){
//   console.log(item1, item2)
// }

/*document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Draggable)

  const overlapThreshold = "60%";
  const item = ".gem-draggable"
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
});*/





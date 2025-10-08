const viewBookRestauration = document.querySelector('section#view-book-restauration');

const gemsList = document.querySelectorAll('.gems-list');



function pageInit() {

  let count = 0;
  gemsList.forEach((value, i) => {
    for (let j = 0; j < 3; j++) {
      //const element = array[i];
      const gemContent = document.createElement('div');
      gemContent.classList.add('gemContent')
      gemContent.setAttribute('data-gemid', count);

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

      gemImageDragable.classList.add('gem-dragable', 'gem');
      gemImageGhost.classList.add('gem-ghost', 'gem');

      gemImages.appendChild(gemImageGhost);
      gemImages.appendChild(gemImageDragable);

      gemContent.appendChild(gemImages);

      value.appendChild(gemContent)

      count++
    }
  })
}

pageInit();

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Draggable)

  var remainingSpace = "60%";

  const item = ".draggable";

  // selection de la pierre
  const onDragStart = (e) => {
    gsap.to(item, {duration: 0.1, scale: 1.2, rotate: 'random(-9,9)', zIndex: 100})
    console.log(e)
  }

  // relâchement de la pierre
  const onDragEnd = (e) => {
    gsap.to(item, {duration: 0.5, x:0, y:0, opacity: 1, rotate: 0, ease:'elastic.out(.45)'})
    console.log(e)
  }

  Draggable.create(item, {
    inertia: true,
    onDragStart,
    onDragEnd,
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

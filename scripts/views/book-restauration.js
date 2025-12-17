const viewBookRestauration = document.querySelector('section#view-book-restauration')
const viewEndingScreen = document.querySelector('section#view-ending-screen')
const gemsList = document.querySelectorAll('.gems-list')
const gameBook = document.querySelector('.game-book')
const endingLinkButton = document.querySelector('.ending-link');

let popup, popupNode;
let isInGame = false;

document.addEventListener('DOMContentLoaded', async () => {
  //viewBookRestauration.style.display = 'flex';
  //viewEndingScreen.style.display = 'none';
  //viewEndingScreen.style.display = 'none';
  gsap.registerPlugin(Draggable)
  createPopup('#popup')

  endingLinkButton.addEventListener('touchstart', () => {
    console.warn('Implement ending link navigation')
    window.location.href = '../9deplacementDansImage.html';
  })

  pageGameInit()
})

function openPopup(index) {
  popupNode.classList.add('active')
  document.getElementById('popup-image').src = popUpData.gemID[index].image;
  document.getElementById('popup-name').textContent = popUpData.gemID[index].name;
  document.getElementById('popup-text').textContent = popUpData.gemID[index].text;
}

function closePopup() {
  popupNode.classList.remove('active')
}

function createPopup(id) {
  popupNode = document.querySelector(id)
  let overlay = popupNode.querySelector('.overlay')
  let closeBtn = popupNode.querySelector('.close-btn')

  overlay.addEventListener('click', closePopup) //click pour écran tactile aussi ??
  closeBtn.addEventListener('click', closePopup)
}

function pageGameInit() {
  const backButton = document.querySelector('.back-button')
  const closeButton = document.querySelector('.close-button')
  const startButton = document.querySelector('.start-btn')
  const introWindow = document.getElementById('intro-window')
  const gameScene = document.getElementById('game-scene')


  backButton.addEventListener('click', () => {
    if(!isInGame) {
      console.warn('Implement close navigation')
      window.location.href = '../../index.html';
    }


    console.warn('Implement back navigation')
    removeGems();
    introWindow.style.display = 'block';
    viewEndingScreen.classList.remove('end-overlay-active')
    //document.querySelector('.game-emplacement-gems').style.display = 'unset';
    //window.location.href = 'library.html';
  })

  closeButton.addEventListener('click', () => {
    console.warn('Implement close navigation')
    window.location.href = '../../index.html';
  })

  startButton.addEventListener('touchstart', () => {
    introWindow.style.display = 'none'
    gameScene.style.display = 'block'

    addGems()
    isInGame = true;
  })


}






function addGems() {
  document.querySelector('.game-emplacement-gems').innerHTML = '';

  let count = 0;
  for (let i = 0; i < 5; i++) {
    //const element = array[i];
    const gemContent = document.createElement('div')
    gemContent.classList.add('gemContent')
    gemContent.setAttribute('data-gemcontentid', i)
    gemContent.setAttribute('data-gemColumn', i)

    const infoButton = document.createElement('img')
    infoButton.classList.add('infoButton')
    infoButton.src = '../../public/images/ui/info-button.svg'

    infoButton.addEventListener('click', () => {
      const gemIndex = JSON.parse(gemContent.getAttribute('data-gemcontentid'));
      openPopup(gemIndex);
    })

    gemContent.appendChild(infoButton)

    //const gemImages = document.createElement('div')
    const gemImageDraggable = document.createElement('img')
    const gemImageGhost = document.createElement('img')

    const imageUrl = popUpData.gemID[i].image;
    gemImageDraggable.src = imageUrl;
    gemImageGhost.src = imageUrl;
    
    /* const position = gemImageDraggable.getBoundingClientRect()
    gemImageDraggable.style.top = position.top + 'px'
    gemImageDraggable.style.left = position.left + 'px' */

    gemImageDraggable.setAttribute('data-gemid', i)
    gemImageDraggable.setAttribute('data-in-box', 'false')
    gemImageDraggable.classList.add('gem-draggable', 'gem')
    gemImageGhost.classList.add('gem-ghost', 'gem')

    if (i==0){
      gemImageDraggable.style.height = "12vmin"
      gemImageGhost.style.height = "12vmin"
    }

    if (i==1){
      gemImageDraggable.style.height = "13vmin"
      gemImageGhost.style.height = "13vmin"
    }

    if (i==3){
      gemImageDraggable.style.height = "9vmin"
      gemImageGhost.style.height = "9vmin"
    }

    if (i==4){
      gemImageDraggable.style.height = "9vmin"
      gemImageGhost.style.height = "9vmin"
    }
    

    gemContent.appendChild(gemImageGhost)
    gemContent.appendChild(gemImageDraggable)


    console.log(gemsList[popUpData.gemID[i].column], );

    gemsList[popUpData.gemID[i].column].appendChild(gemContent)


    //const calque = document.createElement('img');
    const calque = new Image();
    calque.src = popUpData.gemID[i].emplacement;
    calque.classList.add('emplacement-gems', 'gem-hide');
    document.querySelector('.game-emplacement-gems').appendChild(calque)

    const overlapThreshold = '70%'
    /* Init Draggable zone position */

    const pos = popUpData.gemID[i].dropbox

    const droppableZone = document.createElement('div')
    droppableZone.setAttribute('data-droppable-for-gemid', i)
    droppableZone.classList.add('droppable-zone')
    droppableZone.style.position = 'fixed'
    droppableZone.style.left = pos[0] + '%'
    droppableZone.style.top = pos[1] + '%'
    gameBook.appendChild(droppableZone)

    /* Init draggable item */

    let startBox;
    let endBox;


    Draggable.create(gemImageDraggable, {
      inertia: true,
      type: 'left,top',
      onPress: function (e) {
        if (gemImageDraggable.getAttribute('data-in-box') === 'true')
          this.endDrag(e)
      },

      onDragStart: (e) => {
        droppableZone.classList.add('halo-active')
        gsap.to(gemImageDraggable, {
          /* top: e.clientY - gemImageDraggable.height / 2,
          left: e.clientX - gemImageDraggable.width / 2, */
          duration: 0.1,
          scale: 1.2,
          rotate: 'random(-9,9)',
          zIndex: 1,
          /* position: 'fixed', */
        })

        startBox ??= gemImageDraggable.getBoundingClientRect();
        endBox ??= droppableZone.getBoundingClientRect();
      },

      onDragEnd: function (e) {
        droppableZone.classList.remove('halo-active')
        if (this.hitTest(droppableZone, overlapThreshold)) {
          gsap.to(gemImageDraggable, {
            /* left: endBox.left - endBox.width / 2, */
            // top: endBox.top - endBox.height / 2,
            left: endBox.left - (endBox.width - startBox.width * 0.5) / 2,
            top: endBox.top - (endBox.height - startBox.height * 0.5) / 2,
            duration: 0.1,
            scale: 0,
            rotate: 0,
          })
          gemImageDraggable.setAttribute('data-in-box', 'true');
          droppableZone.classList.remove('droppable-zone');
          calque.classList.remove('gem-hide');
          checkCompletion();
        } else {
          gsap.to(gemImageDraggable, {
            left: startBox.left,
            top: startBox.top,
            duration: 0.7,
            scale: 1,
            rotate: 0,
            ease: 'elastic.out(.45)',
            /* position: 'unset', */
          })
        }
      }, 
    })

    count++
  }
}

function removeGems() {
  const allGems = document.querySelectorAll('.gemContent');
  const allDroppables = document.querySelectorAll('.droppable-zone');

  allDroppables.forEach((value, i) => {
    value.remove();
  });
  allGems.forEach((value, i) => {
    value.remove();
  });
  
  document.querySelector('.game-emplacement-gems').innerHTML = '';
  isInGame = false;
}


function checkCompletion() {
  const allGems = document.querySelectorAll('.gem-draggable');
  let completed = true
  allGems.forEach((value, i) => {
    if(value.getAttribute('data-in-box') === 'false') completed = false
  });
  if(!completed) return;

  endScene();
}


function endScene() {
  console.log('End scene triggered');
  viewEndingScreen.classList.add('end-overlay-active')
  //document.querySelector('.game-emplacement-gems').style.display = 'none';
}
const viewBookRestauration = document.querySelector('section#view-book-restauration')
const gemsList = document.querySelectorAll('.gems-list')
const gameBook = document.querySelector('.game-book')

let json;
let popup, popupNode;

document.addEventListener('DOMContentLoaded', async () => {
  gsap.registerPlugin(Draggable)
  createPopup('#popup')

  const response = await fetch('../../public/data/book-restauration.json')
  json = await response.json()
  console.log(json)

  pageGameInit()
})

function openPopup(index) {
  popupNode.classList.add('active')
  document.getElementById('popup-image').src = json.gemID[index].image;
  document.getElementById('popup-name').textContent = json.gemID[index].name;
  document.getElementById('popup-text').textContent = json.gemID[index].text;
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

  backButton.addEventListener('click', () => {
    console.warn('Implement back navigation')
    //window.location.href = 'library.html';
  })

  closeButton.addEventListener('click', () => {
    console.warn('Implement close navigation')
    //window.location.href = 'library.html';
  })

  addGems();
}



function addGems() {
  let count = 0;
  gemsList.forEach((value, i) => {
    for (let j = 0; j < 3; j++) {
      //const element = array[i];
      const gemContent = document.createElement('div')
      gemContent.classList.add('gemContent')
      gemContent.setAttribute('data-gemcontentid', count)

      const infoButton = document.createElement('img')
      infoButton.classList.add('infoButton')
      infoButton.src = '../../public/images/ui/info-button.svg'

      infoButton.addEventListener('click', () => {
        openPopup(i * j)
      })

      gemContent.appendChild(infoButton)

      const gemImages = document.createElement('div')
      const gemImageDraggable = document.createElement('img')
      const gemImageGhost = document.createElement('img')

      const imageUrl = json.gemID[count].image;
      gemImageDraggable.src = imageUrl;
      gemImageGhost.src = imageUrl;

      gemImageDraggable.setAttribute('data-gemid', count)
      gemImageDraggable.setAttribute('data-in-box', 'false')
      gemImageDraggable.classList.add('gem-draggable', 'gem')
      gemImageGhost.classList.add('gem-ghost', 'gem')

      gemImages.appendChild(gemImageGhost)
      gemImages.appendChild(gemImageDraggable)

      gemContent.appendChild(gemImages)

      value.appendChild(gemContent)

      const overlapThreshold = '70%'
      /* Init Draggable zone position */

      const pos = json.gemID[count].dropbox

      const droppableZone = document.createElement('div')
      droppableZone.setAttribute('data-droppable-for-gemid', count)
      droppableZone.classList.add('droppable-zone')
      droppableZone.style.top = pos[1] + 'px'
      droppableZone.style.left = pos[0] + 'px'
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
            duration: 0.1,
            scale: 1.2,
            rotate: 'random(-9,9)',
            zIndex: 1,
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
              duration: 1,
              scale: 0.5,
              rotate: 0,
              ease: 'elastic.out(.45)',
            })
            gemImageDraggable.setAttribute('data-in-box', 'true'),
            droppableZone.classList.remove('droppable-zone')
          } else {
            gsap.to(gemImageDraggable, {
              left: startBox.left,
              top: startBox.top,
              duration: 0.7,
              scale: 1,
              rotate: 0,
              ease: 'elastic.out(.45)',
            })
          }
        }, 
      })

      count++
    }
  })
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
}
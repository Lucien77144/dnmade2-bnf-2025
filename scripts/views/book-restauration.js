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
      value.appendChild(gemContent)

      count++
    }
  })
}

pageInit();

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
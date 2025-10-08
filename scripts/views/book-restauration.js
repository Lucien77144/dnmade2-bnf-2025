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





document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Draggable)

    const onDragStart = (e) => {
            console.log(e)
        }

    const onDragEnd = (e) => {

    }
 
    Draggable.create(".draggable", {
        inertia: true,
        onDragStart,
    });
 });
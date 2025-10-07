const viewBookRestauration = document.querySelector('section#view-book-restauration');

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
const gems = document.querySelectorAll('.gem');
const dropzones = document.querySelectorAll('.dropzone');

let draggedGem = null;
let offsetX = 0;
let offsetY = 0;

gems.forEach(gem => {
    const computedStyle = getComputedStyle(gem);
    gem.dataset.originalLeft = computedStyle.left;
    gem.dataset.originalTop = computedStyle.top;
    gem.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', drop);
    gem.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', drop);
});

function getEventPos(e) {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else {
        return { x: e.clientX, y: e.clientY };
    }
}

function startDrag(e) {
    e.preventDefault();
    draggedGem = e.target;
    const pos = getEventPos(e);
    const rect = draggedGem.getBoundingClientRect();
    offsetX = pos.x - rect.left;
    offsetY = pos.y - rect.top;

    draggedGem.style.transition = 'none';
    draggedGem.style.cursor = 'grabbing';
    draggedGem.style.zIndex = 10;
}

function drag(e) {
    if (!draggedGem) return;
    e.preventDefault();
    const pos = getEventPos(e);

    const parentRect = draggedGem.parentElement.getBoundingClientRect();
    draggedGem.style.left = pos.x - offsetX - parentRect.left + 'px';
    draggedGem.style.top = pos.y - offsetY - parentRect.top + 'px';
}

function drop(e) {
    if (!draggedGem) return;

    let dropped = false;
    const gemRect = draggedGem.getBoundingClientRect();

    dropzones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        const gx = gemRect.left + gemRect.width / 2;
        const gy = gemRect.top + gemRect.height / 2;

        if (gx > rect.left && gx < rect.right && gy > rect.top && gy < rect.bottom) {
            const parentRect = draggedGem.parentElement.getBoundingClientRect();
            draggedGem.style.left = rect.left - parentRect.left + rect.width / 2 - draggedGem.offsetWidth / 2 + 'px';
            draggedGem.style.top = rect.top - parentRect.top + rect.height / 2 - draggedGem.offsetHeight / 2 + 'px';
            dropped = true;
        }
    });

    // Si pas déposée dans une dropzone = retour à la position initiale
    if (!dropped) {
        draggedGem.style.transition = 'left 0.3s ease, top 0.3s ease'; //retour fluide
        draggedGem.style.left = draggedGem.dataset.originalLeft;
        draggedGem.style.top = draggedGem.dataset.originalTop;
    }

    draggedGem.style.cursor = 'grab';
    draggedGem.style.zIndex = 2;
    draggedGem = null;
}
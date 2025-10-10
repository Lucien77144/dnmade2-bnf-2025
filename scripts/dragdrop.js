const gems = document.querySelectorAll('.gem');
const dropzones = document.querySelectorAll('.dropzone');

let draggedGem = null;
let offsetX = 0;
let offsetY = 0;

gems.forEach(gem => {

    // tactile
    gem.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', drop);
});

function getEventPos(e) {
    if (e.touches) {
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
    draggedGem.style.cursor = 'grabbing';
    draggedGem.style.zIndex = 10;
}

function drag(e) {
    if (!draggedGem) return;
    e.preventDefault();
    const pos = getEventPos(e);
    draggedGem.style.left = pos.x - offsetX - draggedGem.parentElement.getBoundingClientRect().left + 'px';
    draggedGem.style.top = pos.y - offsetY - draggedGem.parentElement.getBoundingClientRect().top + 'px';
}

function drop(e) {
    if (!draggedGem) return;

    let dropped = false;
    dropzones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        const gemRect = draggedGem.getBoundingClientRect();
        const gx = gemRect.left + gemRect.width / 2;
        const gy = gemRect.top + gemRect.height / 2;

        if (gx > rect.left && gx < rect.right && gy > rect.top && gy < rect.bottom) {
            // placer la gemme au centre de la dropzone
            draggedGem.style.left = rect.left - draggedGem.parentElement.getBoundingClientRect().left + rect.width / 2 - draggedGem.offsetWidth / 2 + 'px';
            draggedGem.style.top = rect.top - draggedGem.parentElement.getBoundingClientRect().top + rect.height / 2 - draggedGem.offsetHeight / 2 + 'px';
            dropped = true;
        }
    });

    if (!dropped) {
        // remettre sur le livre si pas déposée
        draggedGem.style.left = draggedGem.dataset.originalLeft || draggedGem.style.left;
        draggedGem.style.top = draggedGem.dataset.originalTop || draggedGem.style.top;
    }

    draggedGem.style.cursor = 'grab';
    draggedGem.style.zIndex = 2;
    draggedGem = null;
}

// sauvegarder position initiale
gems.forEach(gem => {
    gem.dataset.originalLeft = gem.style.left;
    gem.dataset.originalTop = gem.style.top;
});
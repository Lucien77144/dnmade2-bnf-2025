const canvas_gratte = document.getElementById("canvas_gratte");
const scalpel_lo = document.getElementById("scalpel");

const ctx_am = canvas_gratte.getContext("2d", {willReadFrequently: true });
const rect_am = canvas_gratte.getBoundingClientRect();

let taille_trait_am = 30;

canvas_gratte.width = rect_am.width;
canvas_gratte.height = rect_am.height;

let drawing_am = false;
let lastX_am = 0;
let lastY_am = 0;

function getCoords(e) {
    const r_am = canvas_gratte.getBoundingClientRect();
    const cx_am = (e.clientX ?? e.touches[0].clientX) - r_am.left;
    const cy_am = (e.clientY ?? e.touches[0].clientY) - r_am.top;
    return {
        x: cx_am,
        y: cy_am,
    };
}

let x, y;


grattoire();


function grattoire() {
    canvas_gratte.addEventListener(("touchstart"), clickANDTouch);

    canvas_gratte.addEventListener(("mousedown"),clickANDTouch);

    canvas_gratte.addEventListener(("touchmove"), move);
    canvas_gratte.addEventListener(("mousemove"), move);

    canvas_gratte.addEventListener(("touchend"), lache);
    canvas_gratte.addEventListener(("mouseup"), lache);

    const img_gratte = new Image();
    img_gratte.crossOrigin = "anonymous";
    img_gratte.src = "/public/images/scratch-card/cailloux.png";

    img_gratte.onload = function () {
        ctx_am.drawImage(img_gratte, 0, 0, canvas_gratte.width, canvas_gratte.height);
    };

}

function clickANDTouch(e) {
    // scalpel_lo.style.top = (`${e.clientY + 150}px`?? `${e.clientY + 150}px`);
    //     scalpel_lo.style.left = (`${e.clientX - 50}px` ?? `${e.clientX - 50}px`);

    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    
        scalpel_lo.style.top = `${clientY + 150}px`;
        scalpel_lo.style.left = `${clientX - 50}px`;
        scalpel_lo.style.transform = `rotate(45deg)`;
        scalpel_lo.style.transition = `transform 0.1s ease-in-out`;


        drawing_am = true;
        const { x, y } = getCoords(e);

        lastX_am = x;
        lastY_am = y;
}

function move(e) {
    // scalpel_lo.style.top = (`${e.touches[0].clientY + 130}px`?? `${e.clientY + 130}px`);
    //     scalpel_lo.style.left = (`${e.touches[0].clientX - 50}px` ?? `${e.clientX - 50}px`);

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) { // SI on est en touch
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    scalpel_lo.style.top = `${clientY + 130}px`;
    scalpel_lo.style.left = `${clientX - 50}px`;
    scalpel_lo.style.transform = `rotate(45deg)`;

        console.log(drawing_am)
        if (!drawing_am) return;
        
        const { x, y } = getCoords(e);
        ctx_am.lineWidth = taille_trait_am;
        ctx_am.globalCompositeOperation = 'destination-out';
        ctx_am.beginPath();
        ctx_am.moveTo(lastX_am, lastY_am);
        ctx_am.lineTo(x, y);
        ctx_am.stroke();
        ctx_am.lineCap ='round'
    // ctx_am.clearRect(x, y, 40, 40);
        lastX_am = x;
        lastY_am = y;

        handlePercentage(getFilledInPixels(32));
    
}

function lache(e) {
    scalpel_lo.style.transform = `rotate(90deg)`;
    scalpel_lo.style.transition = `transform 0.3s ease-in-out`;
    scalpel_lo.style.top = `600px`;
    scalpel_lo.style.left = `1320px`;


    drawing_am = false;
}

function getFilledInPixels(stride) {
    if (!stride || stride < 1) { stride = 1; }

    var pixels   = ctx_am.getImageData(0, 0, canvas_gratte.width, canvas_gratte.height);
        pdata    = pixels.data;
        l        = pdata.length;
        total    = (l / stride);
        count    = 0;
    
    // Iterate over all pixels
    for(var i = count = 0; i < l; i += stride) {
    if (parseInt(pdata[i]) === 0) {
        count++;
    }
    }
    
    return Math.round((count / total) * 100);
}

function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    console.log(filledInPixels + '%');
    if (filledInPixels > 80) {
    // Clear rect de facon smooth avec une transition ?
    // desactiver le pointer event sur le canvas ?
    canvas_gratte.style.pointerEvents = "none";

    ctx_am.clearRect(0, 0, canvas_gratte.width, canvas_gratte.height);

    pe_selection_modal()
    pe_apparraitre_modal("container_pe_button_modal");

    setInterval(() => {
        
        const livre_am = document.getElementById("livre_am");
        livre_am.style.transition = "transform 0.5s ease-out";
        livre_am.style.transform = "scale(1.3)";
        const finished_lo = document.querySelector(".finished_lo");
        finished_lo.style.display = "flex";
    }, 500);

    // scalpel_lo.style.transform = `rotate(90deg)`;
    // scalpel_lo.style.transition = `transform 0.1s ease-in-out`;
    // scalpel_lo.style.top = `230px`;
    // scalpel_lo.style.left = `400px`;
    
    setInterval(() => {
        scalpel_lo.style.transition = "opacity 0.5s ease-out";
        scalpel_lo.style.opacity = "0";
    }, 2000);
    }
}



// PERRINE 
function pe_selection_modal (){
  const pe_cercle_1 = document.getElementById("pe_cercle_invisible_1");
  const pe_cercle_2 =document.getElementById ("pe_cercle_invisible_2");
  const pe_cercle_3 = document.getElementById ("pe_cercle_invisible_3");
  const pe_cercle_4 = document.getElementById ("pe_cercle_invisible_4");
  pe_cercle_1.addEventListener("touchstart", (event)=> {
    console.log("cercle 1 touché");
    pe_apparraitre_modal ("pe_modal_grand_1");
    pe_disparraitre_modal("pe_modal_grand_2");
    pe_disparraitre_modal("pe_modal_grand_3");
    pe_disparraitre_modal("pe_modal_grand_4");
  })
  pe_cercle_2.addEventListener("touchstart", (event)=> {
    console.log("cercle 2 touché");
    pe_apparraitre_modal ("pe_modal_grand_2");
    pe_disparraitre_modal("pe_modal_grand_1");
    pe_disparraitre_modal("pe_modal_grand_3");
    pe_disparraitre_modal("pe_modal_grand_4");
  })
  pe_cercle_3.addEventListener("touchstart", (event)=> {
    console.log("cercle 3 touché");
    pe_apparraitre_modal ("pe_modal_grand_3");
    pe_disparraitre_modal("pe_modal_grand_1");
    pe_disparraitre_modal("pe_modal_grand_2");
    pe_disparraitre_modal("pe_modal_grand_4");
  })
  pe_cercle_4.addEventListener("touchstart", (event)=> {
    console.log("cercle 4 touché");
    pe_apparraitre_modal ("pe_modal_grand_4");
    pe_disparraitre_modal("pe_modal_grand_1");
    pe_disparraitre_modal("pe_modal_grand_2");
    pe_disparraitre_modal("pe_modal_grand_3");
  })
  

}



function pe_apparraitre_modal (element){
  const modal_ape = document.getElementById(element);
  modal_ape.style.display="flex";
  modal_ape.style.gap="30px";
}

function pe_disparraitre_modal (element){
  const modal_dipe = document.getElementById(element);
  modal_dipe.style.display="none";
}

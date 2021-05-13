var painting = false;

window.addEventListener('load', function(){

  const canvas = document.querySelector('#canvas');

  const ctx = canvas.getContext('2d');

  

  canvas.height = window.innerHeight;

  canvas.width = window.innerWidth;

 

 

 

 //Event listeners

//touch events

 canvas.addEventListener('touchstart', function(e){

   painting = true;

   draw(e);

  

 })

 

 

 

 canvas.addEventListener('touchend', function(){

   painting = false;

   ctx.beginPath();

  

 })

 

 canvas.addEventListener('touchmove', draw)

 

 

 //mouse events

canvas.addEventListener('mousedown', function(e){

   painting = true;

   draw(e);

  

 })

 

 canvas.addEventListener('mouseup', function(){

   painting = false;

   ctx.beginPath();

 })

 

 canvas.addEventListener('mousemove', draw)

 

 //get color inputs

var col = document.getElementById("col");

var bg = document.getElementById("bg");

//change background             

            

bg.addEventListener("input", function(){

                canvas.style.background = bg.value;

            })

            

            

            

   // Clear canvas              

document.getElementById("clr").addEventListener("click", function(){

    ctx.clearRect(0, 0, canvas.width, canvas.height)

})

//Eraser

var erase = false;

document.getElementById("erase").addEventListener("click", function(){

    erase = true;

})

//pen

document.getElementById("pen").addEventListener("click", function(){

    erase = false;

})

// tools

var count = 0;

 var openButton = document.getElementById("toolsOpen");

 openButton.addEventListener("click", function(){

     count++;

     if(count%2 === 1){

         document.getElementById("tools").style.display ="block"

     }else{

         document.getElementById("tools").style.display ="none"

     }

 })
  
  //Download

 

 function generateImg(){

    let el= document.createElement('a');

    el.setAttribute("id","download");

    var dnlName = 'img_'+Date.now()+'.png';

    el.setAttribute("download", dnlName);

    el.setAttribute("href",canvas.toDataURL());

    el.setAttribute("target", "_blank");

        

    

       canvas.append(el);

        document.getElementById('download').click();

        document.getElementById('download').remove();

};

document.getElementById('downloadBtn').addEventListener('click',generateImg);

 

 //Pen size (Range slider)

 var rangeSlider = document.getElementById("rangeSlider");

 

 var penSize = rangeSlider.value;

 rangeSlider.addEventListener("input", function(){

     penSize = rangeSlider.value;

 })

 

 

 //Opacity Range slider

 var opacityRange = document.getElementById("opacityRange");

 

 var opacity = opacityRange.value;

 opacityRange.addEventListener("input", function(){

     opacity = opacityRange.value;

 })

//Draw function 

function draw(e) {

e.preventDefault();

//Eraser updated

if(erase == true){

    ctx.globalCompositeOperation = 'destination-out';

}else{

    ctx.globalCompositeOperation = 'source-over';

}

// let x = e.touches[0].clientX || e.clientX;

// let y = e.touches[0].clientY || e.clientY;

  

  if ('ontouchstart' in window) {

    var x = e.touches[0].clientX;

    var y = e.touches[0].clientY;

} else {

    var x = e.clientX;

    var y = e.clientY;

}

  

  if(!painting) return;

 

  ctx.lineWidth = penSize;

  ctx.lineJoin = 'round';

  ctx.lineCap = 'round';

  ctx.strokeStyle = col.value;

  ctx.globalAlpha = opacity;

  

  ctx.lineTo(x, y);

  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(x, y)

}

 

})

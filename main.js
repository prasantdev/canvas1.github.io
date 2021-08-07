var painting = false;
window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    //events
    let downEvent, moveEvent, upEvent;
    if ('ontouchstart' in window) {
        downEvent = 'touchstart'
        moveEvent = 'touchmove'
        upEvent = 'touchend'
    } else {
        downEvent = 'mousedown'
        moveEvent = 'mousemove'
        upEvent = 'mouseup'
    }
    //Event listeners

    //touch events
    canvas.addEventListener(downEvent, function (e) {
        painting = true;
        draw(e);
        // console.log(e.touches[0]);
    })
    // var download = document.getElementById("download");

    canvas.addEventListener(upEvent, function () {
        let fName = new Date().getTime().toString() + "cvs.png";
        painting = false;
        ctx.beginPath();
        var cvs = canvas.toDataURL();
        download.setAttribute("href", cvs);
        download.setAttribute('download', fName);
    })

    canvas.addEventListener(moveEvent, draw)


    // //mouse events
    // canvas.addEventListener('mousedown', function (e) {
    //     painting = true;
    //     draw(e);

    // })

    // canvas.addEventListener('mouseup', function () {
    //     let fName = new Date().getTime().toString() + "cvs.png";
    //     painting = false;
    //     ctx.beginPath();
    //     var cvs = canvas.toDataURL();
    //     download.setAttribute("href", cvs);
    //     download.setAttribute('download', fName);
    // })

    // canvas.addEventListener('mousemove', draw)

    //get color inputs
    var col = document.getElementById("col");
    var bg = document.getElementById("bg");



    //change background             

    bg.addEventListener("input", function () {
        canvas.style.background = bg.value;
    })



    // Clear canvas              
    document.getElementById("clr").addEventListener("click", function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    })


    //Eraser
    var erase = false;
    document.getElementById("erase").addEventListener("click", function () {
        erase = true;
    })

    //pen
    document.getElementById("pen").addEventListener("click", function () {
        erase = false;
    })


    // tools
    var count = 0;

    var openButton = document.getElementById("toolsOpen");
    openButton.addEventListener("click", function () {



        count++;
        if (count % 2 === 1) {
            document.getElementById("tools").style.display = "block"
        } else {
            document.getElementById("tools").style.display = "none"
        }
    })

    //Pen size (Range slider)
    var rangeSlider = document.getElementById("rangeSlider");

    var penSize = rangeSlider.value;

    rangeSlider.addEventListener("input", function () {
        penSize = rangeSlider.value;
    })


    //Opacity Range slider
    var opacityRange = document.getElementById("opacityRange");

    var opacity = opacityRange.value;

    opacityRange.addEventListener("input", function () {
        opacity = opacityRange.value;
    })


    //Draw function 
    function draw(e) {
        e.preventDefault();

        //Eraser updated
        if (erase == true) {
            ctx.globalCompositeOperation = 'destination-out';
        } else {
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


        if (!painting) return;

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
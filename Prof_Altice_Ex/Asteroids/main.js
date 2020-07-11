var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width;
var height;

var resize = function()
{
    width = window.innerWidth * 2;
    height = window.innerHeight * 2;
    canvas.width = width;
    canvas.height = height;
}
window.onresize = resize;
resize();

ctx.fillStyle = "red";

var state =
{
    x: (width / 2),
    y: (height / 2),
    // keeps track of which keys are pressed
    pressedKeys:
    {
        left: false,
        right: false,
        up: false,
        down: false
    }
}

function update(progress)
{
    // if key is pressed move along its respective axis
    if(state.pressedKeys.left) state.x -= progress;
    if(state.pressedKeys.right) state.x += progress;
    if(state.pressedKeys.up) state.y -= progress;
    if(state.pressedKeys.down) state.y += progress;
    
    // If a boundary is hit subtract the canvas width to loop back around
    if(state.x > width) state.x -= width;
    else if(state.x < 0) state.x += width;
    if(state.y > height) state.y -= height;
    else if(state.y < 0) state.y += height;
}

function draw()
{
    // On each frame clear the canvas
    ctx.clearRect(0, 0, width, height);
    // Then draw a 10px red square with its center at the position
    // stored in our state object
    ctx.fillRect(state.x - 10, state.y - 10, 20, 20);
}

function loop(timestamp)
{
    var progress = (timestamp - lastRender);

    update(progress);
    draw();
    
    lastRender = timestamp;
    // The requestAnimationFrame method requests that the browser call a
    // specified function as soon as it can before the next repaint occurs.
    // Is passed a timestamp of when the callback started firing
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);

var keyMap =
{
    68: "right",
    65: "left",
    87: "up",
    83: "down"
}

function keydown(event)
{
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = true;
}

function keyup(event)
{
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = false;
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
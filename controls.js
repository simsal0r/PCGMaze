function removeControls() {
    KeyboardJS.unbind.key("left");
    KeyboardJS.unbind.key("right");
    KeyboardJS.unbind.key("down");
    KeyboardJS.unbind.key("up");
}

function assignControls() {
    var cameraAngleDegrees = Math.round(camera.rotation.z * 180/Math.PI);
    switch(cameraAngleDegrees){
        case 0: KeyboardJS.bind.axis('left', 'right', 'down', 'up', onMoveKey);
        case 90: KeyboardJS.bind.axis('up', 'down', 'left', 'right', onMoveKey);
        case 180: KeyboardJS.bind.axis('right', 'left', 'up', 'down', onMoveKey);
        case 270: KeyboardJS.bind.axis('down', 'up', 'right', 'left', onMoveKey);
        case -90: KeyboardJS.bind.axis('down', 'up', 'right', 'left', onMoveKey);
        case -180: KeyboardJS.bind.axis('right', 'left', 'up', 'down', onMoveKey);
        case -270: KeyboardJS.bind.axis('up', 'down', 'left', 'right', onMoveKey);
    }
}
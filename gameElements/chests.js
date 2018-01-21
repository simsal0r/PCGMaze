var CHANCE_OF_CHEST_APPEARING = 0.07;
var CHEST_ITEMS = getAtmosphere(localStorage.getItem("atmosphere"), "chest_items");
var CHEST_PROBABILITIES = getAtmosphere(localStorage.getItem("atmosphere"), "chest_probabilities");
var chestTexture = getAtmosphere(localStorage.getItem("atmosphere"), "chest_texture");
var chests = undefined;
var chestMesh = undefined;

function createChests(maze) {
    var chests = new Array(maze.dimension);
    for (var i = 0; i < maze.dimension; i++) {
        chests[i] = new Array(maze.dimension);
        for (var j = 0; j < maze.dimension; j++) {
            var noChestNearX = j > 0 ? chests[i][j-1] == null : true;
            var noChestNearY = i > 0 ? chests[i-1][j] == null : true;
            if(!maze[i][j] && noChestNearX && noChestNearY){
                var isChest = Math.random() < CHANCE_OF_CHEST_APPEARING;
                chests[i][j] = isChest ? getRandomChestItem() : null;
            }
        }
    }
    chests[1][1] = null;
    return chests;
}

function getRandomChestItem() {
    var random = Math.random();
    var cumulativeProbabilities = [];
    CHEST_PROBABILITIES.reduce(function(a,b,i) { return cumulativeProbabilities[i] = a+b; },0);
    for(var i = 0; i < cumulativeProbabilities.length; i++) {
        if(random < cumulativeProbabilities[i]){
            return CHEST_ITEMS[i];
        }
    }
    return CHEST_ITEMS[Math.floor(Math.random() * CHEST_ITEMS.length)];
}

function generateChestMesh(maze) {
    var dummy = new THREE.Geometry();
    for (var i = 0; i < maze.dimension; i++) {
        for (var j = 0; j < maze.dimension; j++) {
            if (chests[i][j] != null) {
                var geometry = new THREE.CubeGeometry(0.8,0.8,0.8,1,1,1);
                var mesh_ij = new THREE.Mesh(geometry);
                mesh_ij.position.x = i + 0.05;
                mesh_ij.position.y = j + 0.05;
                mesh_ij.position.z = 0.5;
                THREE.GeometryUtils.merge(dummy, mesh_ij);
            }
        }
    }
    var material = new THREE.MeshPhongMaterial({map: chestTexture});
    var mesh = new THREE.Mesh(dummy, material);
    return mesh;
}

function handleChest(mazeX, mazeY) {
    scene.remove(chestMesh);
    var typeOfChest = chests[mazeX][mazeY];
    chests[mazeX][mazeY] = null;
    chestMesh = generateChestMesh(maze);
    scene.add(chestMesh);
    switch(typeOfChest){
        case "zoom_out": chest_zoomOut(); break;
        case "move_to_start": chest_moveToStart(); break;
        case "jump_scare": chest_jumpScare(); break;
        case "rotate_maze": chest_rotateMaze(); break;
        case "light_darker": chest_lightDarker(); break;
        case "increase_time": chest_increaseTime(); break;
        case "decrease_time": chest_decreaseTime(); break;
        case "random_teleportation": chest_randomTeleportation(); break;
        default: break;
    }
}

function chest_rotateMaze() {
    var possibleDegrees = [90, 180, 270, -90, -180, -270];
    var rotation_degree = possibleDegrees[Math.floor(Math.random() * possibleDegrees.length)];
    removeControls();
    writeToTextField("Opened rotation chest!");
    var oldRotation = Math.round(camera.rotation.z * 180/Math.PI);
    ZOOM_LEVEL = 8;
    var rotationSpeed = 1000/Math.sqrt(Math.pow(rotation_degree,2));
    var rotation = setInterval(function(){
        var currentRotation = Math.round(camera.rotation.z * 180/Math.PI);
        if(currentRotation != oldRotation+rotation_degree){
            if(rotation_degree > 0) {
                camera.rotation.z += Math.PI/180;
            }
            else {
                camera.rotation.z -= Math.PI/180;
            }
        }
        else {
            var roundedAngle_Degrees =  Math.round(camera.rotation.z * 180/Math.PI) % 360;
            camera.rotation.z = roundedAngle_Degrees  * Math.PI/180;
            assignControls();
            ZOOM_LEVEL = 3;
            window.clearInterval(rotation);
        }
    }, rotationSpeed);
}

function chest_lightDarker() {
    writeToTextField("Opened light darker chest!");
    light.intensity = 0.1;
    startPietimer(30, function(){light.intensity = 0.5;}, "light_darker");
}

function chest_increaseTime() {
    var value = Math.floor((mazeDimension*4)*0.1);
    writeToTextField("Opened increase time chest! +" + value + "s", "green");
    timer_duration += value;
}

function chest_decreaseTime() {
    var value = Math.floor((mazeDimension*4)*0.1);
    writeToTextField("Opened decrease time chest! -" + value + "s");
    timer_duration -= value;
}

function chest_zoomOut() {
    writeToTextField("Opened zoom out chest!", "green");
    ZOOM_LEVEL = 8;
    startPietimer(4, function(){ZOOM_LEVEL = ZOOM_LEVEL_INITIAL}, "zoom_out");
}

function chest_jumpScare() {
    var d = Math.random();
    if (d < 0.25)
    {
        playScream();
        setTimeout(function(){
        $('#jump_scare2').hide();
        setTimeout(function(){
            $('#jump_scare2').show();
            setTimeout(function(){
                $('#jump_scare2').hide();
                setTimeout(function(){
                    $('#jump_scare2').show();
                    setTimeout(function(){
                        $('#jump_scare2').hide();
                    }, 500);
                }, 100);
            }, 100);
        }, 100);
    }, 100);
    }
    else {
        if(d<0.5) {
            playSlam();
            $('#jump_scare').show();
            setTimeout(function () {
                $('#jump_scare').hide();
            }, 500);
        }
        else{
            if(d<0.75) {
                playSlam();
                $('#jump_scare3').show();
                setTimeout(function () {
                    $('#jump_scare3').hide();
                }, 600);
            }else {
                playSlam();
                $('#jump_scare4').show();
                setTimeout(function () {
                    $('#jump_scare4').hide();
                }, 600);
            }
        }
    }
}

function chest_randomTeleportation(){
    writeToTextField("Opened random teleportation chest!");
    var possibleValues = _.range(1, maze.dimension, 2);
    var newXValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    var newYValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    removeControls();
    ZOOM_LEVEL = 8;
    setTimeout(function(){
        movePlayerTo(newXValue, newYValue);
        setTimeout(function(){
            ZOOM_LEVEL = 3;
            Math.round(camera.rotation.z * 180/Math.PI);
            assignControls();
        },500);
    },500);
}

function chest_moveToStart() {
    writeToTextField("Opened move to start chest!");
    movePlayerTo(1,1);
}
var CHANCE_OF_CHEST_APPEARING = 0.07;
var CHEST_ITEMS = getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "chest_items");
var CHEST_PROBABILITIES = getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "chest_probabilities");
var chestTexture = getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "chest_texture");
var chests = undefined;
var chestMesh = undefined;
var chestCounter = 0;
var par_rotation;
var par_X;
var par_Y;

function getChestsOpened() {
    return chestCounter;
}

function createExpChests(id,dimension){
    var chests = new Array(dimension);
    for (var i = 0; i < dimension; i++) {
        chests[i] = new Array(dimension);
    }
    switch(id) {
        case 1:
            par_rotation = 270;
            par_X = 3;
            par_Y = 7;
            chests[7][5] = "random_teleportation";
            chests[3][9] = "rotate_maze";
            chests[2][9] = "increase_time";
            chests[2][11] = "zoom_out";
            chests[9][15] = "rotate_maze";
            chests[9][10] = "jump_happy";
            chests[14][3] = "rotate_maze";
            chests[15][15] = "increase_time";
            return chests;
            break;
        case 2:
            par_rotation = 270;
            par_X = 10;
            par_Y = 10;
            chests[2][1] = "random_teleportation";
            return chests;
            break;
        case 3:
            par_rotation = 180;
            par_X = 10;
            par_Y = 10;
            chests[2][1] = "random_teleportation";
            return chests;
            break;
        case 4:
            par_rotation = 270;
            par_X = 10;
            par_Y = 10;
            chests[2][1] = "random_teleportation";
            return chests;
            break;
        default:
        //error
    }
}
function createChests(maze) {
    var chests = new Array(maze.dimension);
    for (var i = 0; i < maze.dimension; i++) {
        chests[i] = new Array(maze.dimension);
        for (var j = 0; j < maze.dimension; j++) {
            if(i != 0 && j != 0){
                var noChestNearX = j > 0 ? chests[i][j-1] == null : true;
                var noChestNearY = i > 0 ? chests[i-1][j] == null : true;
                if(!maze[i][j] && noChestNearX && noChestNearY){
                    var isChest = Math.random() < CHANCE_OF_CHEST_APPEARING;
                    chests[i][j] = isChest ? getRandomChestItem() : null;
                }
            }
            else {
                chests[i][j] = null;
            }
        }
    }
    chests[1][1] = null;
    return chests;
}

function checkForChests() {
    var mazeX = Math.floor(headMesh.position.x + 0.5);
    var mazeY = Math.floor(headMesh.position.y + 0.5);
    if(!ended()) {
        if(chests[mazeX][mazeY] != null){
            handleChest(mazeX, mazeY);
        }
    }
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
        case "zoom_out": chest_zoomOut(); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Zoom_out]");break;
        case "move_to_start": chest_moveToStart(); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Move_to_start]"); break;
        case "jump_scare": chest_jumpScare(); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Horror_Jump_Scare]"); break;
        case "jump_happy": chest_jumpHappy(); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Happy_Jump_Scare]"); break;
        case "rotate_maze": chest_rotateMaze(par_rotation); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Rotate_Maze] Amount[" + par_rotation + "]");break;
        case "light_darker": chest_lightDarker(); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Darken_Light]");break;
        case "increase_time": chest_increaseTime(); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Increase_Time]");break;
        case "decrease_time": chest_decreaseTime(); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Decrease_Time]");break;
        case "random_teleportation": chest_randomTeleportation(); console.log(new Date().toLocaleTimeString()+" Event[Chest] Type[Random_Teleportation]");break;
        default: break;
    }
}

function chest_rotateMaze(global_rotation) {
   // var possibleDegrees = [90, 180, 270, -90, -180, -270];
    var rotation_degree = global_rotation;
    removeControls();
    writeToTextField("Rotation!");
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
    writeToTextField("Light darker!");
    light.intensity = 0.1;
    startPietimer(30, function(){light.intensity = 0.5;}, "light_darker");
}

function chest_increaseTime() {
    var value = Math.floor((mazeDim1*4)*0.1);
    writeToTextField("Increased time! +" + value + " sec", "white");
    timer_duration += value;
}

function chest_decreaseTime() {
    var value = Math.floor((mazeDim1*4)*0.1);
    writeToTextField("Decreased time! -" + value + " sec");
    timer_duration -= value;
}

function chest_zoomOut() {
    writeToTextField("Zoomed out!", "white");
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
                playKick();
                $('#jump_scare3').show();
                setTimeout(function () {
                    $('#jump_scare3').hide();
                }, 600);
            }else {
                playScare();
                $('#jump_scare4').show();
                setTimeout(function () {
                    $('#jump_scare4').hide();
                }, 600);
            }
        }
    }
}


function chest_jumpHappy() {
    var d = Math.random();
    var currentTime = stopTimer();
    if (d < 0.25)
    {
        removeControls();
        $('#jump_happy2').show();
        setTimeout(function(){
            $('#jump_happy2').hide();
            assignControls();
            restartTimer(currentTime);
        }, 8000);
    }
    else {
        if(d<0.5) {
            removeControls();
            $('#jump_happy').show();
            setTimeout(function () {
                $('#jump_happy').hide();
                assignControls();
                restartTimer(currentTime);
            }, 2500);
        }
        else{
            if(d<0.75) {
                removeControls();
                $('#jump_happy3').show();
                setTimeout(function () {
                    $('#jump_happy3').hide();
                    assignControls();
                    restartTimer(currentTime);
                }, 3000);
            }else {
                removeControls();
                $('#jump_happy4').show();
                setTimeout(function () {
                    $('#jump_happy4').hide();
                    assignControls();
                    restartTimer(currentTime);
                }, 4000);
            }
        }
    }
}

function chest_randomTeleportation(){
    writeToTextField("Teleportation!");
    //var possibleValues = _.range(1, maze.dimension, 2);
    var newXValue = par_X;//possibleValues[Math.floor(Math.random() * possibleValues.length)];
    var newYValue = par_Y;//possibleValues[Math.floor(Math.random() * possibleValues.length)];
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
    writeToTextField("Move to start!");
    movePlayerTo(1,1);
}
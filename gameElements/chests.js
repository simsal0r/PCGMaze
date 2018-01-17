var CHANCE_OF_CHEST_APPEARING = 0.1;
var CHEST_ITEMS = ["zoom_out", "jump_scare", "move_to_start"];
var CHEST_PROBABILITIES = [0.3, 0.68, 0.02];
var chestTexture = THREE.ImageUtils.loadTexture('./assets/chest.jpg');
var chests = undefined;
var chestMesh = undefined;

function createChests(maze) {
    var chests = new Array(maze.dimension);
    for (var i = 0; i < maze.dimension; i++) {
        chests[i] = new Array(maze.dimension);
        for (var j = 0; j < maze.dimension; j++) {
            if(!maze[i][j]){
                isChest = Math.random() < CHANCE_OF_CHEST_APPEARING;
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
        default: break;
    }
}

function chest_zoomOut() {
    ZOOM_LEVEL = 10;
    setTimeout(function(){
        ZOOM_LEVEL = ZOOM_LEVEL_INITIAL;
        }, 3000);
}

function chest_jumpScare() {
    $('#jump_scare').show();
    playScream();
    setTimeout(function(){
        $('#jump_scare').hide();
        }, 500);
}

function chest_moveToStart() {
    movePlayerTo(1,1);
}
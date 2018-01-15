var CHANCE_OF_CHEST_APPEARING = 0.1;
var CHEST_ITEMS = ["zoom_out", "jump_scare", "random_teleportation"];
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
    return chests;
}

function getRandomChestItem() {
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

function updateChestMesh() {

}
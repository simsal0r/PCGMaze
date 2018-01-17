var camera = undefined;
var ZOOM_LEVEL_INITIAL = 8;
var ZOOM_LEVEL = 8;

function createCamera() {
    var aspect = window.innerWidth/window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
    camera.position.set(1, 1, ZOOM_LEVEL);
}

function updateCamera() {
    camera.position.x += (headMesh.position.x - camera.position.x) * 0.1;
    camera.position.y += (headMesh.position.y - camera.position.y) * 0.1;
    camera.position.z += (ZOOM_LEVEL - camera.position.z) * 0.1;
}

function initializeCamera() {
    camera.position.set(1, 1, ZOOM_LEVEL_INITIAL);
}
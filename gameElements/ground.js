var groundMesh = undefined;
var groundTexture =  getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "ground_texture");


function createGround() {
    var ground1 = new THREE.PlaneGeometry(mazeDim1*10, mazeDim1*10, mazeDim1, mazeDim1);
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(mazeDim1*5, mazeDim1*5);
    var materialGround = new THREE.MeshPhongMaterial({map:groundTexture});
    groundMesh = new THREE.Mesh(ground1, materialGround);
    groundMesh.position.set((mazeDim1-1)/2, (mazeDim1-1)/2, 0);
    groundMesh.rotation.set(Math.PI/2, 0, 0);
}
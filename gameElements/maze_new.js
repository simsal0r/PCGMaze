var maze = undefined;
var mazeMesh = undefined;
var mazeDimension = 11;
var mazeTexture   = THREE.ImageUtils.loadTexture('./assets/forest.jpg');

function createMazeBody() {
    var bodyDef = new b2BodyDef();
    var fixDef = new b2FixtureDef();
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(0.5, 0.5);
    for (var i = 0; i < maze.dimension; i++) {
        for (var j = 0; j < maze.dimension; j++) {
            if (maze[i][j]) {
                bodyDef.position.x = i;
                bodyDef.position.y = j;
                physicsWorld.CreateBody(bodyDef).CreateFixture(fixDef);
            }
        }
    }
}

function generateMazeMesh(field) {
    var dummy = new THREE.Geometry();
    for (var i = 0; i < field.dimension; i++) {
        for (var j = 0; j < field.dimension; j++) {
            if (field[i][j]) {
                var geometry = new THREE.CubeGeometry(1,1,1,1,1,1);
                var mesh_ij = new THREE.Mesh(geometry);
                mesh_ij.position.x = i;
                mesh_ij.position.y = j;
                mesh_ij.position.z = 0.5;
                THREE.GeometryUtils.merge(dummy, mesh_ij);
            }
        }
    }
    var material = new THREE.MeshPhongMaterial({map: mazeTexture});
    var mesh = new THREE.Mesh(dummy, material);
    return mesh;
}
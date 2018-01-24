var head = undefined;
var headMesh = undefined;
var headRadius = 0.25;
var headTexture = getAtmosphere(localStorage.getItem("atmosphere"), "head_texture");
var playerTexture = getAtmosphere(localStorage.getItem("atmosphere"), "player_texture");
var player = undefined;
var playerMesh = undefined;
var leftHandMesh = undefined;
var rightHandMesh = undefined;

function getPositionX(){
    return player.GetPosition().x;
}

function getPositionY(){
    return player.GetPosition().y;
}

function createPlayerBody(positionX, positionY) {
    createPlayerBodyDef(positionX, positionY);
    createPlayerBodyFixture();
}

function createPlayerBodyDef(positionX, positionY) {
    var playerBodyDef = new b2BodyDef();
    playerBodyDef.type = b2Body.b2_dynamicBody;
    playerBodyDef.position.Set(positionX, positionY);
    player = physicsWorld.CreateBody(playerBodyDef);
}

function createPlayerBodyFixture(){
    var playerFixture = new b2FixtureDef();
    playerFixture.density = 1.0;
    playerFixture.friction = 0.0;
    playerFixture.restitution = 0.25;
    playerFixture.shape = new b2PolygonShape();
    playerFixture.shape.SetAsBox(headRadius, headRadius/2);
    player.CreateFixture(playerFixture);
}

function generateHeadMesh() {
    var g = new THREE.SphereGeometry(headRadius/2, 32, 16);
    var m = new THREE.MeshPhongMaterial({map:headTexture});
    headMesh = new THREE.Mesh(g, m);
    headMesh.position.set(1, 1, 1-headRadius);
}

function generatePlayerMesh() {
    var g = new THREE.CubeGeometry(2*headRadius,headRadius,1-(headRadius*2),1,1,1);
    var leftHandg = new THREE.SphereGeometry(0.25*headRadius,32,16);
    var rightHandg = new THREE.SphereGeometry(0.25*headRadius,32,16);
    leftHandMesh = new THREE.Mesh(leftHandg);
    rightHandMesh = new THREE.Mesh(rightHandg);
    leftHandMesh.position.x = -headRadius;
    leftHandMesh.position.y = 0.5*headRadius;
    rightHandMesh.position.x = headRadius;
    rightHandMesh.position.y = 0.5*headRadius;
    THREE.GeometryUtils.merge(g, leftHandMesh);
    THREE.GeometryUtils.merge(g, rightHandMesh);
    var material = new THREE.MeshPhongMaterial({map:playerTexture});
    playerMesh = new THREE.Mesh(g, material);
    playerMesh.position.set(1, 1, (1-(headRadius*2))/2);
}

function updatePlayerMesh() {
    var stepX = player.GetPosition().x - playerMesh.position.x;
    var stepY = player.GetPosition().y - playerMesh.position.y;
    updatePlayerMeshPosition(stepX, stepY);
    updatePlayerRotation(stepX, stepY);
}

function updatePlayerMeshPosition(stepX, stepY) {
    headMesh.position.x += stepX;
    headMesh.position.y += stepY;
    playerMesh.position.x += stepX;
    playerMesh.position.y += stepY;
}

function updatePlayerRotation(stepX, stepY) {
    var roundingFactor = 100;
    var roundedX = Math.round(stepX * roundingFactor)/roundingFactor;
    var roundedY = Math.round(stepY * roundingFactor)/roundingFactor;
    if(roundedX != 0 || roundedY != 0) {
        var angle = Math.atan2(roundedX, roundedY);
        headMesh.rotation.z = -angle;
        playerMesh.rotation.z = -angle;
        player.SetAngle(-angle);
    }
}

var stepSound = new Audio("assets/walk.mp3");
stepSound.volume = 0.02;
function movePlayer() {
    var lv = player.GetLinearVelocity();
    lv.Multiply(0.95);
    player.SetLinearVelocity(lv);

    // Apply user-directed force.
    var f = new b2Vec2(keyAxis[0]*player.GetMass()*0.25, keyAxis[1]*player.GetMass()*0.25);
    player.ApplyImpulse(f, player.GetPosition());
    if (keyAxis[0]+keyAxis[1] != 0)
    {

        stepSound.play();
    }
    keyAxis = [0,0];
}



function movePlayerTo(x, y) {
    physicsWorld.DestroyBody(player);
    createPlayerBody(x, y);
    updatePlayerMeshPosition(x,y);
}
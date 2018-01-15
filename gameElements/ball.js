var ball = undefined;
var ballMesh = undefined;
var ballRadius = 0.25;
var ballTexture = THREE.ImageUtils.loadTexture('./assets/ball.png');

function createBallBody() {
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set(1, 1);
    ball = physicsWorld.CreateBody(bodyDef);
    var fixDef = new b2FixtureDef();
    fixDef.density = 1.0;
    fixDef.friction = 0.0;
    fixDef.restitution = 0.25;
    fixDef.shape = new b2CircleShape(ballRadius);
    ball.CreateFixture(fixDef);
}

function generateBallMesh() {
    g = new THREE.SphereGeometry(ballRadius, 32, 16);
    m = new THREE.MeshPhongMaterial({map:ballTexture});
    ballMesh = new THREE.Mesh(g, m);
    ballMesh.position.set(1, 1, ballRadius);
}

function updateBallMesh() {
    var stepX = ball.GetPosition().x - ballMesh.position.x;
    var stepY = ball.GetPosition().y - ballMesh.position.y;
    updateBallMeshPosition(stepX, stepY);
    updateBallRotation(stepX, stepY);
}

function updateBallRotation(stepX, stepY) {
    var tempMat = new THREE.Matrix4();
    tempMat.makeRotationAxis(new THREE.Vector3(0,1,0), stepX/ballRadius);
    tempMat.multiplySelf(ballMesh.matrix);
    ballMesh.matrix = tempMat;
    tempMat = new THREE.Matrix4();
    tempMat.makeRotationAxis(new THREE.Vector3(1,0,0), -stepY/ballRadius);
    tempMat.multiplySelf(ballMesh.matrix);
    ballMesh.matrix = tempMat;
    ballMesh.rotation.getRotationFromMatrix(ballMesh.matrix);
}

function updateBallMeshPosition(stepX, stepY) {
    ballMesh.position.x += stepX;
    ballMesh.position.y += stepY;
}

function moveBall() {
    var lv = ball.GetLinearVelocity();
    lv.Multiply(0.95);
    ball.SetLinearVelocity(lv);

    // Apply user-directed force.
    var f = new b2Vec2(keyAxis[0]*ball.GetMass()*0.25, keyAxis[1]*ball.GetMass()*0.25);
    ball.ApplyImpulse(f, ball.GetPosition());
    keyAxis = [0,0];
}
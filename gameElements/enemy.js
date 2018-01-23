var headRadius = 0.25;
var headTexture = getAtmosphere(localStorage.getItem("atmosphere"), "head_texture");
var EnemyTexture = getAtmosphere(localStorage.getItem("atmosphere"), "Enemy_texture");
var Enemy = undefined;
var EnemyMesh = undefined;
var leftHandMeshEnemy = undefined;
var rightHandMeshEnemy = undefined;

function createEnemyBody(positionX, positionY) {
    createEnemyBodyDef(positionX, positionY);
    createEnemyBodyFixture();
}

function createEnemyBodyDef(positionX, positionY) {
    var EnemyBodyDef = new b2BodyDef();
    EnemyBodyDef.type = b2Body.b2_dynamicBody;
    EnemyBodyDef.position.Set(positionX, positionY);
    Enemy = physicsWorld.CreateBody(EnemyBodyDef);
}

function createEnemyBodyFixture(){
    var EnemyFixture = new b2FixtureDef();
    EnemyFixture.density = 1.0;
    EnemyFixture.friction = 0.0;
    EnemyFixture.restitution = 0.25;
    EnemyFixture.shape = new b2PolygonShape();
    EnemyFixture.shape.SetAsBox(headRadius, headRadius/2);
    Enemy.CreateFixture(EnemyFixture);
}


function generateEnemyMesh(posX, posY) {
    var g = new THREE.CubeGeometry(2*headRadius,headRadius,1-(headRadius*2),1,1,1);
    var leftHandg = new THREE.SphereGeometry(0.25*headRadius,32,16);
    var rightHandg = new THREE.SphereGeometry(0.25*headRadius,32,16);
    leftHandMeshEnemy = new THREE.Mesh(leftHandg);
    rightHandMeshEnemy = new THREE.Mesh(rightHandg);
    leftHandMeshEnemy.position.x = -headRadius;
    leftHandMeshEnemy.position.y = 0.5*headRadius;
    rightHandMeshEnemy.position.x = headRadius;
    rightHandMeshEnemy.position.y = 0.5*headRadius;
    THREE.GeometryUtils.merge(g, leftHandMeshEnemy);
    THREE.GeometryUtils.merge(g, rightHandMeshEnemy);
    var material = new THREE.MeshPhongMaterial({map:EnemyTexture});
    EnemyMesh = new THREE.Mesh(g, material);
    EnemyMesh.position.set(posX, posY, (1-(headRadius*2))/2);
}

function updateEnemyMesh() {
    var stepX = Enemy.GetPosition().x - EnemyMesh.position.x;
    var stepY = Enemy.GetPosition().y - EnemyMesh.position.y;
    updateEnemyMeshPosition(stepX, stepY);
    updateEnemyRotation(stepX, stepY);
}

function updateEnemyMeshPosition(stepX, stepY) {
    EnemyMesh.position.x += stepX;
    EnemyMesh.position.y += stepY;
}

function updateEnemyRotation(stepX, stepY) {
    var roundingFactor = 100;
    var roundedX = Math.round(stepX * roundingFactor)/roundingFactor;
    var roundedY = Math.round(stepY * roundingFactor)/roundingFactor;
    if(roundedX != 0 || roundedY != 0) {
        var angle = Math.atan2(roundedX, roundedY);
        EnemyMesh.rotation.z = -angle;
        Enemy.SetAngle(-angle);
    }
}

function moveEnemyToCoordinate(goal_x,goal_y){
    var x = Enemy.GetPosition().x;
    var y = Enemy.GetPosition().y;
    var xo;
    var yo;

        if (goal_x - x < 0)
        {
            xo = -1;
        }
        if (goal_x - x > 0)
        {
            xo = 1;
        }
        if (goal_y - y < 0)
        {
            yo = -1;
        }
        if (goal_y - y > 0)
        {
            yo = 1;
        }
        if (goal_y - y == 0)
        {
            yo = 0;
        }
        if (goal_x - x == 0)
        {
            xo = 0;
        }


        moveEnemy(xo,yo);

        x = Enemy.GetPosition().x;
        y = Enemy.GetPosition().y;

}

function moveEnemy(xi,yi) {
    var lv = Enemy.GetLinearVelocity();
    lv.Multiply(0.95);
    Enemy.SetLinearVelocity(lv);

    var x = xi;
    var y = yi;

    // Apply user-directed force.
    var f = new b2Vec2(x*Enemy.GetMass()*0.25,y*Enemy.GetMass()*0.25);
    Enemy.ApplyImpulse(f, Enemy.GetPosition());
    //keyAxis = [0,0];
}


//Teleport
function moveEnemyTo(x, y) {
    physicsWorld.DestroyBody(Enemy);
    createEnemyBody(x, y);
    updateEnemyMeshPosition(x,y);
}
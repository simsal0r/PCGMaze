var gameState = undefined;

function gameLoop() {
    function initializeGame() {
        function setLevel() {
            var level = Math.floor((mazeDimension-1)/2 - 4);
            $('#level').html('Level ' + level);
        }
        maze = generateSquareMaze(mazeDimension);
        maze[mazeDimension-1][mazeDimension-2] = false;
        chests = createChests(maze);
        createPhysicsWorld();
        createRenderWorld();
        initializeCamera();
        initializeLighting();
        setLevel();
        gameState = 'fade in';
    }
    function fadeGameIn() {
        increaseLighting();
        renderer.render(scene, camera);
        if (lightingIsOn()) {
            setLightingIntensity(1);
            gameState = 'play'
        }
    }
    function playGame() {
        function isVictory() {
            var mazeX = Math.floor(ballMesh.position.x + 0.5);
            var mazeY = Math.floor(ballMesh.position.y + 0.5);
            return mazeX == mazeDimension && mazeY == mazeDimension - 2
        }
        function checkForChests() {
            var mazeX = Math.floor(ballMesh.position.x + 0.5);
            var mazeY = Math.floor(ballMesh.position.y + 0.5);
            if(chests[mazeX][mazeY] != null) {
                handleChest(mazeX, mazeY);
            }
        }
        updatePhysicsWorld();
        updateRenderWorld();
        renderer.render(scene, camera);
        if (isVictory()) {
            mazeDimension += 2;
            gameState = 'fade out';
        }
        else {
            checkForChests();
        }
    }
    function fadeGameOut() {
        updatePhysicsWorld();
        updateRenderWorld();
        decreaseLighting();
        renderer.render(scene, camera);
        if (lightingIsOff()) {
            setLightingIntensity(0.0);
            renderer.render(scene, camera);
            gameState = 'initialize'
        }
    }

    switch(gameState) {
        case 'initialize': initializeGame();break;
        case 'fade in': fadeGameIn();break;
        case 'play': playGame();break;
        case 'fade out': fadeGameOut();break;
    }
    requestAnimationFrame(gameLoop);
}

function createPhysicsWorld() {
    physicsWorld = new b2World(new b2Vec2(0, 0), true);
    createBallBody(1,1);
    createMazeBody();
}

function createRenderWorld() {
    scene = new THREE.Scene();
    createLight();
    scene.add(light);
    createCamera();
    scene.add(camera);
    generateBallMesh();
    scene.add(ballMesh);
    scene.add(generateMazeMesh(maze));
    chestMesh = generateChestMesh(maze);
    scene.add(chestMesh);
    createGround();
    scene.add(groundMesh);
}

function updatePhysicsWorld() {
    moveBall();
    physicsWorld.Step(1/60, 8, 3);
}

function updateRenderWorld() {
    updateBallMesh();
    updateCamera();
    updateLight();
}
var gameState = undefined;
var escaped = false;
var notcaught = true;
var deathSoundPlayed = false;
var confirmationNeeded = false;
var breathe = null;

var IN_SURVEY_MODE = true;

function gameLoop() {
    function initializeGame() {
        function setLevel() {
            var level = 0;
            if(IN_SURVEY_MODE){
                switch(mazeDimension) {
                    case 13: level = 1; break;
                    case 15: level = 2; break;
                    case 17: level = 3; break;
                    case 21: level = 4; break;
                    case 27: level = 5; break;
                    default: level = Math.floor((mazeDimension-1)/2 - 4); break;
                }
            }
            else {
                level = Math.floor((mazeDimension-1)/2 - 4);
            }
            $('#level').html('Level ' + level);
        }
        if(IN_SURVEY_MODE) {
            maze = getHardcodedMaze(mazeDimension);//generateSquareMaze(mazeDimension);
        }
        else {
            maze = generateSquareMaze(mazeDimension);
        }
        timer_duration = Math.floor(0.67 * Math.pow(mazeDimension, 1.55));
        chests = createChests(maze);
        notSpawned = true;
        createPhysicsWorld();
        createRenderWorld();
        assignControls();
        initializeCamera();
        initializeLighting();
        setLevel();
        escaped = false;
        notcaught = true;
        deathSoundPlayed = false;
        gameState = 'fade in';
    }
    function fadeGameIn() {
        increaseLighting();
        renderer.render(scene, camera);
        if (lightingIsOn()) {
            setLightingMaxIntensity();
            gameState = 'play';
            startTimer();
        }
    }
    function playGame() {
        function isVictory() {
            return ended();

        }
        function isTimeout() {
            return timer_duration < 0;
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
        function backgroundNoise()
        {
            var rng = Math.floor(Math.random()*10000);
            if (rng <= 5 ) {
                playBackgroundSound();
            }
        }
        if(localStorage.getItem("atmosphere") == "horror"){
        if (timeToSpawnEnemy()){
            writeToTextField("He is coming for you...", "red");
            createEnemyBody(1,1);
            generateEnemyMesh(1,1);
            scene.add(EnemyMesh);
            breathe = playBreathe();

        }}
        updatePhysicsWorld();
        updateRenderWorld();
        renderer.render(scene, camera);
        if (isVictory()) {
            if(!escaped) {
                playEndSound();
                if (breathe != null) {
                    breathe.pause();
                    breathe = null;
                }
                writeToTextField("You escaped! Increasing difficulty...", "green");
                removeControls();
                clearPietimer();
                setTimeout(function(){
                    if(IN_SURVEY_MODE) {
                        switch(mazeDimension){
                            case 13: mazeDimension = 15; break;
                            case 15: mazeDimension = 17; break;
                            case 17: mazeDimension = 21; break;
                            case 21: mazeDimension = 27; break;
                            case 27: mazeDimension = 29;
                            if (localStorage.getItem("atmosphere") == "happy")
                            {
                                writeToTextField("Thanks for Playing!", "red",10);
                            }
                            break;
                            default: mazeDimension += 2;
                                if (localStorage.getItem("atmosphere") == "happy")
                                {
                                    writeToTextField("Thanks for Playing!", "red",10);
                                }
                            break;
                        }
                    }
                    else {
                        mazeDimension += 2;
                    }
                    gameState = 'fade out';
                }, 1200);
                var score = Math.floor((mazeDimension-1)/2 - 4);
                if(score > localStorage.getItem("highscore")) {
                    localStorage.setItem("highscore", score);
                }
                escaped = true;
                confirmationNeeded = IN_SURVEY_MODE;
            }
        }
        else if(isTimeout()) {
            writeToTextField("You are out of time!", "red", 2);
            if(!deathSoundPlayed) {
                playDeathSound();
                deathSoundPlayed = true;
                setTimeout(function(){
                    gameState = 'fade out';
                    confirmationNeeded = IN_SURVEY_MODE;
                    if (IN_SURVEY_MODE) {
                        switch(mazeDimension){
                            case 13: mazeDimension = 15; break;
                            case 15: mazeDimension = 17; break;
                            case 17: mazeDimension = 21; break;
                            case 21: mazeDimension = 27; break;
                            case 27: mazeDimension = localStorage.setItem("atmosphere", "happy");
                                localStorage.setItem("startDifficulty", 13);
                                window.location = "game.html"; break;
                            default: mazeDimension += 2;
                                if (localStorage.getItem("atmosphere") == "happy")
                                {
                                    writeToTextField("Thanks for Playing!", "red",10);
                                }
                                break;
                        }
                    }
                    else {
                        mazeDimension = parseInt(localStorage.getItem("startDifficulty"));
                    }
                }, 1000);
            }
            if (breathe != null) {
                breathe.pause();
                breathe = null;
            }
            var score = Math.floor((mazeDimension-1)/2 - 4);
            if(score > localStorage.getItem("highscore")) {
                localStorage.setItem("highscore", score);
            }
            removeControls();
        }
        else {
            if (!escaped) {
                checkForChests();
                if (localStorage.getItem("atmosphere") == "horror") {
                    backgroundNoise();
                }
            }
        }
        //Slenderman
        if(localStorage.getItem("atmosphere") == "horror") {
            if (notSpawned == false) {
                if (caughtByEnemy()) {
                    writeToTextField("YOU DIED", "red", 2);
                    if (notcaught) {
                        breathe.pause();
                        breathe = null;
                        notcaught = false;
                        playSlam();
                        playGong();
                        setTimeout(function () {
                            gameState = 'fade out';
                            confirmationNeeded = IN_SURVEY_MODE;
                            if (IN_SURVEY_MODE) {
                                switch (mazeDimension) {
                                    case 13:
                                        mazeDimension = 15;
                                        break;
                                    case 15:
                                        mazeDimension = 17;
                                        break;
                                    case 17:
                                        mazeDimension = 21;
                                        break;
                                    case 21:
                                        mazeDimension = 27;
                                        break;
                                    case 27:
                                        mazeDimension = localStorage.setItem("atmosphere", "happy");
                                        localStorage.setItem("startDifficulty", 13);
                                        window.location = "game.html";
                                        break;
                                    default:
                                        mazeDimension += 2;
                                        if (localStorage.getItem("atmosphere") == "happy")
                                        {
                                            writeToTextField("Thanks for Playing!", "red",10);
                                        }
                                        break;
                                }
                            }
                            else {
                                mazeDimension = parseInt(localStorage.getItem("startDifficulty"));
                            }
                        }, 500);
                    }

                    var score = Math.floor((mazeDimension - 1) / 2 - 4);
                    if (score > localStorage.getItem("highscore")) {
                        localStorage.setItem("highscore", score);
                    }
                    removeControls();
                }
            }
        }
    }
    function fadeGameOut() {
        if(steps != null) {
            steps.pause();
            steps = null;
        }
        if(timer) {
            clearInterval(timer);
        }
        updatePhysicsWorld();
        updateRenderWorld();
        decreaseLighting();
        renderer.render(scene, camera);
        if (lightingIsOff()) {
            setLightingIntensity(0.0);
            renderer.render(scene, camera);
            if(!confirmationNeeded) {
                gameState = 'initialize'
            }
            else{
                $('#confirmationPopup').show();
            }
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
    createPlayerBody(1,1);
    createMazeBody();
}

function createRenderWorld() {
    scene = new THREE.Scene();
    createLight();
    scene.add(light);
    createTorch();
    scene.add(torch);
    createCamera();
    scene.add(camera);
    generatePlayerMesh();
    scene.add(playerMesh);
    generateHeadMesh();
    scene.add(headMesh);
    scene.add(generateMazeMesh(maze));
    chestMesh = generateChestMesh(maze);
    scene.add(chestMesh);
    createGround();
    scene.add(groundMesh);
    playBackground();
}

function updatePhysicsWorld() {
    movePlayer();
    if(localStorage.getItem("atmosphere") == "horror") {
        if (notSpawned == false) {
            if (stopit() == false) {
                var enemyPath = findNextStep();
                moveEnemyToCoordinate(enemyPath[0], enemyPath[1]);
            }
        }
    }
    physicsWorld.Step(1/60, 8, 3);
}

function updateRenderWorld() {
    updatePlayerMesh();
    if(localStorage.getItem("atmosphere") == "horror") {
        if (notSpawned == false) {
            updateEnemyMesh();
        }
    }
    updateCamera();
    updateLight();
}

function ended(){
    var mazeX = Math.floor(headMesh.position.x + 0.5);
    var mazeY = Math.floor(headMesh.position.y + 0.5);
    return(mazeX == mazeDimension && mazeY == mazeDimension - 2  || mazeX == -1 && mazeY == mazeDimension - 2 || mazeX == mazeDimension && mazeY == 1);
    //              top right                                              top left                                     bottom right

}
function stopit(){
    var mazeX = Math.floor(headMesh.position.x + 0.5);
    var mazeY = Math.floor(headMesh.position.y + 0.5);
    return(mazeX == mazeDimension -1 && mazeY == mazeDimension - 2  || mazeX == 1 && mazeY == mazeDimension - 2 || mazeX == mazeDimension-1 && mazeY == 1);
    //              top right                                              top left                                     bottom right
}
var gameState = undefined;
var gameEnded = false;
var escaped = false;
var notcaught = true;
var deathSoundPlayed = false;
var confirmationNeeded = false;
var annotationConfirmationNeeded = false;
var breathe = null;
var background_music = null;

var IN_SURVEY_MODE = true;

var mazeDim1;

function getExpMaze(mazeID){

    var mazelv1 = getExpGrid(mazeID);
    return {grid:mazelv1, id:mazeID};
}

// maze, chests, time and atmosphere for a given gameCourse
function getGameElements(gameCourse, gameStep)
{
    var maze1;
    var chests1;
    var time1;

    switch(gameCourse)
    {
        case 1:
            switch (gameStep)
            {
                case 1:
                    maze1 = getExpMaze(1);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(1,mazeDim1);
                    time1 = 40;
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    break;
                case 2:
                    maze1 = getExpMaze(2);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(2,mazeDim1);
                    time1 = 40;
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    break;
                case 3:
                    maze1 = getExpMaze(3);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(3,mazeDim1);
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    time1 = 40;
                    break;
                case 4:
                    maze1 = getExpMaze(4);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(4,mazeDim1);
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    time1 = 40;
                    break;
            }
        break;
        case 2:
            switch (gameStep)
            {
                case 1:
                    maze1 = getExpMaze(2);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(2,mazeDim1);
                    time1 = 40;
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    break;
                case 2:
                    maze1 = getExpMaze(4);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(4,mazeDim1);
                    time1 = 40;
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    break;
                case 3:
                    maze1 = getExpMaze(1);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(1,mazeDim1);
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    time1 = 40;
                    break;
                case 4:
                    maze1 = getExpMaze(3);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(3,mazeDim1);
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    time1 = 40;
                    break;
            }
            break;
        case 3:
            switch (gameStep)
            {
                case 1:
                    maze1 = getExpMaze(3);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(3,mazeDim1);
                    time1 = 40;
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    break;
                case 2:
                    maze1 = getExpMaze(1);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(1,mazeDim1);
                    time1 = 40;
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    break;
                case 3:
                    maze1 = getExpMaze(4);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(4,mazeDim1);
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    time1 = 40;
                    break;
                case 4:
                    maze1 = getExpMaze(2);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(2,mazeDim1);
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    time1 = 40;
                    break;
            }
            break
        case 4:
            switch (gameStep)
            {
                case 1:
                    maze1 = getExpMaze(4);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(4,mazeDim1);
                    time1 = 40;
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    break;
                case 2:
                    maze1 = getExpMaze(3);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(3,mazeDim1);
                    time1 = 40;
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    break;
                case 3:
                    maze1 = getExpMaze(2);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(2,mazeDim1);
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    time1 = 40;
                    break;
                case 4:
                    maze1 = getExpMaze(1);
                    mazeDim1 = maze1.grid.dimension;
                    chests1 = createExpChests(1,mazeDim1);
                    console.log(new Date().toLocaleTimeString()+" [Level] Course[" + gameCourse + "] Step[" + gameStep + "]");
                    time1 = 40;
                    break;
            }
            break
        default:
        //error
            return null;
    }
    return {mazeGrid:maze1.grid, mazeID:maze1.id, chests: chests1, time: time1};
}

function gameLoop() {
    function initializeGame() {
        //Called from cache
        var gameCourse = parseInt(localStorage.getItem("gameC"));
        var gameStep = parseInt(localStorage.getItem("gameS"));

        maze = getGameElements(gameCourse,gameStep).mazeGrid;
        chests = getGameElements(gameCourse,gameStep).chests;
        setTimerDuration();
        //setTimerDurationSeconds(); //todo: Why does this not work? -> maybe just cache
        spawned = false;
        createPhysicsWorld();
        createRenderWorld();
        assignControls();
        initializeCamera();
        initializeLighting();
        escaped = false;
        notcaught = true;
        deathSoundPlayed = false;
        gameState = 'fade in';
        gameEnded = false;
        console.log(new Date().toLocaleTimeString()+" Event[Game] Type[Start] Visuals[" + localStorage.getItem("atmosphere") + "] Sounds[" + localStorage.getItem("sound") +"]");
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
        if (timeToSpawnEnemy()){
            spawnEnemy();
            console.log(new Date().toLocaleTimeString()+" Event[Game] Type[Spawn_Enemy]");         }
        updatePhysicsWorld();
        updateRenderWorld();
        renderer.render(scene, camera);
        if (!gameEnded && ended()) {
            endGame_escaped();
            gameEnded = true;
            console.log(new Date().toLocaleTimeString()+" Event[Game] Type[Successful_Escape]");
        }
        else if(!gameEnded && isTimeout()) {
            endGame_timeout();
            gameEnded = true;
            console.log(new Date().toLocaleTimeString()+" Event[Game] Type[Unsuccessful_Out_of_Time]");
        }
        else if(!gameEnded && spawned && caughtByEnemy()) {
            endGame_caught();
            gameEnded = true;
            console.log(new Date().toLocaleTimeString()+" Event[Game] Type[Unsuccessful_Caught_by_Enemy]");
        }
        else if (!gameEnded) {
            checkForChests();
            if (localStorage.getItem("sound") == "horror") {
                backgroundNoise();
            }
        }
    }
    function fadeGameOut() {
        stopSteps();
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
            background_music.pause();
            if (breathe != undefined || breathe != null) {
                breathe.pause();
            }
            if (annotationConfirmationNeeded){
                showAnnotation();
            }
            else if(confirmationNeeded)
            {
                showModal();
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

function endLevel() {
    clearPietimer();
    removeControls();
    //setScore();
    stopEnemyBreathing();
    annotationConfirmationNeeded = IN_SURVEY_MODE;
    // What ?  console.log("test4:" + typeof(parseInt(localStorage.getItem("gameS")) == 1)); todo: this is unintended
    if (parseInt(localStorage.getItem("gameS"))===1) {
        confirmationNeeded = false;
    }
    else{
        confirmationNeeded = IN_SURVEY_MODE;
    }
    setTimeout(function(){
        gameState = 'fade out';
        setNextLevel();
    }, 2500);
}

function setNextLevel() {
    var gameStep0 = parseInt(localStorage.getItem("gameS"))+1;
    localStorage.setItem("gameS",gameStep0 + "");
    //changes setting and run again
    setSetting(parseInt(localStorage.getItem("gameC")),gameStep0);
}

function endGame_escaped() {
    endLevel(true);
    writeToTextField("You escaped! Increasing difficulty...", "white");
    playEndSound();
}

function endGame_timeout() {
    endLevel(false);
    writeToTextField("You are out of time!", "red", 2);
    playDeathSound();
}

function endGame_caught() {
    endLevel(false);
    if (localStorage.getItem("atmosphere")=="horror")
    {
        writeToTextField("YOU DIED", "red", 2);

    }
    else
    {
        writeToTextField("Too many cookies. You can't move anymore!", "white", 5);
        $('#cookies').show();
        setTimeout(function () {
            $('#cookies').hide();
        }, 4000);
    }
    playSlam();
    playGong();
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
    background_music = playBackground();
}

function updatePhysicsWorld() {
    movePlayer();
    if(spawned && !stopit()) {
        var enemyPath = findNextStep();
        moveEnemyToCoordinate(enemyPath[0], enemyPath[1]);
    }
    physicsWorld.Step(1/60, 8, 3);
}

function updateRenderWorld() {
    updatePlayerMesh();
    if(spawned) {
        updateEnemyMesh();
    }
    updateCamera();
    updateLight();
}

function ended(){
    var mazeX = Math.floor(headMesh.position.x + 0.5);
    var mazeY = Math.floor(headMesh.position.y + 0.5);
    return(mazeX == mazeDim1 && mazeY == mazeDim1- 2  || mazeX == -1 && mazeY == mazeDim1 - 2 || mazeX == mazeDim1 && mazeY == 1);
    //              top right                                              top left                                     bottom right

}
function stopit(){
    var mazeX = Math.floor(headMesh.position.x + 0.5);
    var mazeY = Math.floor(headMesh.position.y + 0.5);
    return(mazeX == mazeDim1 -1 && mazeY == mazeDim1 - 2  || mazeX == 1 && mazeY == mazeDim1 - 2 || mazeX == mazeDim1-1 && mazeY == 1);
    //              top right                                              top left                                     bottom right
}

function restart()
{
    window.location = "game.html";
}
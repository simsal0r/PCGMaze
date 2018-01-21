function playBackground() {
    var backgroundSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"), "background_music"));
    backgroundSound.volume = 0.1;
    backgroundSound.play();
}
function playEndSound() {
    var EndSound = new Audio("assets/ghastlyboom.mp3");
    EndSound.volume = 0.5;
    EndSound.play();
}

function playDeathSound() {
    var DeathSound = new Audio("assets/gong.wav");
    DeathSound.volume = 0.20;
    DeathSound.play();
}

function playScream() {
    var screamSound = new Audio("assets/scream.wav");
    screamSound.play();
}

function playSlam() {
    var slamSound = new Audio("assets/slam.mp3");
    slamSound.play();
}

function playSteps() {
    var stepSound = new Audio("assets/steps.mp3");
    stepSound.volume=0.3;
    stepSound.play();
}

function playBackgroundSound(){
    var d = Math.random();
    if (d < 0.2){
    var soundBG = new Audio("assets/backgroundScream1.wav");
    soundBG.volume = 0.1;
    }
    else if (d < 0.4){
        var soundBG = new Audio("assets/bg1.wav");
        soundBG.volume = 0.1;
    }
    else if (d < 0.6){
        var soundBG = new Audio("assets/bg2.mp3");
        soundBG.volume = 0.3;
    }
    else if (d < 0.8){
        var soundBG = new Audio("assets/bg3.mp3");
        soundBG.volume = 0.2;
    }
    else {
        var soundBG = new Audio("assets/bg4.mp3");
        soundBG.volume = 0.3;
    }
    soundBG.play();
}
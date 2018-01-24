function playBackground() {
    var backgroundSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"), "background_music"));
    backgroundSound.volume = 0.1;
    backgroundSound.play();
}
function playEndSound() {
    var EndSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"), "end_sound"));
    EndSound.volume = 0.5;
    EndSound.play();
}

function playDeathSound() {
    var DeathSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"), "death_sound"));
    DeathSound.volume = 0.1;
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

function playKick() {
    var kickSound = new Audio("assets/kick_scare.mp3");
    kickSound.play();
}

function playScare() {
    var scareSound = new Audio("assets/jumpscare4.wav");
    scareSound.volume=0.5;
    scareSound.play();
}

function playSteps() {
    var stepSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"), "step_sound"));
    stepSound.volume=0.9;
    stepSound.play();
    return stepSound;
}
function playGong(){
    var stepG = new Audio("assets/gong.wav");
    stepG.play();
}
function playBreathe(){
    var Breathe = new Audio("assets/breathe.mp3");
    Breathe.volume=0.12;
    Breathe.play();
    return Breathe;
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
        soundBG.volume = 0.15;
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
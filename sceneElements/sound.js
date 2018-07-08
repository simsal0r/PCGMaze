function playBackground() {
    var backgroundSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "background_music"));
    backgroundSound.volume = 0.1;
    backgroundSound.loop = true;
    backgroundSound.play();
    return backgroundSound
}
function playEndSound() {
    var EndSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "end_sound"));
    EndSound.volume = 0.5;
    EndSound.play();
}

function playDeathSound() {
    var DeathSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "death_sound"));
    DeathSound.volume = 0.1;
    DeathSound.play();
}

function playScream() {
    var screamSound = new Audio("assets/scream.wav");
    console.log(new Date().toLocaleTimeString()+": scream sound");
    screamSound.play();
}

function playSlam() {
    //todo: different slam sounds but same notification?
    var slamSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "slam_sound"));
    console.log(new Date().toLocaleTimeString()+": slam sound");
    slamSound.play();
}

function playKick() {
    var kickSound = new Audio("assets/kick_scare.mp3");
    console.log(new Date().toLocaleTimeString()+": kick_scare sound");
    kickSound.play();
}

function playScare() {
    var scareSound = new Audio("assets/jumpscare4.wav");
    console.log(new Date().toLocaleTimeString()+": jumpscare sound");
    scareSound.volume=0.5;
    scareSound.play();
}

function playSteps() {
    var stepSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "step_sound"));
    stepSound.volume=0.9;
    stepSound.play();
    return stepSound;
}

function stopSteps() {
    if(steps != null) {
        steps.pause();
        steps = null;
    }
}

function playGong(){
    var stepG = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "gong_sound"));
    stepG.play();
}
function playBreathe(){
    var Breathe = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "breath_sound"));
    if (localStorage.getItem("sound") == "horror")
    {
        console.log(new Date().toLocaleTimeString()+":- [Sound] - Breathing sound ");
        Breathe.volume=0.12;
        Breathe.play();
    }
    else
    {
        console.log(new Date().toLocaleTimeString()+":- [Sound] - Hey sweatness ");
        Breathe.volume=0.8;
        Breathe.play();
    }

    return Breathe;
}

function backgroundNoise()
{
    var rng = Math.floor(Math.random()*10000);
    if (rng <= 5 ) {
        playBackgroundSound();
    }
}

function playBackgroundSound(){
    var d = Math.random();
    if (d < 0.2){
    var soundBG = new Audio("assets/backgroundScream1.wav");
    soundBG.volume = 0.1;
    console.log(new Date().toLocaleTimeString()+": - [Sound] - Scream [backgroundScream1.wav]");
    }
    else if (d < 0.4){
        var soundBG = new Audio("assets/bg1.wav");
        soundBG.volume = 0.1;
        console.log(new Date().toLocaleTimeString()+": - [Sound] - Scream [bg1.wav]");
    }
    else if (d < 0.6){
        var soundBG = new Audio("assets/bg2.mp3");
        soundBG.volume = 0.15;
        console.log(new Date().toLocaleTimeString()+": - [Sound] - Scream [bg2.wav]");
    }
    else if (d < 0.8){
        var soundBG = new Audio("assets/bg3.mp3");
        soundBG.volume = 0.2;
        console.log(new Date().toLocaleTimeString()+": - [Sound] - Scream [bg3.wav]");
    }
    else {
        var soundBG = new Audio("assets/bg4.mp3");
        soundBG.volume = 0.3;
        console.log(new Date().toLocaleTimeString()+": - [Sound] - Baby_crying [bg4.wav]");
    }
    soundBG.play();
}
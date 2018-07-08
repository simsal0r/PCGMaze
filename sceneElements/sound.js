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
    console.log(new Date().toLocaleTimeString()+  " Event[Sound] End, Type: " + localStorage.getItem("sound"));
}

function playDeathSound() {
    var DeathSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "death_sound"));
    DeathSound.volume = 0.1;
    DeathSound.play();
    console.log(new Date().toLocaleTimeString()+" Event[Sound] Death, Type: " + localStorage.getItem("sound"));
}

function playScream() {
    var screamSound = new Audio("assets/scream.wav");
    console.log(new Date().toLocaleTimeString()+" Event[Sound] File[scream.wav]");
    screamSound.play();
}

function playSlam() {
    var slamSound = new Audio("assets/slam.mp3");
    console.log(new Date().toLocaleTimeString()+" Event[Sound] File[slam.mp3]");
    slamSound.play();
}

function playKick() {
    var kickSound = new Audio("assets/kick_scare.mp3");
    console.log(new Date().toLocaleTimeString()+" Event[Sound] File[kick_scare.mp3]");
    kickSound.play();
}

function playScare() {
    var scareSound = new Audio("assets/jumpscare4.wav");
    console.log(new Date().toLocaleTimeString()+" Event[Sound] File[jumpscare4.wav]");
    scareSound.volume=0.5;
    scareSound.play();
}

function playSteps() {
    var stepSound = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "step_sound"));
    stepSound.volume=0.9;
    stepSound.play();
    console.log(new Date().toLocaleTimeString()+" Event[Sound] Close-to-End, Type: " + localStorage.getItem("sound"));
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
    console.log(new Date().toLocaleTimeString()+  " Event[Sound] Gong, Type: " + localStorage.getItem("sound"));
}
function playBreathe(){
    var Breathe = new Audio(getAtmosphere(localStorage.getItem("atmosphere"),localStorage.getItem("sound"), "breath_sound"));
    if (localStorage.getItem("sound") == "horror")
    {
        console.log(new Date().toLocaleTimeString()+" Event[Sound] - File[breath.mp3]");
        Breathe.volume=0.12;
        Breathe.play();
    }
    else
    {
        console.log(new Date().toLocaleTimeString()+" Event[Sound] - File[hey-sweatness.mp3]");
        Breathe.volume=0.8;
        Breathe.play();
    }
    return Breathe;
}

function backgroundNoise()
{
    var rng = Math.floor(Math.random()*10000);
    if (rng <= 6 ) {
        playBackgroundSound();
    }
}

function playBackgroundSound(){
    var d = Math.random();
    if (d < 0.2){
    var soundBG = new Audio("assets/backgroundScream1.wav");
    soundBG.volume = 0.1;
    console.log(new Date().toLocaleTimeString()+" Event[Sound] File[backgroundScream1.wav]");
    }
    else if (d < 0.4){
        var soundBG = new Audio("assets/bg1.wav");
        soundBG.volume = 0.1;
        console.log(new Date().toLocaleTimeString()+" Event[Sound] File[bg1.wav]");
    }
    else if (d < 0.6){
        var soundBG = new Audio("assets/bg2.mp3");
        soundBG.volume = 0.15;
        console.log(new Date().toLocaleTimeString()+" Event[Sound] File[bg2.wav]");
    }
    else if (d < 0.8){
        var soundBG = new Audio("assets/bg3.mp3");
        soundBG.volume = 0.2;
        console.log(new Date().toLocaleTimeString()+" Event[Sound] File[bg3.wav]");
    }
    else {
        var soundBG = new Audio("assets/bg4.mp3");
        soundBG.volume = 0.3;
        console.log(new Date().toLocaleTimeString()+" Event[Sound] File[bg4.wav]");
    }
    soundBG.play();
}
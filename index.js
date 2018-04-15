function handleSubmit(startDifficulty, atmosphere, sound) {
    localStorage.setItem("atmosphere", atmosphere);
    localStorage.setItem("sound", sound);
    localStorage.setItem("startDifficulty", startDifficulty);
    window.location = "game.html";
}

$(document).ready(function() {
    $("#highscore").text(localStorage.getItem("highscore") != null ? "Highscore: " + localStorage.getItem("highscore") : "No highscore yet");
})
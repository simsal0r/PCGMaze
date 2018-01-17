function handleSubmit(startDifficulty) {
    localStorage.setItem("startDifficulty", startDifficulty);
    window.location = "game.html";
}
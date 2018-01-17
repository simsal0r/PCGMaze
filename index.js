function handleSubmit(startDifficulty, atmosphere) {
    localStorage.setItem("atmosphere", atmosphere);
    localStorage.setItem("startDifficulty", startDifficulty);
    window.location = "game.html";
}

function handleSubmit(startDifficulty, atmosphere, sound) {
    // Assign a game course
    var gameCourse = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    console.log(gameCourse);
    var gameStep = 1;
    localStorage.setItem("gameC", gameCourse + "");
    localStorage.setItem("gameS", gameStep + "");
    setSetting(gameCourse, gameStep);
}

function setSetting(gameCourse,gameStep){
    switch(gameCourse)
    {
        case 1:
            switch(gameStep)
            {
                case 1:
                    localStorage.setItem("atmosphere", "happy");
                    localStorage.setItem("sound", "happy");
                    break;
                case 2:
                    localStorage.setItem("atmosphere", "horror");
                    localStorage.setItem("sound", "horror");
                    break;
                case 3:
                    localStorage.setItem("atmosphere", "happy");
                    localStorage.setItem("sound", "horror");
                    break;
                case 4:
                    localStorage.setItem("atmosphere", "horror");
                    localStorage.setItem("sound", "happy");
                    break;
            }
            break;
        case 2:
            switch(gameStep)
            {
                case 4:
                    localStorage.setItem("atmosphere", "happy");
                    localStorage.setItem("sound", "happy");
                    break;
                case 1:
                    localStorage.setItem("atmosphere", "horror");
                    localStorage.setItem("sound", "horror");
                    break;
                case 2:
                    localStorage.setItem("atmosphere", "happy");
                    localStorage.setItem("sound", "horror");
                    break;
                case 3:
                    localStorage.setItem("atmosphere", "horror");
                    localStorage.setItem("sound", "happy");
                    break;
            }
            break;
        case 3:
            switch(gameStep)
            {
                case 3:
                    localStorage.setItem("atmosphere", "happy");
                    localStorage.setItem("sound", "happy");
                    break;
                case 4:
                    localStorage.setItem("atmosphere", "horror");
                    localStorage.setItem("sound", "horror");
                    break;
                case 1:
                    localStorage.setItem("atmosphere", "happy");
                    localStorage.setItem("sound", "horror");
                    break;
                case 2:
                    localStorage.setItem("atmosphere", "horror");
                    localStorage.setItem("sound", "happy");
                    break;
            }
            break;
        case 4:
            switch(gameStep)
            {
                case 2:
                    localStorage.setItem("atmosphere", "happy");
                    localStorage.setItem("sound", "happy");
                    break;
                case 3:
                    localStorage.setItem("atmosphere", "horror");
                    localStorage.setItem("sound", "horror");
                    break;
                case 4:
                    localStorage.setItem("atmosphere", "happy");
                    localStorage.setItem("sound", "horror");
                    break;
                case 1:
                    localStorage.setItem("atmosphere", "horror");
                    localStorage.setItem("sound", "happy");
                    break;
            }
            break;
        default:
            //error
            return null;
    }
    if (gameStep == 1) {
        window.location = "game.html";
    }
}
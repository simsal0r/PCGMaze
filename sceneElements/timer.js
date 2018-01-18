var timer_duration = 60;
var timer = undefined;
var stepsPlayed = false;

function startTimer() {
    $('#timerText').text(timeToString(timer_duration));
    timer_duration--;
    timer = setInterval(function() {
        $('#timerText').text(timeToString(timer_duration));
        timer_duration--;
        if(!stepsPlayed && timer_duration < 8){
            if(localStorage.getItem("atmosphere") == "horror"){
                playSteps();
            }
            stepsPlayed = true;
        }
    }, 1000);
}

function timeToString(time) {
    var minutes = Math.floor(time/60);
    var seconds = time%60 == 0 ? "00" : (time%60 < 10 ? ("0" + time%60) : time%60);
    return minutes + ":" + seconds;
}

function startPietimer(seconds, callbackFunction, type) {
    var pietimer = type == "zoom_out" ? "#pietimer" : "#pietimer2";
    if($(pietimer).pietimer != null) {
        $(pietimer).pietimer('pause');
    }
    $(pietimer).pietimer({
            seconds: seconds,
            color: 'rgba(255, 255, 255, 0.8)',
            height: 100,
            width: 100
        },
        callbackFunction);
    $(pietimer).pietimer('start');
}

function clearPietimer() {
    $("#pietimer").pietimer = null;
    $("#pietimer2").pietimer = null
}
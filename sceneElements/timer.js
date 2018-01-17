function startTimer() {
    $('#timerText').text(timeToString(timer_duration));
    timer_duration--;
    timer = setInterval(function() {
        $('#timerText').text(timeToString(timer_duration));
        timer_duration--;
    }, 1000);
}

function timeToString(time) {
    var minutes = Math.floor(time/60);
    var seconds = time%60 == 0 ? "00" : (time%60 < 10 ? ("0" + time%60) : time%60);
    return minutes + ":" + seconds;
}

function startPietimer(seconds, callbackFunction) {
    $('#pietimer').pietimer({
            seconds: seconds,
            color: 'rgba(255, 255, 255, 0.8)',
            height: 100,
            width: 100
        },
        callbackFunction);
    $('#pietimer').pietimer('start');
}
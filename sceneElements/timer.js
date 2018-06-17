var timer_duration = 60;
var max_time;
var timer = undefined;
var stepsPlayed = false;
var spawned = false;
var steps = null;


function isTimeout() {
    return timer_duration < 0;
}

function setTimerDuration() {
    timer_duration = Math.floor(0.68 * Math.pow(mazeDimension, 1.6));
}

function startTimer() {
    max_time = timer_duration;
    $('#timerText').text(timeToString(timer_duration));
    timer_duration--;
    timer = setInterval(function() {
        $('#timerText').text(timeToString(timer_duration));
        timer_duration--;
        if(!stepsPlayed && timer_duration < 10){
            steps = playSteps();
            stepsPlayed = true;
        }
    }, 1000);
    stepsPlayed=false;
}

function restartTimer(remTime) {
    timer_duration = remTime;
    $('#timerText').text(timeToString(timer_duration));
    timer_duration--;
    timer = setInterval(function() {
        $('#timerText').text(timeToString(timer_duration));
        timer_duration--;
        if(!stepsPlayed && timer_duration < 10){
            steps = playSteps();
            stepsPlayed = true;
        }
    }, 1000);
    stepsPlayed=false;
}

function stopTimer() {
    var currentTime = timer_duration;
    $('#timerText').text(timeToString(currentTime));
    clearInterval(timer);
    timer = null
    return currentTime
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
    $("#pietimer").empty();
    $("#pietimer2").empty();
}

function timeToSpawnEnemy()
{
    if (!spawned)
    {
        if (timer_duration < max_time/3.5) // max_time - timer_duration > 7  appears after 1/4 of time
        {
            console.log(max_time + " " + timer_duration)
            //debugger;
            spawned = true;
            return true;
        }
    }
    return false;
}
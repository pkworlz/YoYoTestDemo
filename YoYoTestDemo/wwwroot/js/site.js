// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Vars..

var count;
var timerElement;
var timerIntervalObj;
var seconds;
var minutes;
var currentTime;

var siteBaseUrl = "https://localhost:5001";

var fitnessRatingData;

// Shuttel Vars

var currentShuttleLevelNumber;
var currentShuttleNumber;
var currentShuttleSpeed;
var currentTotalDistance;



// Init code..
$(function () {
    console.log("ready!");
    init();
});

function init() {
    count = 0;
    timerElement = $('#timer');
    cdTimerElement = $('#cdTimer');
    currentShuttleNumber = 0;
    currentTime = "00:00";

    //load json data..
    getFitnessRatingData();

}

// Timer Logic..

function stop() {

    console.log("stop timer!");

    stopTimer();
}

function start() {
    console.log("start timer!");
    startTimer();
    processSuttle();
}

function timer() {
    count++;

    seconds = pad(count % 60);
    minutes = pad(parseInt(count / 60));

    currentTime = minutes + ":" + seconds

    timerElement.text(currentTime);
    processSuttle();

}

// CountDown Timer
var cdSeconds;
var cdMinutes;
var cdTimerElement;
var cdCurrentTime;
var countDown;

function countDownTimer() {

    cdSeconds = pad(countDown % 60);
    cdMinutes = pad(parseInt(countDown / 60));

    cdCurrentTime = cdMinutes + ":" + cdSeconds

    cdTimerElement.text(cdCurrentTime);

    console.log(countDown);
    if (countDown === 0) {
        clearInterval(cdTimerIntervalObj);
    }

    countDown--;
   
}

// Second Minute Helper
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function startTimer() {
    timerIntervalObj = setInterval(timer, 1000);
}

function startCountDownTimer(timeSpan) {
    countDown = timeSpan;
    cdTimerIntervalObj = setInterval(countDownTimer, 1000);
}

function stopTimer() {
    clearInterval(timerIntervalObj);
    clearInterval(cdTimerIntervalObj);
}

// Shuttle Processing..
function processSuttle() {
    if (fitnessRatingData) {
        $.each(fitnessRatingData, function (index, item) {
            
            if (item.startTime === currentTime) {
                console.log(item, index);

                currentShuttleLevelNumber = item.speedLevel;
                currentShuttleNumber = item.shuttleNo;
                currentShuttleSpeed = item.speed;
                if (index > 0) currentTotalDistance = item.accumulatedShuttleDistance;

                startCountDownTimer(5);

                updateProcessedUi();
                return false;
            }
        });
    }
}

function updateProcessedUi() {
    $("#currentShuttleLevelNumber").text(currentShuttleLevelNumber);
    $("#currentShuttleNumber").text(currentShuttleNumber);
    $("#currentShuttleSpeed").text(currentShuttleSpeed);
    $("#currentTotalDistance").text(currentTotalDistance);
}

// Getting FitnessRating Data..

function getFitnessRatingData() {
    $.ajax({
        url: siteBaseUrl + "/api/test/FitnessRating", success: function (result) {
            fitnessRatingData = result;
            //console.log(result);
            //processSuttle();
        }
    });
}




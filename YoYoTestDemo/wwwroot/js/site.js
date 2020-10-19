// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Vars..

var count;
var timerElement;
var timerIntervalObj;
var cdTimerIntervalObj;
var seconds;
var minutes;
var currentTime;

var siteBaseUrl = "https://localhost:5001";

var fitnessRatingData;

var progressBarObj = {start: 0, end: 0, current: 0}

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

    //init UI..
    $("#controls").removeAttr("hidden");
    $("#pauseBtn").hide();
    $("#playBtn").show();

}


// Events Entry..
function stop() {

    console.log("stop timer!");

    stopTimer();

    $("#pauseBtn").hide();
    $("#playBtn").show();
}

function start() {
    console.log("start timer!");
    startTimer();
    startCountDownTimer();

    processSuttle();

    $("#pauseBtn").show();
    $("#playBtn").hide();
}

// Timer Logic..
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

    countDown--;
    
    cdTimerElement.text(cdCurrentTime);

    //console.log(countDown, currentTime);
    if (countDown <= 0) {
        clearInterval(cdTimerIntervalObj);
        countDown = 0;
    }
   
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

function startCountDownTimer() {
    //countDown = timeSpan;
    cdTimerIntervalObj = setInterval(countDownTimer, 1000);
}

function stopTimer() {
    clearInterval(timerIntervalObj);
    clearInterval(cdTimerIntervalObj);
}

function initShuttleData() {

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

                if (index < fitnessRatingData.length) {
                    let countDownSeconds = calculateCountDownTime(fitnessRatingData[index], fitnessRatingData[index + 1]);
                    countDown = countDownSeconds;

                    //resetting timer
                    if (cdTimerIntervalObj) {
                        clearInterval(cdTimerIntervalObj);
                    }
                    
                    startCountDownTimer();

                    // Progress change..
                    progressBarObj.current = item.accumulatedShuttleDistance;
                    //console.log("Progress Bar : ", progressBarObj);
                    calculateProgressBarData();
                }

                if (index === fitnessRatingData.length - 1) {
                    // finished..
                    stop();
                }
                

                updateProcessedUi();
                //return false;
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

function initProgressBarData() {
    // Setting progress bar..
    if (fitnessRatingData) {
        progressBarObj.start = fitnessRatingData[0].accumulatedShuttleDistance;
        progressBarObj.end = fitnessRatingData[fitnessRatingData.length - 1].accumulatedShuttleDistance;
        progressBarObj.current = fitnessRatingData[0].accumulatedShuttleDistance;
    }
    $("#speed-level-progress-bar").css('width', 0 + '%');
}

// Getting FitnessRating Data..

function getFitnessRatingData() {
    $.ajax({
        url: siteBaseUrl + "/api/test/FitnessRating", success: function (result) {
            fitnessRatingData = result;
            initProgressBarData();
            //console.log(result);
            //processSuttle();
        }
    });
}

// Utilities..
function calculateCountDownTime(currentRating, nextRating) {

    let currentTime = currentRating.startTime.split(":");
    let nextTime = nextRating.startTime.split(":");

    let countDownTime = (parseInt(nextTime[0]) * 60 + parseInt(nextTime[1])) - (parseInt(currentTime[0]) * 60 + parseInt(currentTime[1]));
    console.log(currentTime, nextTime, countDownTime);

    return countDownTime;
}

function calculateProgressBarData() {
    var progressPercent = percentage(parseInt(progressBarObj.current), parseInt(progressBarObj.end));
    //console.log(progressPercent);
    $("#speed-level-progress-bar").css('width', progressPercent + '%');
}

function percentage(partialValue, totalValue) {
    return parseInt((100 * partialValue) / totalValue);
} 



// Player Events..
function warnPlayer(playerId) {
    let btnName = '#warnBtn' + playerId;
    console.log(btnName, playerId);

    $(btnName).attr("disabled", true);
    $(btnName).removeClass("btn-outline-warning");
    $(btnName).addClass("btn-outline-dark");
}

function stopPlayer(playerId) {
    console.log(playerId);
}



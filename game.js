

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var press_cnt = 0;



// Step 7 - Start the Game
$(document).keydown(function(){
    if(!start){ //first time
        $("h1").text("Level " + level);    
        nextSequence();
        start = true;    
    }
})

function nextSequence(){
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    flashButton(("#" + randomChosenColour));
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

//Step 4 - Check Which Button is Pressed
$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    if(checkAnswer(userClickedPattern.length-1) && (gamePattern.length == userClickedPattern.length)){
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
    else if(!checkAnswer(userClickedPattern.length-1)){
        startOver();
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
    }

});

function startOver(){
    level = 0;
    start = false;
    gamePattern = [];
    userClickedPattern = [];
}

function checkAnswer(currentLevel){
    //over or less click amount
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("Succes");
        return true;
    }
    else{
        console.log("wrong");
        return false;
    }

}

//Step 6 - Add Animations to User Clicks
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    console.log($("#" + currentColour).hasClass("pressed"));
    setTimeout(() => {
        $("#" + currentColour).removeClass('pressed');
      }, 100);
}

//Step 5 - Add Sounds to Button Clicks
function playSound(name){
    var chosen_audio = new Audio("./sounds/" + name + ".mp3");
    chosen_audio.play();

}

function flashButton(chosen_id) {
    console.log(chosen_id);
    $(chosen_id).fadeOut(200).fadeIn(200);
}


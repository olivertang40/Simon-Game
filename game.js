var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// START THE GAME
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;

  }
});

// PLAYERS'S TURN
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

// CHECKING ANSWERS
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        },1000);
        }
      } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      },200);
      $('#level-title').text("Game Over, Press Any Key to Restart");
      startOver();

    //
    // gamePattern = [];
    // userClickedPattern = [];
    // started = false;
    // level = 0;
  }
}

// GAME SEQUENCE
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

//PLAYING SOUND
function playSound(name) {
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
};

// ANIMATE PRESS
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")},100);
  }

// START OVER
function startOver() {
  level = 0
  gamePattern = []
  started = false
}

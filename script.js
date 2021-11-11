let level = 0;
let gameStart = false;

/* creating color array and array to hold game pattern */
const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];

const userClickedPattern = [];

/* listening for user keyboard press to start the game */
$(document).keypress(function () {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    gameStart = true;
    nextSequence();
  }
});

/* generating random number to choose random color from color array and 
   adding random color generated to game pattern array
   plays audio of the random chosen color in the pattern array */
const nextSequence = () => {
  ++level;
  $("h1").text("Level " + level);
  let randomNum = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeTo(100, 0.3, function () {
    $(this).fadeTo(500, 1.0);
  });
  playSound(randomChosenColor);
};

/* getting the color of the button user clicked 
adding to the user click array */
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer();
});

/* plays sounds based on the color */
function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

/* makes button clicked flash */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"), 100;
  });
}

function checkAnswer() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      playSound("wrong");
      restart();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      return $("h1").text("Game Over! Press Any Key To Restart");
    }
  }

  if (gameStart === true && userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
      userClickedPattern.length = 0;
    }, 1000);
  }
}

function restart() {
  level = 0;
  gameStart = false;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}

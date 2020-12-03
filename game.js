var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false

//Press the A key in the website to start the game.
$(document).keydown(function(event){
  if(event.key = "a" && started === false){
    nextSequence();
    started = true;
  }
})

function nextSequence(){
  //Picks a random number between 0 and 3.
  var randomNumber = Math.floor(Math.random() * 4);
  //Takes the random number and applies it to a color in the buttonColors array.
  var randomChosenColor = buttonColors[randomNumber];
  //Adds the randomChosenColor to an array called gamePattern.
  gamePattern.push(randomChosenColor);
  //Flashes the next button in the sequence.
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  //Plays the audio chosen for the button color.
  playSound(randomChosenColor);
  //Increase the level number
  level++;
  //Update the H1 to match the level of the game.
  $("#level-title").html("Level " + level);

  console.log(gamePattern);

  return gamePattern;
}

//User clicks on a color and stores it into an array called userClickPattern.
$(".btn").click(function(){
  //Get the id of the chosen color and add it to the userClickPattern array.
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  //Call the animatePress function.
  animatePress(userChosenColor);
  //Call the playSound function.
  playSound(userChosenColor);
  //Call the checkAnswer function
  checkAnswer(userClickPattern);

  console.log(userClickPattern);
});

//Play the sound of the color based on the color picked/chosen
function playSound(randomChosenColor){
  var colorAudio = new Audio("sounds/" + randomChosenColor + ".mp3");
  colorAudio.play();
}

//The animation of the click
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Check if the answers match
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel.length - 1] === currentLevel[currentLevel.length - 1]){
    //console.log("Correct");

    if(gamePattern.length === currentLevel.length){
      setTimeout(function(){
        userClickPattern = [];
        nextSequence();
      }, 500);
    }
  }
  else{
    //console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("#level-title").html("Game Over, Press Any Key to Restart.")
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  userClickPattern = [];
  gamePattern = [];
}

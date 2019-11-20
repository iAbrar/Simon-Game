var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level;

var startGame = false;

$(document).on('keypress',function(e) {
  startGame = true;

if(startGame)
  nextSequence();
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  $('#level-title').text('Level '+level);

}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(element){
  $('#'+element).addClass('pressed');
  setTimeout(function() {
  $('#'+element).removeClass('pressed');
}, 100);
}

function startOver(){
  startGame = false;
  gamePattern = [];
  $('body').removeClass('game-over');
  level = 0;
}


function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
      $('body').addClass('game-over');
      $('#level-title').text('Game Over press any key to restart ');
      startOver();

  }


}


$('.balloon').click(function(){
  userClickedPattern.push($(this).attr("id"));
  playSound($(this).attr("id"));
  animatePress($(this).attr("id"));
  checkAnswer(userClickedPattern.length-1);
});

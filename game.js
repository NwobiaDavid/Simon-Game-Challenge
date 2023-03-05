let buttonColours = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];
let gamePattern = [];

$(document).on('keydown', function () {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

let level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('h1').text('Level ' + level);

  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

$('.btn').on('click', function (e) {
  let userChosenColour = String(e.target.id);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
  $('#' + currentColour).on('click', function () {
    $('#' + currentColour).addClass('pressed');
    setTimeout(() => {
      $('#' + currentColour).removeClass('pressed');
    }, 100);
  });
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('failed');
    let wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $('body').addClass('game-over');
    $('h1').text('Game Over, Press Any Key to Restart');

    startOver();
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
  }
}

function startOver() {
  level=0;
  gamePattern=[];
  started=false;
}

function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

let started = false;

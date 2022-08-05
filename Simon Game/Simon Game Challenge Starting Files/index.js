var gamePattern = [];
const buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


var isStarted = false;
 $(document).ready(function(){  
    $(document).keypress(function(){  
        if (isStarted ==false){
            isStarted = true;
            $("h1").text(`Level ${level}`);
            nextSequence();
        }
    });  
});  


var nextSequence = function(){
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var speed = level;

    if (level>=20){
        speed = 20;
    }
    let counter = 0;
    const i = setInterval(function(){
        $(`#${gamePattern[counter]}`).fadeIn(150).fadeOut(150).fadeIn(150);
        playSound(gamePattern[counter]);
        counter++;
        if(counter === gamePattern.length) {
            clearInterval(i);
        }
    }, 450 - level*20);
   
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


$(".btn").click(function(e){
    if(isStarted && userClickedPattern.length < gamePattern.length){
    idClicked = e.target.id;
    userClickedPattern.push(idClicked);
    animatePress(idClicked);
    playSound(idClicked);
    if(arraysEqual(gamePattern,userClickedPattern)){
        levelUp();
    }
    else if(gamePattern.length==userClickedPattern.length && !arraysEqual(gamePattern,userClickedPattern)){
        gameOver();
        restartGame();
    }
}
 });



 function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


  function restartGame(){
    isStarted = false
    setTimeout(function(){
        $("#level-title").text("Press a Key to Start");
        $("body").css("background-color","#011F3F");
    },3000);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
  }

  function gameOver(){
    playSound("wrong");
    $("#level-title").text("Game Over");
    $("body").css("background-color","#CD5C5C");
  }

  function levelUp(){
    $("#level-title").text(`Level ${++level}`)
    setTimeout(nextSequence,300);
    userClickedPattern = [];
  }
var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){

    $("body").removeClass("game-over");
        if(started==false)
        {
            $("h1").text("Level "+level);
            nextSequence();
            started= true;
        }
    });

function nextSequence()
{
    userClickedPattern=[];
    level+=1;
    $("h1").text("Level "+level);
    var randomNumber= (Math.floor(Math.random()*4));
    var randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var currentDiv= "#".concat(randomChosenColor);
    $(currentDiv).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
        var audio= new Audio("sounds/"+ name+ ".mp3");
        audio.play();
}

function animatePress(currentColor){

    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");
        wrongAnswer();
    }
}

function wrongAnswer()
{
    var audio= new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");
    startOver();
}

function startOver()
{
    started= false;
    gamePattern= [];
    level= 0;
}
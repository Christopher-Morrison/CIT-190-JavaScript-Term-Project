var cup1 = $("#cup1");
var cup2 = $("#cup2");
var cup3 = $("#cup3");
var ball = $("#ball");
var difficulty = $("#difficulty").val();
var instructions = $("#instructions");
var instructionDelay;

var p1 = 50;
var p2 = 250;
var p3 = 450;
var speed;
var rounds;
var score = 0;

var shouldBeClickable = false;
// hide controls until the intro animation has finished.
$("#difficulty").hide();
$("label").hide();
$("#shuffleCups").hide();
setTimeout( function() {
    $("#difficulty").show();
    $("label").show();
    $("#shuffleCups").show();
}, 3400)


$(document).ready(function(){

var slider = $("#difficulty")
slider.on('input', function(){
    $("#difDisplay").text(slider.val());
    difficulty = slider.val();
})


// starting positions.
cup1.animate({left:"50px"}, "slow"); // left cup
cup3.animate({left:"450px"}, "slow") // right cup
cup2.delay(500).animate({top:"-=100"}, "slow").delay(1500);
cup2.animate({top:"+=100"}, "slow");

// adjust game difficulty
$("#shuffleCups").click(function(){
    if (difficulty == '1'){
        speed = 1200;
        rounds = 15
        instructionDelay = 18000;
            
    }
    else if (difficulty == '2'){
        speed = 1000;
        rounds = 20  
        instructionDelay = 20000;
    }
    else if (difficulty == '3'){
        speed = 900;
        rounds = 25
        instructionDelay = 22500;
    }
    else if (difficulty == '4'){
        speed = 400;
        rounds = 30
        instructionDelay = 12000;
    }
    else{
        speed = 200;
        rounds = 35
        instructionDelay = 7000;
    }
    for (i=1; i<rounds; i++){

        var randInt = Math.floor(Math.random()*6 +1);
        switch (randInt)  // a permutation grid of all possible cup combinations.
        {
            case 1: // 123
                cup1.animate({left:p1}, speed, "linear");
                cup2.animate({left:p2}, speed, "linear");
                cup3.animate({left:p3}, speed, "linear");
                ball.animate({left:p2+132}, speed, "linear");
                break;
            case 2: // 132
                cup1.animate({left:p1}, speed, "linear");
                cup2.animate({left:p3}, speed, "linear");
                cup3.animate({left:p2}, speed, "linear");
                ball.animate({left:p3+132}, speed, "linear");
                break;
            case 3: // 213
                cup1.animate({left:p2}, speed, "linear");
                cup2.animate({left:p1}, speed, "linear");
                cup3.animate({left:p3}, speed, "linear");
                ball.animate({left:p1+132}, speed, "linear");
                break;
            case 4:  //231
                cup1.animate({left:p2}, speed, "linear");
                cup2.animate({left:p3}, speed, "linear");
                cup3.animate({left:p1}, speed, "linear");
                ball.animate({left:p3+132}, speed, "linear");
                break;
            case 5: // 312
                cup1.animate({left:p3}, speed, "linear");
                cup2.animate({left:p1}, speed, "linear");
                cup3.animate({left:p2}, speed, "linear");
                ball.animate({left:p1+132}, speed, "linear");
                break;
            case 6: // 321
                cup1.animate({left:p3}, speed, "linear");
                cup2.animate({left:p2}, speed, "linear");
                
                cup3.animate({left:p1}, speed, "linear");
                ball.animate({left:p2+132}, speed, "linear");
                break;
        }
    }

    // hide UI
    $("#difficulty").hide();
    $("label").hide();
    $("#shuffleCups").hide();
    shouldBeClickable = false;
    setTimeout( function(){
        shouldBeClickable = true;
        instructions.text("Now select the cup that has the ball!");
    },instructionDelay + 100);

    
});

// check cup event listeners and animations
cup1.on("click", function(){
    if (shouldBeClickable){
        cup1.animate({top:"-=100"}, "slow").delay(1500);    
        instructions.text("Incorrect!");
        cup1.animate({top:"+=100"}, "slow");
        console.log("Clicked instance");
        score = 0;
        $("#score").text(score);
        shouldBeClickable = false;
        restartGame();
    }

});
cup2.on("click", function(){
    if (shouldBeClickable){
        cup2.animate({top:"-=100"}, "slow").delay(1500);    
        instructions.text("Correct!");
        cup2.animate({top:"+=100"}, "slow");
        console.log("Victory Animation");
        shouldBeClickable = false;
        score+=1
        $("#score").text(score);
        restartGame();
    }

});
cup3.on("click", function(){
    if (shouldBeClickable) {
        cup3.animate({top:"-=100"}, "slow").delay(1500);    
        instructions.text("Incorrect!");
        cup3.animate({top:"+=100"}, "slow");
        shouldBeClickable = false;
        score = 0;
        $("#score").text(score);
        restartGame();
    }
});

function restartGame(){
    setTimeout( function() {
        $("#difficulty").show();
        $("label").show();
        $("#shuffleCups").show();
        instructions.text("Can you guess which cup the ball is in?");
    }, 2700);
}
});

// Difficulty controls
var slider = document.getElementById("difficulty")
        var difficulty = document.getElementById("difDisplay")
        slider.oninput = function() {

            difficulty.innerHTML = slider.value;
        }

var paddleLeft;
var paddleRight;
var pongBall;

var topWall;
var bottomWall;

var leftScore;
var rightScore;
function restart(){
    myGameArea.stop();
    loadGame();
}
function startGame(){
    pongBall.vectorX = parseInt(slider.value);
    pongBall.vectorY = parseInt(slider.value);
    leftInstructions.text = ""
    rightInstructions.text = ""
}

function loadGame() {
    leftInstructions = new component("20px", "Consolas", "#F1E4E8", 150,250, "text");
    leftInstructions.text = "Up: W \n Down: S"
    rightInstructions = new component("20px", "Consolas", "#F1E4E8", 650,250, "text")
    rightInstructions.text = "Up: ⇑ \n Down: ⇓"

    paddleLeft = new component(20, 100, "#587291", 10, 261);
    paddleRight = new component(20, 100, "#587291", 960,261);
    pongBall = new component( 20,20, "#96d8e5", 500,250);
    topWall = new component (1000, 5, "#EA526F", 0,50);
    bottomWall = new component(1000, 5, "#EA526F", 0, 450)
    leftScore = new component("30px", "Consolas", "#F1E4E8", 180, 40, "text", 0);
    rightScore = new component("30px", "Consolas", "#F1E4E8", 700, 40, "text", 0);
    myGameArea.start();
}

// general game area setup. 
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.timer = 0; // used to prevent instantaneous direction reversals
        this.interval = setInterval(updateGameArea, 15);// Speed that the game runs at

        // Keyboard Controls
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode]= true;
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        if (parseInt(leftScore.score) > parseInt(rightScore.score)){
            leftInstructions.text = "Left Wins!"
            leftInstructions.update();
        }
        else
        {
            rightInstructions.text = "Right Wins!"
            rightInstructions.update();
        }
        clearInterval(this.interval);
    },
    advanceTimer : function() {
        if (myGameArea.timer >0){
            myGameArea.timer -=1;
        }
    }
}

function component(width, height, color, x, y, type, score, timer=0) {
    this.type = type;
    this.score = score;
    this.width = width;
    this.height = height;
    this.vectorX = 0; // vector is for ball movement
    this.vectorY = 0;
    this.speedY = 0; // speed is for paddle movement   
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
        else {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.roundRect(this.x, this.y, this.width, this.height, 5);
            ctx.fill();
            // ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    // This moves the paddles. 
    this.newPos = function() {
        // this.x += this.speedX;
        this.y += this.speedY;       
        myGameArea.advanceTimer();
            
    }
    // change ball X direction
    this.changeVectX = function(){
        if (myGameArea.timer <=0 ){ // solution to double bounces
            if (this.vectorX < 0) 
            {rightScore.score +=1}
        else {leftScore.score +=1}
        this.vectorX *= -1;
        myGameArea.timer = 60; // solution to double bounces
        }

    } // invert y direction when bouncing off walls
    this.changeVectY = function(){
        this.vectorY *= -1;
    }
    // This moves the ball
    this.newPos2 = function(){ // rename this
        this.x -= this.vectorX;
        this.y += this.vectorY;

    }
    // checks for crash. 
    this.bounce = function(otherobj) { 
        var myleft = this.x;           
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    if (pongBall.x < 0 || pongBall.x >980 ) {
        myGameArea.stop();
        return;
    } 
    if (paddleLeft.bounce(pongBall))
    {
        pongBall.changeVectX();
    }
    if (topWall.bounce(pongBall) || bottomWall.bounce(pongBall))
    {
        pongBall.changeVectY();
    }
    if (paddleRight.bounce(pongBall)){
        pongBall.changeVectX();
    }
    myGameArea.clear();
    paddleLeft.speedY = 0;
    paddleRight.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[87] && paddleLeft.y >55) {paddleLeft.speedY = - parseInt(slider.value);}
    if (myGameArea.keys && myGameArea.keys[83] && paddleLeft.y+100 <450) {paddleLeft.speedY = parseInt(slider.value);}
    if (myGameArea.keys && myGameArea.keys[38] && paddleRight.y >55) {paddleRight.speedY = - parseInt(slider.value);}
    if (myGameArea.keys && myGameArea.keys[40] && paddleRight.y+100 <450) {paddleRight.speedY = parseInt(slider.value);}
    // update score boards
    leftScore.text="SCORE: " + leftScore.score;
    leftScore.update();
    rightScore.text="SCORE: " + rightScore.score;
    rightScore.update();

    // update paddle locations
    paddleLeft.newPos();    
    paddleLeft.update();
    paddleRight.newPos();
    paddleRight.update();
    // update pong location
    pongBall.newPos2();
    pongBall.update();
    // redraw walls
    topWall.update();
    bottomWall.update();
    // update instructions
    leftInstructions.update();
    rightInstructions.update();
}
// Some console.log statements have been left in for troubleshooting existing bugs.
// One list for stationary objects.
        // one list for moving objects. 
        var gameFloor;
        var gameOver = false;
        var firstObject;
        var score=0;
        var stationaryObjects = [];
        var movingObjects = [];
        const objectsToMove = [];
        const map = [
            ['0','0','0','0','0'],
            ['0','0','0','0','0'],
            ['0','0','0','0','0'],
            ['0','0','0','0','0'],
            ['0','0','0','0','0'],
            ['0','0','0','0','0'],
            ['0','0','0','0','0'],
            ['0','0','0','0','0']
        ];
        
        function loadGame(){
            // instantiate all game objects here.
            gameFloor = new block(0,500,"#F87666", 250, 50);
            gameCeiling = new block(0,150,"#F87666", 250, 2);
            firstObject = new block(100, 0, "#7DFDFE", 50, 50);
            movingObjects.push(firstObject);
            myGameArea.start();
        }

        function makeStationary(){
            for (i=0; i< movingObjects.length;i++){
                stationaryObjects.push(movingObjects[i])
                map[movingObjects[i].gridYValue][movingObjects[i].gridXValue] = '1';
            }
            movingObjects.length = 0;
            for (i=7; i>=0; i--){
                let fullRow = true;
                var fullRowIndex;
                var transferingRows= false;
                if(transferingRows== false){
                    for(n=0; n<5; n++){
                        // console.log(map[i][n])
                        if (map[i][n]== '0'){fullRow = false; fullRowIndex=n}
                        if (i==1 && map[i][n]== '1') {gameOver=true;}
                    }
                    if(fullRow == true){transferingRows = true;}
                }

                if (fullRow == true && transferingRows == true){
                    for(n=0; n<5; n++){
                        if(i>0){
                            map[i][n] = map[i-1][n];
                        }
                    }
                    for(s=0; s<stationaryObjects.length; s++){
                        if(stationaryObjects[s].gridYValue == 0){
                            stationaryObjects.splice(s,1);
                        }
                        else{
                            stationaryObjects[s].y +=50;
                            stationaryObjects[s].gridYValue +=1;
                        }
                    } 
                    score +=1;
                    document.getElementById("score").innerHTML = score;
                }
            }
            
            for (i in map){
                // console.log(map[i])
            }
        }
        
        function block(xInitPosition, yInitPosition, color, width, height){
            this.x = xInitPosition;
            this.y = yInitPosition;
            this.color = color;
            this.width = width;
            this.height = height;
            this.gridXValue = parseInt(xInitPosition)/50; // update this when it moves up or down.
            this.gridYValue = parseInt(yInitPosition)/50;         

            this.update = function () {
                ctx = myGameArea.context;
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.roundRect(this.x, this.y, this.width, this.height, 5);
                ctx.fill();
            };
            this.moveDown = function() {             // move the box down at the game speed.
                this.y += 50;
                this.gridYValue = (this.y-100)/50
            }
            this.moveLeft = function(){
                this.x -=50;
                this.gridXValue = this.x/50;
            }
            this.moveRight = function(){
                this.x +=50;
                this.gridXValue = this.x/50;
            }
        }
        

        // Game area is a dictionary
        var myGameArea = {
            canvas : document.createElement("canvas"),
            start: function() {
                this.canvas.width = 250;
                this.canvas.height = 550;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[6]);
                
                this.frameNo = 0;                                   // block move speed variable
                this.interval = setInterval(updateGameArea, 300);   // Game speed 
                this.timer = 0; // used to control horizontal speed.

                // Keyboard controls
                window.addEventListener('keydown', function(e){
                    myGameArea.key = e.keyCode;
                })
                window.addEventListener('keyup', function (e) {
                    myGameArea.key = false;
                })
            },
            // clear entire game board. 
            clear : function() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
            stop : function() {          // game over scenario
            clearInterval(this.interval) // reset interval count.
            },
            advanceTimer : function() {
                if (myGameArea.timer >0){
                    myGameArea.timer -=1;
                }
            }
        }

        function updateGameArea() {
            var collision = false;
            myGameArea.advanceTimer(); 
            for (i=0; i<movingObjects.length; i++){
                // CHECK VERTICAL COLLISION
                let xvar = parseInt(movingObjects[i].gridXValue);
                let yvar = parseInt(movingObjects[i].gridYValue);

                if(collision == false){
                    if (yvar == 7){
                        collision = true;
                        makeStationary(); 
                        break;
                    }
                    else if (map[yvar+1][xvar] != '0' && collision==false){
                        for (i in map){
                            // console.log("before: "+map[i])
                        }
                        collision = true;
                        makeStationary();                            
                    }
                }
            }
            myGameArea.clear();                                 // Clear game

            // KEYBOARD CONTROLS
            if (myGameArea.key && myGameArea.key == 37 && myGameArea.timer <=0){
                var onEdge = false;
                var nearBlock = false;
                // INSERT HORIZONTAL RULE HERE. 
                for(i=0; i<movingObjects.length; i++){
                    x= movingObjects[i].gridXValue;
                    y= movingObjects[i].gridYValue;
                    if (x == 0){
                        onEdge = true;
                    }
                    else if (map[y][x-1]=='1'){
                        nearBlock = true;
                    }
                }

                if (onEdge == false && nearBlock == false){
                    for (i = 0; i < movingObjects.length; i++){  // move blocks left
                    movingObjects[i].moveLeft();
                    }
                }
            }    

            if (myGameArea.key && myGameArea.key == 39 && myGameArea.timer <=0){ 
                var onEdge = false;
                var nearBlock = false;
                // INSERT HORIZONTAL RULE HERE. 
                for(i=0; i<movingObjects.length; i++){
                    x= movingObjects[i].gridXValue;
                    y= movingObjects[i].gridYValue;
                    if (x == 4){
                        onEdge = true;
                    }
                    else if (map[y][x+1]=='1'){
                        nearBlock = true;
                    }
                }

                if (onEdge == false && nearBlock==false){
                    for (i = 0; i < movingObjects.length; i++){  // move blocks right
                    movingObjects[i].moveRight();
                    }
                }
            }

            if (collision == false){                            // if collision is still false after checking all the objects, move objects.
                for (i = 0; i < movingObjects.length; i++){
                    movingObjects[i].moveDown();
                    movingObjects[i].update();
                }
            }

            // NEW OBJECT CREATION
            if (movingObjects.length == 0 && gameOver == false){
                const randInt = Math.floor(Math.random()*3 +1);
                switch(randInt){
                    case 1: 
                        movingObjects.push(new block(100, 0, "#7DFDFE", 50, 50));
                        break;
                    case 2:
                        movingObjects.push(new block(50, 0, "#7DFDFE", 50, 50));
                        movingObjects.push(new block(100, 0, "#7DFDFE", 50, 50));

                        break;
                    case 3: 
                        movingObjects.push(new block(100, 0, "#7DFDFE", 50, 50));
                        movingObjects.push(new block(100, 50, "#7DFDFE", 50, 50));

                        break;
                }
            }
            if(gameOver){
                document.getElementById("instructions").innerHTML = "You lose D:"
            }
            //UPDATE ALL OBJECTS (redraw them)
            
            for (i=0; i< stationaryObjects.length; i ++){
                stationaryObjects[i].update();
            }
            if ( movingObjects.length >0){
                for (i=0; i< movingObjects.length; i ++){
                movingObjects[i].update();
                }
            }
            gameFloor.update();
            gameCeiling.update();
        } 

        function everyinterval(n) { // block advances every n frames
            if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
            return false;
        }
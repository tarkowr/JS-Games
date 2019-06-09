const GameModes = Object.freeze({"BlockEasy":"BlockEasy", "BlockHard":"BlockHard", "BlockImpossible":"BlockImpossible", "BlockFlappy":"BlockFlappy"});
const GameKeys = Object.freeze({"UP":38, "DOWN":40, "SPACE":32});
const CanvasWidth = 720;
const CanvasHeight = 405;

window.addEventListener("load",function(event) {
    //
    // Game variables
    //
    let myGamePiece;
    let myObstacles = [];
    let myScore;
    let scoreValue = 0;
    let passedObstacles = [];
    let HS;
    let gameMode = GameModes.BlockEasy;

    //
    // Default Settings
    //
    let barMaxHeight = 300;
    let barMinHeight = 30;
    let barMaxGap = 140;
    let barMinGap = 140;

    let updateGameInterval = 10; //Milliseconds
    let addObstacleInterval = 100; //Milliseconds

    let barMovementSpeed = -3;

    let blockUpKey = -3;
    let blockDownKey = 3;

    let spacePress = -10;
    let gravity = .5;
    let gravitySpeed = .1;

    //
    // Game mode buttons
    //
    let easy = document.getElementById("startGameEasy");
    let hard = document.getElementById("startGameHard");
    let impossible = document.getElementById("startGameImpossible");
    let flappy = document.getElementById("startGameFlappy");

    //
    // Setup game variables and high score
    //
    function SetupGame(){
        AttachEventListeners(easy, GameModes.BlockEasy);
        AttachEventListeners(hard, GameModes.BlockHard);
        AttachEventListeners(impossible, GameModes.BlockImpossible);
        AttachEventListeners(flappy, GameModes.BlockFlappy);

        SetNullScoresToZero();
    }

    //
    // Add click event listener to game mode buttons
    //
    function AttachEventListeners(el, mode){
        if(el){
            el.addEventListener("click", function(){
                gameMode = mode;
                GameSettings(mode);
                startGame();
            });
        }
    }

    //
    // Apply settings based on game mode
    //
    function GameSettings(mode){
        switch(mode){
            case GameModes.BlockEasy:
                GameDifficultyEasy();
                break;
            case GameModes.BlockHard:
                GameDifficultyHard();
                break;
            case GameModes.BlockImpossible:
                GameDifficultyImpossible();
                break;
            default:
                GameDifficultyFlappy();
                break;
        }
    }

    //
    // Settings For Game Difficulty Easy
    //
    function GameDifficultyEasy(){
        barMaxGap = 140;
        barMinGap = 140;
        barMaxHeight = CanvasHeight-barMaxGap;
        barMinHeight = 30;

        updateGameInterval = 10; //Milliseconds
        addObstacleInterval = 100; //Milliseconds

        barMovementSpeed = -3;

        blockUpKey = -3;
        blockDownKey = 3;
    }

    //
    // Settings for Game Difficulty Hard
    //
    function GameDifficultyHard(){
        barMaxGap = 110;
        barMinGap = 110;
        barMaxHeight = CanvasHeight-barMaxGap;
        barMinHeight = 30;

        updateGameInterval = 10; //Milliseconds
        addObstacleInterval = 70; //Milliseconds

        barMovementSpeed = -4;

        blockUpKey = -4;
        blockDownKey = 4;
    }

    //
    // Settings for Game Difficulty Impossible
    //
    function GameDifficultyImpossible(){
        barMaxGap = 100;
        barMinGap = 100;
        barMaxHeight = CanvasHeight-barMaxGap;
        barMinHeight = 30;

        updateGameInterval = 10; //Milliseconds
        addObstacleInterval = 50; //Milliseconds

        barMovementSpeed = -5;

        blockUpKey = -5;
        blockDownKey = 5;
    }

    //
    // Settings for Game Difficulty Flappy
    //
    function GameDifficultyFlappy(){
        barMaxGap = 160;
        barMinGap = 160;
        barMaxHeight = CanvasHeight-barMaxGap;
        barMinHeight = 30;

        updateGameInterval = 10; //Milliseconds
        addObstacleInterval = 100; //Milliseconds

        barMovementSpeed = -3;

        spacePress = -6;
        gravity = 0;
        gravitySpeed = .08;
    }

    SetupGame();

    //
    // Add Event Listeners
    //
    let reload = document.getElementById("exit");
    if(reload){
        reload.addEventListener("click", function(){
            reloadPage();
        });
    }

    let restart = document.getElementById("restart");
    if(restart){
        restart.addEventListener("click", function(){
            restartGame();
        });
    }

    //
    // Execute When Game Starts
    //
    function startGame() {
        myGamePiece = new component(45, 45, "#f43030", 75, 180); // Instantiate new Game Component -- 30,30
        myScore = new component("30px", "Consolas", "black", 500, 80, "text");
        HS = new component("30px", "Consolas", "black", 418, 40, "text");
        countDown = new component("120px", "Consolas", "#282828", 340, 240, "text");

        HideNonGameElements();

        myGameArea.start();
    }

    //
    // Hide HTML elements that should not display during the game
    //
    function HideNonGameElements(){
        document.getElementById("startGameEasy").style.display = "none";
        document.getElementById("startGameHard").style.display = "none";
        document.getElementById("startGameImpossible").style.display = "none";
        document.getElementById("startGameFlappy").style.display = "none";
        document.getElementById("instruction").style.display = "none";
        document.getElementById("exit").style.display = "none";
        document.getElementById("restart").style.display = "none";
    }

    //
    //Create the Canvas
    //
    let myGameArea = {

        canvas : document.createElement("canvas"), //Canvas Object

        //
        // Setup the Game
        //
        start : function() {
            this.canvas.width = CanvasWidth;
            this.canvas.height = CanvasHeight;
            this.context = this.canvas.getContext("2d");
            document.getElementById("game-board").appendChild(this.canvas);
            this.frameNo = 0; // Count frames
            this.interval = setInterval(updateGameArea, updateGameInterval); // Runs function updateGameArea X times a second
                        
            //
            //Change Y-Pos based on Key Press
            //
            window.addEventListener('keydown', function (e) {
                myGameArea.key = e.keyCode;
            });
            window.addEventListener('keyup', function (e) {
                myGameArea.key = false;
            });
        },

        //
        // Clear the Screen to re-draw
        //
        clear : function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

        //
        // Stop the Game
        //
        stop : function() {
            clearInterval(this.interval);
        }
    }

        //
        // Restart Game
        //
        function restartGame(){
            myGameArea.clear();
            for(member in myGamePiece) delete myGamePiece[member];
            myObstacles = [];
            passedObstacles = [];
            myScore = "";
            scoreValue = 0;
            gravity = 0;
            startGame();
        }

    //
    // Frame Tracker
    // Returns true if the current framenumber (frameNo) corresponds with the given interval (n)
    //
    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }

    //
    //Constructor method for the game piece
    //
    function component(width, height, color, x, y, type) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedY = 0;
        this.x = x;
        this.y = y;    

        //
        // Update GamePiece and Score
        //
        this.update = function() {
            ctx = myGameArea.context;
            //Score
            if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } 
            //GamePiece
            else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }

        //
        // Update Game Piece New Position
        //
        this.newPos = function() {
            this.y += this.speedY; 
        } 

        //
        // Check if Player has Crashed
        //
        this.crashWith = function(otherobj) {
            let myleft = this.x;
            let myright = this.x + (this.width);
            let mytop = this.y;
            let mybottom = this.y + (this.height);
            let otherleft = otherobj.x;
            let otherright = otherobj.x + (otherobj.width);
            let othertop = otherobj.y;
            let otherbottom = otherobj.y + (otherobj.height);
            let crash = true;
            if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
            crash = false;
        }

        //
        // If game piece hits bounds
        //
        if(this.y<0 || this.y>360){
            crash = true;
        }
        return crash;
    }
    }

    //
    // Clear screen and re-draw when called
    //
    function updateGameArea() {
        let x, height, gap, minHeight, maxHeight, minGap, maxGap;

        //
        // Check if Player Crashed
        //
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();

                //
                // Set new high score
                //
                if(window.localStorage){
                    CheckForNewHighScore(gameMode, scoreValue);
                }

                //
                // Display Exit Button
                //
                document.getElementById("exit").style.display = "inline-block";
                document.getElementById("exit").style.margin = "0 auto";
                document.getElementById("exit").style.marginTop = "15px";

                //
                // Display Restart Button
                //
                document.getElementById("restart").style.display = "inline-block";
                document.getElementById("restart").style.margin = "0 auto";
                document.getElementById("restart").style.margin = "15px";

                return;
            } 
        }

        //
        // Clear Screen and Add 1 to Frame Count
        //
        myGameArea.clear(); 
        myGameArea.frameNo += 1;

        //
        // Add a new Obstacle to the game on Interval
        //
        if (myGameArea.frameNo == 1 || everyinterval(addObstacleInterval)) {
            x = myGameArea.canvas.width;
            minHeight = barMinHeight;
            maxHeight = barMaxHeight;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = barMinGap;
            maxGap = barMaxGap;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

            myObstacles.push(new component(20, height, "#4286f4", x, 0));
            myObstacles.push(new component(20, x - height - gap, "#4286f4", x, height + gap));
        }

        //
        // Change Obstacle Position
        //
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += barMovementSpeed;

            //
            // Add passed obstacles to an array to track player score
            //
            if(myGamePiece.x > myObstacles[i].x && !passedObstacles.includes(myObstacles[i])){
                passedObstacles.push(myObstacles[i]);
                scoreValue +=.5; // Two bars are passed at the same time
            }
            myObstacles[i].update();
        }
        
        myGamePiece.speedY = 0;

        //
        // Change game piece Y movement based on arrow keys
        //
        if(gameMode != GameModes.BlockFlappy){
            if (myGameArea.key && myGameArea.key == GameKeys.UP) {
                myGamePiece.speedY = blockUpKey; 
            }
            else if (myGameArea.key && myGameArea.key == GameKeys.DOWN) {
                myGamePiece.speedY = blockDownKey; 
            }
        }
        else{
            if (myGameArea.key && myGameArea.key == GameKeys.SPACE) {
                myGamePiece.speedY = spacePress;
                gravity = .5; //Reset Gravity to Original Pull Effect
            }
            else {
                myGamePiece.speedY = gravity; //Apply Gravity
                gravity = gravity + gravitySpeed; //Add to Gravity Pull Effect
            }
        }

        //
        // Display High Score and current score
        //
        if(window.localStorage){
            HS.text = "HIGH SCORE: " + GetScoreByName(gameMode);
            HS.update();
        }

        myScore.text = "SCORE: " + scoreValue;
        myScore.update();

        myGamePiece.newPos(); //Update New Position
        myGamePiece.update(); //Update Game
    }

    //
    // Reload the page
    //
    function reloadPage(){
        location.reload();
    }
});
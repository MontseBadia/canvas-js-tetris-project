'use strict'

function main () {

  // var h1 = null;
  var button = null;
  var game = null;
  var canvas = null;
  var score = null;
  var lines = null;
  var level = null;
  var tetrisLogo = null;
  var gameOver = null;
  var counterGameOver = 0;
  var container = null;
  var mainAudio = null;
  var instructions = null;
  var btnInst = null;
  var instructionsContent = null;
  // var lineAudio = null;
  // var linesText = null;
  // var scoreText = null;
  // var gameOverAudio = null;

  function createSplashScreen () {
    // h1 = document.createElement("h1");
    // h1.innerHTML = "IRON TETRIS"
    // h1.setAttribute("id", "title");
    // container.appendChild(h1);
    container = document.getElementById("main-container")
    container.setAttribute("class", "container");

    btnInst = document.getElementById("btn-inst");
    btnInst.setAttribute("class", "btn-inst");

    button = document.createElement("button");
    button.innerHTML = "START";
    button.setAttribute("class", "button")
    btnInst.appendChild(button);
    button.addEventListener("click", moveToGame);

    instructions = document.createElement("p");
    instructions.innerHTML = "Instructions: ";
    instructions.setAttribute("class", "instructions");
    btnInst.appendChild(instructions);

    instructionsContent = document.createElement("p");
    instructionsContent.innerHTML = "Press ⇦ to move left     Press ⇨ to move right";
    instructionsContent.setAttribute("class", "instructionsContent");
    btnInst.appendChild(instructionsContent);

    gameOver = document.getElementById("gif");
    gameOver.remove()
  }
  
  function moveToGame () {
    gameOver.remove();
    button.remove();
    createGame();
  }

  function handleKeyUp (event) {
    for (var ix = 0; ix < game.squares.length; ix++) {      
      if (game.squares[ix].statusBottom != "stop"){
        // console.log(game.squares[ix].statusRight)
        if (game.squares[ix].statusRight != "stop") {
          if (event.keyCode === 39) {
            game.squares[ix].clearSquare();
            game.squares[ix].moveRight();
          } 
        }
        game.squares[ix].statusRight = "moving";
        if (game.squares[ix].statusLeft != "stop") {
          if (event.keyCode === 37) {
            game.squares[ix].clearSquare();
            game.squares[ix].moveLeft();
          }
        }
        game.squares[ix].statusLeft = "moving";
      }  
    }
  }
  
  function createGame () {
    
    if (document.getElementById("game-over")) {
      document.getElementById("game-over").remove();
    }
    if(counterGameOver !== 0) {
      container = document.getElementById("main-container");
      container.setAttribute("class", "container");
      lines.remove();
      score.remove();
      level.remove();
    }
    container = document.getElementById("main-container")

    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "myCanvas");
    canvas.setAttribute("width", "300");
    canvas.setAttribute("height", "450");
    container.appendChild(canvas);

    lines = document.createElement("h2");
    lines.setAttribute("class", "lines");
    lines.setAttribute("id", "lines");
    lines.innerHTML = "Lines:  0"
    container.appendChild(lines);
    
    score = document.createElement("h2");
    score.setAttribute("class", "score");
    score.setAttribute("id", "score");
    score.innerHTML = "Score:  0"
    container.appendChild(score);

    level = document.createElement("h2");
    level.setAttribute("class", "level");
    level.setAttribute("id", "level");
    level.innerHTML = "Level:  0"
    container.appendChild(level);

    if(counterGameOver===0){
      tetrisLogo = document.getElementById("tetris-logo");
      tetrisLogo.remove();
    }

    button.remove();
    gameOver.remove();
    instructions.remove();
    instructionsContent.remove();

    var ctxCanvas = canvas.getContext("2d");

    game = new Game(ctxCanvas, canvas, endGame);
    mainAudio = new Audio ("mp3/tetris-soundtrack.mp3");
    mainAudio.play();

    window.addEventListener("keyup", handleKeyUp);

    // setTimeout(function() {
    //   endGame();
    // }, 2000);
  }
  
  function endGame() {
    canvas = document.getElementById("myCanvas");
    canvas.remove();
    // lines.remove();
    // score.remove();
    mainAudio.pause();
    createGameOver();
  }
  
  function createGameOver() {
    // var h1 = document.createElement("h1");
    // h1.setAttribute("id", "game-over");
    // h1.innerHTML = "GAME OVER!!!"
    // container.appendChild(h1);
    
    container.appendChild(gameOver);

    lines.removeAttribute("class");
    lines.setAttribute("class", "lines-game-over");
    score.removeAttribute("class");
    score.setAttribute("class", "score-game-over");
    level.removeAttribute("class");
    level.setAttribute("class", "level-game-over");

    button = document.createElement("button");
    button.innerHTML = "RESTART";
    container.appendChild(button);
    button.setAttribute("class", "button2");
    button.addEventListener("click", moveToGame);

    container.removeAttribute("class");

    counterGameOver += 1;

    // gameOverAudio = new Audio ("game-over-soundtrack.mp3");
    // gameOverAudio.play();
  }
  
  createSplashScreen();

}

window.addEventListener("load", main);
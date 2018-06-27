'use strict'

function main () {

  var h1 = null;
  var button = null;
  var game = null;
  var canvas = null;
  var score = null;
  var lines = null;
  var tetrisLogo = null;
  var gameOver = null;

  function createSplashScreen () {
    // h1 = document.createElement("h1");
    // h1.innerHTML = "IRON TETRIS"
    // h1.setAttribute("id", "title");
    // container.appendChild(h1);
    button = document.createElement("button");
    button.innerHTML = "START";
    button.setAttribute("class", "button")
    container.appendChild(button);
    button.addEventListener("click", moveToGame);

    gameOver = document.getElementById("gif");
    gameOver.remove()
  }
  
  function moveToGame () {
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
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "myCanvas");
    canvas.setAttribute("width", "300");
    canvas.setAttribute("height", "450");
    container.appendChild(canvas);

    lines = document.createElement("h2");
    lines.setAttribute("id", "lines");
    lines.innerHTML = "Lines:  0"
    container.appendChild(lines);
    
    score = document.createElement("h2");
    score.setAttribute("id", "score");
    score.innerHTML = "Score:  0"
    container.appendChild(score);

    tetrisLogo = document.getElementById("tetris-logo");
    tetrisLogo.remove();
    button.remove();
    gameOver.remove()

    var ctxCanvas = canvas.getContext("2d");

    game = new Game(ctxCanvas, canvas, endGame);
    window.addEventListener("keyup", handleKeyUp);

    // setTimeout(function() {
    //   endGame();
    // }, 2000);
  }
  
  function endGame() {
    canvas = document.getElementById("myCanvas");
    canvas.remove();
    lines.remove();
    score.remove();
    createGameOver();
  }
  
  function createGameOver() {
    // var h1 = document.createElement("h1");
    // h1.setAttribute("id", "game-over");
    // h1.innerHTML = "GAME OVER!!!"
    // container.appendChild(h1);
    
    container.appendChild(gameOver);

    button = document.createElement("button");
    button.innerHTML = "RESTART";
    container.appendChild(button);
    button.setAttribute("class", "button2");
    button.addEventListener("click", moveToGame);

    container.removeAttribute("id");
    
  }
  
  createSplashScreen();

}

window.addEventListener("load", main);
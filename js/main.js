'use strict'

function main () {

  var button = null;
  var game = null;

  function createSplashScreen () {
    var h1 = document.createElement("h1");
    h1.innerHTML = "IRONHACK TETRIS"
    container.appendChild(h1);
    button = document.createElement("button");
    button.innerHTML = "CLICK TO START!";
    container.appendChild(button);
    button.addEventListener("click", moveToGame);
  }
  
  function moveToGame () {
    button.remove();
    createGame();
  }

  function handleKeyUp (event) {
    for (var ix = 0; ix < game.squares.length; ix++) {      
      if (game.squares[ix].statusBottom != "stop"){
        console.log(game.squares[ix].statusRight)
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
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "myCanvas");
    container.appendChild(canvas);
    var ctxCanvas = canvas.getContext("2d");

    game = new Game(ctxCanvas, canvas);
    window.addEventListener("keyup", handleKeyUp);

    // setTimeout(function() {
    //   endGame();
    // }, 2000);
  }
  
  function endGame() {
    document.getElementById("myCanvas").remove();
    createGameOver();
  }
  
  function createGameOver() {
    var h1 = document.createElement("h1");
    h1.setAttribute("id", "game-over");
    h1.innerHTML = "GAME OVER!!!"
    container.appendChild(h1);
    button = document.createElement("button");
    button.innerHTML = "RESTART THE GAME";
    container.appendChild(button);
    button.addEventListener("click", moveToGame);
  }
  
  createSplashScreen();

}

window.addEventListener("load", main);
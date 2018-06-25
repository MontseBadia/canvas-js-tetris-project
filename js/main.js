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
    if (event.keyCode === 39) {
      game.squares[0].clearSquare();
      game.squares[0].moveRight();
    } else if (event.keyCode === 37) {
      game.squares[0].clearSquare();
      game.squares[0].moveLeft();
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
    console.log(game)
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
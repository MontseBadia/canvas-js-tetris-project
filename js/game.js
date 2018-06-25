'use strict'

function Game (ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.size = {
    width: canvas.width,
    height: canvas.height
  }
  this.isEnded = null;
  this.squares = [];
  this.doFrame();
}

Game.prototype.drawSquares = function () {
  var self = this;
  if (self.squares.length === 0) {
    var newSquare = new Square (self.ctx);
    self.squares.push(newSquare);
  }  
}

Game.prototype.doFrame = function () {
  var self = this;
  self.drawSquares();
  self.squares.forEach(function (item) {
    item.clearSquare();
    item.moveDown(self.canvas);
    item.draw();
  });

  window.requestAnimationFrame(function () {
    self.doFrame();
  })
}
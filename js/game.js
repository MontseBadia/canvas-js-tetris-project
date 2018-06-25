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

Game.prototype.checkCollisions = function (element) {
  var self = this;
  self.squares.forEach(function (item) {
    if (element != item){ //so that it does not run into the same element
      if (element.position.x === item.position.x && element.position.y + element.size.height === item.position.y) {
        element.status = "stop";
      }
    }
  })
}

Game.prototype.drawSquares = function () {
  var self = this;
  if (self.squares.length === 0) {
    self.squares.push(new Square (self.ctx, self.canvas));
  } else if (self.squares[self.squares.length-1].status === "stop") {
    self.squares.push(new Square (self.ctx, self.canvas));
  }
}

Game.prototype.doFrame = function () {
  var self = this;
  self.drawSquares();
  self.squares.forEach(function (item) {
    item.clearSquare();
    self.checkCollisions(item);
    item.moveDown();
    item.draw();
  });

  window.requestAnimationFrame(function () {
    self.doFrame();
  })
}
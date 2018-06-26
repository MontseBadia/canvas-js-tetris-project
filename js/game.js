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
    if (element != item){ //so that it does not run into the same element --> can be deleted ?
      if (element.position.x === item.position.x && element.position.y + element.size.height === item.position.y) {
        element.statusBottom = "stop";
      }
    }
  })
}

Game.prototype.checkRightCollisions = function (element) {
  var self = this;
  self.squares.forEach(function (item) {
    if (element != item) {
      if (element.position.y + element.size.height >= item.position.y && element.position.x + element.size.width === item.position.x) {
        element.statusRight = "stop";
      }
    }  
  })
}

Game.prototype.checkLeftCollisions = function (element) {
  var self = this;
  self.squares.forEach(function (item) {
    if (element != item) {
      if (element.position.y + element.size.height >= item.position.y && element.position.x === item.position.x + item.size.width) {
        element.statusLeft = "stop";
      }
    }  
  })
}

Game.prototype.drawSquares = function () {
  var self = this;
  if (self.squares.length === 0) {
    self.squares.push(new Square (self.ctx, self.canvas));
  } else if (self.squares[self.squares.length-1].statusBottom === "stop") {
    self.squares.push(new Square (self.ctx, self.canvas));
  }
}

Game.prototype.doFrame = function () {
  var self = this;
  self.drawSquares();
  self.squares.forEach(function (item) {
    item.clearSquare();
    self.checkRightCollisions(item);
    self.checkLeftCollisions(item);
    self.checkCollisions(item);
    item.moveDown();
    item.draw();
  })

  // setTimeout(function(){
    window.requestAnimationFrame(function () {
      self.doFrame();
    })
  // }, 700)

}
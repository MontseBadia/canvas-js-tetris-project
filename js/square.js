'use strict'

function Square (ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.size = {
    width: 30,  
    height: 10
  };
  this.position = {
    x: 0,
    y: 0
  };
};

Square.prototype.clearSquare = function () {
  var self = this;
  self.ctx.clearRect(self.position.x, self.position.y, self.size.width, self.size.height);
}

Square.prototype.draw = function () {
  var self = this;
  self.ctx.fillStyle = "red";
  self.ctx.fillRect(self.position.x, self.position.y, self.size.width, self.size.height);
}

Square.prototype.moveDown = function () {
  var self = this;
  if (self.position.y + self.size.height <= self.canvas.height){ //checks collision with bottom line
    self.position.y += 1;
  }
}

Square.prototype.moveRight = function () {
  var self = this;
  if (self.position.x + self.size.width < self.canvas.width && self.position.y + self.size.height <= self.canvas.height){ //checks collision with right side of canvas 
    self.position.x += 30;
  }  
}

Square.prototype.moveLeft = function () { //checks collision with left side of canvas
  var self = this;
  if (self.position.x > 0 && self.position.y + self.size.height <= self.canvas.height) {
    self.position.x -= 30;
  }
}
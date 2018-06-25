'use strict'

function Square (ctx) {
  this.ctx = ctx;
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

Square.prototype.moveDown = function (canvas) {
  var self = this;
  if (self.position.y + self.size.height <= canvas.height){
    self.position.y += 1;
  }
}

Square.prototype.moveRight = function () {
  var self = this;
  self.position.x += 30;
}

Square.prototype.moveLeft = function () {
  var self = this;
  self.position.x -= 30;
}
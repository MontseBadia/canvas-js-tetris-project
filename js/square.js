'use strict'

var possibleX = [];
var ix=0;
while (ix<=300-10) {
  possibleX.push(ix);
  ix += 30
}

function Square (ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.size = {
    width: 30,  
    height: 10
  };
  this.position = {
    x: possibleX[Math.floor(Math.random()*possibleX.length)],
    y: 0
  };
  this.status = "moving";
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
  if (self.status != "stop") {
    if (self.position.y + self.size.height <= self.canvas.height){ //checks collision with bottom line
      self.position.y += 1;
    } else {
      self.status = "stop";
    }
  }  
}

Square.prototype.moveRight = function () {
  var self = this;
  if (self.status != "stop") {
    if (self.position.x + self.size.width < self.canvas.width && self.position.y + self.size.height <= self.canvas.height){ //checks collision with right side of canvas && bottom
      self.position.x += 30;
    }  
  }
}

Square.prototype.moveLeft = function () { //checks collision with left side of canvas
  var self = this;
  if (self.status != "stop") {
    if (self.position.x > 0 && self.position.y + self.size.height <= self.canvas.height) {
      self.position.x -= 30;
    }
  }  
}
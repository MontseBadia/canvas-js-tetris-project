'use strict'

//creates array of possible position "x" values for squares to start off at
var possibleX = [];
var ix = 0;
while (ix <= 300 - 10) {
  possibleX.push(ix);
  ix += 30
}

function Square (ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.size = {
    width: 30,  
    height: 30
  };
  this.position = {
    x: possibleX[Math.floor(Math.random()*possibleX.length)],
    y: 0
  };
  this.statusBottom = "moving";
  this.statusLeft = "moving";
  this.statusRight = "moving";
  this.statusLine = "on"; //"off" is to make sure a square has been pushed inside a line
  this.relocation = "no";
  this.speed = 5;
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

Square.prototype.checkBottomCollision = function () {
  var self = this;
  return self.position.y + self.size.height < self.canvas.height ? false : true;
}

Square.prototype.checkRightCollision = function () {
  var self = this;
  return self.position.x + self.size.width < self.canvas.width ? false : true;
}

Square.prototype.checkLeftCollision = function () {
  var self = this;
  return self.position.x > 0 && self.position.y + self.size.height <= self.canvas.height ? false : true;
}

Square.prototype.moveDown = function () {
  var self = this;
  if (self.statusBottom != "stop") {
    if (!self.checkBottomCollision()){
      self.position.y += self.speed;
    } else {
      self.statusBottom = "stop";
    }
  }  
}

Square.prototype.moveRight = function () {
  var self = this;
  if (self.statusBottom != "stop") {
    if (!self.checkRightCollision() && !self.checkBottomCollision()){ 
      self.position.x += 30;
    }  
  }
}

Square.prototype.moveLeft = function () { //checks collision with left side of canvas
  var self = this;
  if (self.statusBottom != "stop") {
    if (!self.checkLeftCollision()) {
      self.position.x -= 30;
    }
  }  
}
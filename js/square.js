'use strict'

function Square (ctx, canvas, speed) {

  this.ctx = ctx;
  this.canvas = canvas;
  this.size = {
    width: 30,  
    height: 30
  };
  this.position = {
    x: 120,
    y: 0
  };
  this.statusBottom = "moving";
  this.statusLeft = "moving";
  this.statusRight = "moving";
  this.statusLine = "on"; //"off" is to make sure a square has been pushed inside a line
  this.deleted = false;
  this.speed = speed;
  this.squareImageGreen = new Image ();
  this.squareImageGreen.src = "img/green-square.png";
  this.squareImageYellow = new Image ();
  this.squareImageYellow.src = "img/yellow-square.png";

};

Square.prototype.clearSquare = function () {

  var self = this;
  self.ctx.clearRect(self.position.x, self.position.y, self.size.width, self.size.height);
}


Square.prototype.draw = function () {

  var self = this;
  if (Math.floor(Math.random() * 2) === 1){
    self.ctx.drawImage(self.squareImageGreen,  self.position.x, self.position.y, self.size.width, self.size.height);
  }else {
    self.ctx.drawImage(self.squareImageYellow,  self.position.x, self.position.y, self.size.width, self.size.height);
  }

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
      self.position.y = self.canvas.height - self.size.height
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
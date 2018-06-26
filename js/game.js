'use strict'

function Game (ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.size = {
    width: canvas.width,
    height: canvas.height
  }
  this.grid = {
    lineOne: [],
    lineTwo: [],
    lineThree: [],
    lineFour: [],
    lineFive: [],
    lineSix: [],
    lineSeven: [],
    lineEight: [],
    lineNine: [],
    lineTen: [],
    lineEleven: [],
    lineTwelve: [],
    lineThirteen: [],
    lineFourteen: [],
    lineFifteen: []
  }
  this.isEnded = null;
  this.squares = [];
  this.doFrame();
}

Game.prototype.deleteCompletedLines = function () {
  // var self = this;
  // Object.values(self.grid).forEach(function(value){
  //   value.forEach(function(element){
  //     self.squares.forEach(function(item){
  //       if (item === element) {
  //         item.clearSquare();
  //       }
  //     })
  //   })  
  // })
}

Game.prototype.checkCompletedLines = function () {
  var self = this;
  Object.values(self.grid).forEach(function(item){
    if (item.length === 10) {
      console.log("completed line")
      item.push("0");
    }
  })
}

Game.prototype.createLinesArray = function () {
  var self = this;
  self.squares.forEach(function (item) {
    if (item.statusBottom === "stop" && item.statusLine != "off") {
      switch (item.position.y) {
        case self.canvas.height - item.size.height:
        self.grid.lineOne.push(item)
        break;
        case self.canvas.height - 2 * item.size.height:
        self.grid.lineTwo.push(item)
        break;
        case self.canvas.height - 3 * item.size.height:
        self.grid.lineThree.push(item)
        break;
        case self.canvas.height - 4 * item.size.height:
        self.grid.lineFour.push(item)
        break;
        case self.canvas.height - 5 * item.size.height:
        self.grid.lineFive.push(item)
        break;
        case self.canvas.height - 6 * item.size.height:
        self.grid.lineSix.push(item)
        break;
        case self.canvas.height - 7 * item.size.height:
        self.grid.lineSeven.push(item)
        break;
        case self.canvas.height - 8 * item.size.height:
        self.grid.lineEight.push(item)
        break;
        case self.canvas.height - 9 * item.size.height:
        self.grid.lineNine.push(item)
        break;
        case self.canvas.height - 10 * item.size.height:
        self.grid.lineTen.push(item)
        break;
        case self.canvas.height - 11 * item.size.height:
        self.grid.lineEleven.push(item)
        break;
        case self.canvas.height - 12 * item.size.height:
        self.grid.lineTwelve.push(item)
        break;
        case self.canvas.height - 13 * item.size.height:
        self.grid.lineThirteen.push(item)
        break;
        case self.canvas.height - 14 * item.size.height:
        self.grid.lineFourteen.push(item)
        break;
        case self.canvas.height - 15 * item.size.height:
        self.grid.lineFifteen.push(item)
        break;
      }
      item.statusLine = "off";
    }
  })
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
    self.createLinesArray();
    self.checkCompletedLines();
    self.deleteCompletedLines();
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
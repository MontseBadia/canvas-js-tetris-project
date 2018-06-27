'use strict'

function Game (ctx, canvas, cb) {
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
  this.deletedLine = "no"; //to make sure it does not relocate squares without end
  this.callback = cb;
  this.isEnded = false;
  this.squares = [];
  this.doFrame();
}

var countLines = 0;

Game.prototype.checkIfEnded = function () {
  var self = this;
  self.squares.forEach(function(item){
    if(item.position.y === 0 && item.statusBottom === "stop"){
      self.isEnded = true;
      self.callback();
    }
  })
}

Game.prototype.relocateSquares = function () {
  var self = this;
  if (self.deletedLine === "yes") {
    self.squares.forEach(function(item) {
      if (item.statusBottom === "stop") {
        item.clearSquare();
        item.position.y += item.size.height
        item.draw()
      }
    })
    self.grid.lineOne = self.grid.lineTwo;
    self.grid.lineTwo = self.grid.lineThree;
    self.grid.lineThree = self.grid.lineFour;
    self.grid.lineFour =  self.grid.lineFive;
    self.grid.lineFive = self.grid.lineSix;
    self.grid.lineSix = self.grid.lineSeven;
    self.grid.lineSeven = self.grid.lineEight;
    self.grid.lineEight = self.grid.lineNine;
    self.grid.lineNine = self.grid.lineTen;
    self.grid.lineTen = self.grid.lineEleven;
    self.grid.lineEleven = self.grid.lineTwelve;
    self.grid.lineTwelve = self.grid.lineThirteen;
    self.grid.lineThirteen = self.grid.lineFourteen;
    self.grid.lineFourteen = self.grid.lineFifteen;
    self.grid.lineFifteen = [];
  }  
}

Game.prototype.deleteCompletedLines = function () {
  var self = this;
  self.deletedLine = "no";
  var value= null;
  // var indexElementsToDelete = [];

  Object.keys(self.grid).forEach(function(key){
    value = self.grid[key];
    if (value.length === 11) {
      value.forEach(function(element){
        self.squares.forEach(function(item, index){
          if (item === element) {
            // indexElementsToDelete.push(index)
            // console.log(self.squares.splice(index, 0))
            // self.squares.splice(index, 0);
            // console.log(self.squares)
            self.deletedLine = "yes";
            item.deleted = true;
          }
        })
      })
      for(var j=self.squares.length-1; j>=0; j--){
        if(self.squares[j].deleted === true){
          self.squares[j].clearSquare();
          self.squares.splice(j, 1)
        }
      }
      // console.log(self.squares)
      value = []; //so that line value is empty again
      if (self.deletedLine === "yes") {
        countLines += 1;
        lines.innerHTML = "Lines:  " + countLines;
        score.innerHTML = "Score:  " + countLines * 100;
      }
      // console.log("deleted line: "+ countLines)
    } 
  })
}

Game.prototype.checkCompletedLines = function () {
  var self = this;
  var value = null;

  Object.keys(self.grid).forEach(function(key){
    value = self.grid[key];
    if (value.length === 10) {
      // console.log("completed line")
      value.push("0");
    }
  })
}

Game.prototype.createLinesArray = function () {
  var self = this;
  self.squares.forEach(function (item) {
    // console.log(item)
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
      if (item.statusLine === "off") {  console.log(self.grid)      }
    }
  })
}

Game.prototype.checkCollisions = function (element) { //bottom collision between squares
  var self = this;
  self.squares.forEach(function (item) {
    if (element != item){ //so that it does not run into the same element --> can be deleted ?
      if (element.position.x === item.position.x && element.position.y + element.size.height >= item.position.y) {
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
    console.log(self.squares.length)
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
    self.createLinesArray();
    self.checkCompletedLines();
    self.deleteCompletedLines();
    self.relocateSquares();
    self.checkIfEnded();
    // item.draw();

  })

  // setTimeout(function(){
    window.requestAnimationFrame(function () {
      self.doFrame();
    })
  // }, 700)

}
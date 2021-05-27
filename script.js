var s, b, i, j, cellsize, sum

s = 6
//Number of cells each side of grid
b = 4
//Number of bombs
cellsize = 30
//Size of each cell in pixels

var canvas = document.getElementById('myCanvas');
    var board = canvas.getContext('2d');
    board.font = "20px Arial"
//Sets up the drawing area and the text size

var Cell = function(x, y) {
    this.x = x;
    this.y = y;
};
//Function for printing a single cell

Cell.prototype.draw = function() {
    board.rect(this.x, this.y, cellsize, cellsize);
};
//Rule for drawing a cell

var cells = [];
var vals = [];
var adjs = [];
for (i = 0; i < s; i++) {
    for (j = 0; j < s; j++) {
        var spaceX = j * (cellsize + 5) + 10;
        var spaceY = i * (cellsize + 5) + 10;
        cells.push(new Cell(spaceX, spaceY));
        vals[i * s + j] = 0;
    }
}
//Writes the cells[] array for the geometry of every cell

function randInt(x) {
    var z
    z = Math.floor(Math.random() * x);
    return z
}
//Function used for picking a random number

i = 0
while (i < b) {
    y = randInt(s * s)
        if (vals[y] === 0) {
            vals[y] = 1;
            i++;
    }
}
//This places the bombs in random cells of the grid

for (i = 0; i < cells.length; i++) {
//    if (vals[i] === 0) {
        cells[i].draw();
        board.stroke();
//    } else {
//   }
}
//Draws the cells on the board
//Cells have been removed tha reveal the bomb locations


for (i = 0; i < cells.length; i++) {
    if (i === 0) {
        sum = checkR(i);
        sum += checkD(i);
        sum += checkDR(i);
    } else if (i === (s - 1)) {
        sum = checkL(i);
        sum += checkDL(i);
        sum += checkD(i);
    } else if (i === s * (s - 1)) {
        sum = checkU(i);
        sum += checkUR(i);
        sum += checkR(i);
    } else if (i === s * s - 1) {
        sum = checkUL(i);
        sum += checkU(i);
        sum += checkL(i);
    } else if (i < (s - 1)) {
        sum = checkL(i);
        sum += checkR(i);
        sum += checkDL(i);        
        sum += checkD(i);
        sum += checkDR(i);    
    } else if (i % s === 0) {
        sum = checkU(i);
        sum += checkUR(i);
        sum += checkR(i);
        sum += checkD(i);
        sum += checkDR(i);
    } else if ((i + 1) % s === 0) {
        sum = checkUL(i);
        sum += checkU(i);
        sum += checkL(i);
        sum += checkDL(i);
        sum += checkD(i);
    } else if (i > s * (s -1)) {
        sum = checkUL(i);
        sum += checkU(i);
        sum += checkUR(i);
        sum += checkL(i);
        sum += checkR(i);
    } else {
        sum = checkUL(i);
        sum += checkU(i);
        sum += checkUR(i);
        sum += checkL(i);
        sum += checkR(i);
        sum += checkDL(i);
        sum += checkD(i);
        sum += checkDR(i);
    }
    adjs[i] = sum;
}
//Finds the number of adjacent bombs for all cells in the adjs[] array

function checkUL(i) {return vals[eval(i - s - 1)]}
function checkU(i) {return vals[eval(i - s)]}
function checkUR(i) {return vals[eval(i - s + 1)]}
function checkL(i) {return vals[eval(i - 1)]}
function checkR(i) {return vals[eval(i + 1)]}
function checkDL(i) {return vals[eval(i + s - 1)]}
function checkD(i) {return vals[eval(i + s)]}
function checkDR(i) {return vals[eval(i + s + 1)]}
//Checks if bomb in each direction

function checkCell() {
    var row = eval(prompt("Cell row", "#"));
    var col = eval(prompt("Cell column", "#"));
    i = (row - 1) * s + (col - 1);
    if (vals[i] === 1) {
        alert("dead");
    } else {
        printCell(i);
    }
}

function printCell(i) {
    var row = Math.floor(i / s);
    var col = i % s
    board.fillText(adjs[i], col * (cellsize + 5) + 20, row * (cellsize + 5) + 33);   
}
var s, b, i, j, cellsize, sum, flagnum
var vals = [];
var adjs = [];
var cells = [];
var flags = [];

var canvas = document.getElementById('myCanvas');
var board = canvas.getContext('2d');
board.font = "20px Arial"
//Sets up the drawing area and the text size

cellsize = 30
//Size of each cell in pixels

var Cell = function(x, y) {
    this.x = x;
    this.y = y;
};
//Function for printing a single cell

function randInt(x) {
    var z
    z = Math.floor(Math.random() * x);
    return z
}
//Function used for picking a random number

function clearBoard() {
    board.clearRect(0, 0, 400, 400);
}
//Seperate function for clearing the board

function create() {
    clearBoard();
    Cell.prototype.draw = function() {
        board.rect(this.x, this.y, cellsize, cellsize);
    };
    //Rule for drawing a cell
    //Number of cells each side of grid
    //Number of bombs

    s = eval(document.getElementById('size').value);
    b = eval(document.getElementById('bombs').value);
    flagnum = b
    document.getElementById("flg").innerHTML = "Flags Remaining: " + flagnum;
    cells = [];
    vals = [];
    adjs = [];
    var spaceX = 0;
    var spaceY = 0;

    for (i = 0; i < s; i++) {
        for (j = 0; j < s; j++) {
            spaceX = j * (cellsize + 5) + 10;
            spaceY = i * (cellsize + 5) + 10;
            cells.push(new Cell(spaceX, spaceY));
            vals[i * s + j] = 0;
        }
    }
    flags = Array(s * s).fill(0);
    //Writes the cells[] array for the geometry of every cell

    for (i = 0; i < cells.length; i++) {
    //    if (vals[i] === 0) {
            cells[i].draw();
            board.stroke();
    //    } else {
    //   }
    }
    //Draws the cells on the board
    //Cells have been removed tha reveal the bomb locations

    i = 0
    while (i < b) {
        y = randInt(s * s)
            if (vals[y] === 0) {
                vals[y] = 1;
                i++;
        }
    }
    //This places the bombs in random cells of the grid

    for (i = 0; i < vals.length; i++) {
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
}

function checkUL(i) {return vals[i - s - 1]}
function checkU(i) {return vals[i - s]}
function checkUR(i) {return vals[i - s + 1]}
function checkL(i) {return vals[i - 1]}
function checkR(i) {return vals[i + 1]}
function checkDL(i) {return vals[i + s - 1]}
function checkD(i) {return vals[i + s]}
function checkDR(i) {return vals[i + s + 1]}
//Checks if bomb in each direction

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x, "Coordinate y: " + y);
    checkCell(x, y);
}
//Finds the location of a click on the canvas

let board = document.querySelector("canvas");
board.addEventListener("mousedown", function(e) {
    getMousePosition(board, e);
});

function checkCell(x, y) {
    var col = Math.floor((x - 10) / (cellsize + 5)) + 1;
    var row = Math.floor((y - 10) / (cellsize + 5)) + 1;
    i = (row - 1) * s + (col - 1);
    revealCell(i);
}
//Allows the user to select a cell to reveal

function revealCell(i) {
    if (vals[i] === 1) {
        alert("dead");
        var row = Math.floor(i / s);
        var col = i % s
        board.beginPath();
        board.rect(col * (cellsize + 5) + 10, row * (cellsize + 5) + 10, cellsize, cellsize);
        board.fillStyle = "red";
        board.fill();
        board.stroke();
    } else if (adjs[i] === "shown") {
    } else if (adjs[i] === 0) {
        printCell(i);
        adjs[i] = "shown";
        if (i === 0) {
            revealCell(i + 1);
            revealCell(i - s);
            revealCell(i + s + 1);
        } else if (i === (s - 1)) {
            revealCell(i - 1);
            revealCell(i + s - 1);
            revealCell(i + s);
        } else if (i === s * (s - 1)) {
            revealCell(i - s);
            revealCell(i - s + 1);
            revealCell(i + 1);
        } else if (i === s * s - 1) {
            revealCell(i - s - 1);
            revealCell(i - s);
            revealCell(i - 1);
        } else if (i < (s - 1)) {
            revealCell(i - 1);
            revealCell(i + 1);
            revealCell(i + s - 1);
            revealCell(i + s);
            revealCell(i + s + 1);    
        } else if (i % s === 0) {
            revealCell(i - s);
            revealCell(i - s + 1);
            revealCell(i + 1);
            revealCell(i + s);
            revealCell(i + s + 1);
        } else if ((i + 1) % s === 0) {
            revealCell(i - s - 1);
            revealCell(i - s);
            revealCell(i - 1);
            revealCell(i + s - 1);
            revealCell(i + s);
        } else if (i > s * (s -1)) {
            revealCell(i - s - 1);
            revealCell(i - s);
            revealCell(i - s + 1);
            revealCell(i - 1);
            revealCell(i + 1);
        } else {
            revealCell(i - s - 1);
            revealCell(i - s);
            revealCell(i - s + 1);
            revealCell(i - 1);
            revealCell(i + 1);
            revealCell(i + s - 1);
            revealCell(i + s);
            revealCell(i + s + 1);
        }
    } else {
        printCell(i);
        adjs[i] = "shown"
    }
}

function printCell(i) {
    var row = Math.floor(i / s);
    var col = i % s
    board.fillStyle = "black";
    board.fillText(adjs[i], col * (cellsize + 5) + 20, row * (cellsize + 5) + 33);     
}
//Prints the adjs[] value of the cell

function flagCell() {
    var row = eval(prompt("Cell row", "#"));
    var col = eval(prompt("Cell column", "#"));
    i = (row - 1) * s + (col - 1);
    if (flagnum === 0) {
    } else if (flags[i] === 0) {
        board.beginPath();
        board.rect(col * (cellsize + 5) - 25, row * (cellsize + 5) - 25, cellsize, cellsize)
        board.fillStyle = "green";
        board.fill();
        board.stroke();
        flags[i] = 1;
        flagnum -= 1;
        document.getElementById("flg").innerHTML = "Flags Remaining: " + flagnum;
    } else if (flags[i] === 1) {
        board.beginPath();
        board.rect(col * (cellsize + 5) - 25, row * (cellsize + 5) - 25, cellsize, cellsize)
        board.fillStyle = "white";
        board.fill();
        board.stroke();
        flags[i] = 0; 
        flagnum += 1;
        document.getElementById("flg").innerHTML = "Flags Remaining: " + flagnum;
    }
}

function finish() {
    for (i = 0; i < (s * s); i ++) {
        if (vals[i] === flags[i]) {
            i++;
        } else {
            alert("you lose");
            return;
        }
    }
    alert("you win");
}
//Performs the final check if the flags match the bombs
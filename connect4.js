"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = "red"; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //make 6 arrays with 7 indexes each
  //set all indexes as equal to 0(maybe these end up strings)

  for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
      row.push(null);
    }
    board.push(row);
  }
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // TODO: Creating HTML top row container
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  const cell = document.createElement("td");
  top.addEventListener("click", handleClick);

  // TODO: Creating top row
  //each row created shares an x or y, and then in each row is the other variable.
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    // TODO: Create a table row element and assign to a "row" variable

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `c-${y}-${x}`);
      row.appendChild(cell);

      // TODO: Create a table cell element and assign to a "cell" variable

      // TODO: add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x

      // TODO: append the table cell to the table row

    }
    htmlBoard.append(row);
    // TODO: append the row to the html board

  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  for (let i = 5; i >= 0; i--) {
    if (board[i][x] === null) {
      return i;
    }
  }

  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell'
  const token = document.createElement('div');
  token.classList.add('piece');
  token.style.setProperty('background-color', `${currPlayer}`)
  const correctCell = document.getElementById(`c-${y}-${x}`);
  correctCell.appendChild(token);
}




/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // if (board[0].every(!null)) {
  //   endGame();
  // }

  // switch players
  // TODO: switch currPlayer 1 <-> 2

  currPlayer === "red" ? currPlayer = "blue" : currPlayer = "red";

  console.log(board);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    //this doesn't work
    // let redCount = 0;
    // let blueCount = 0;
    // for (let i = 0; i < cells.length; i++) {
    //   if (cells[i] === "red") {
    //     redCount++
    //   } else if (cells[i] === "blue") {
    //     blueCount++
    //   }
    //   if (redCount === 4 || blueCount === 4) {
    //     return true;
    //   }
    //   console.log(redCount);
    //   console.log(blueCount);
    // }; return false;
    // TODO: Check four cells to see if they're all legal & all color of current
    // player


  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [board[y, x], board[y, x + 1], board[y, x + 2], board[y, x + 3]];
      let vert = [board[y + 1, x], board[y + 2, x], board[y + 3, x], board[y + 4, x]];
      let diagDL = [board[y, x], board[y + 1, x + 1], board[y + 2, x + 2], board[y + 3, x + 3]];
      let diagDR = [board[y, x], board[y - 1, x - 1], board[y - 2, x - 2], board[y - 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();



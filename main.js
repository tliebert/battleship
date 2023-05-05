function returnOne() {
  return 1;
}

//if functions outside of ship factory were defined, would it work.

function shipFactory(length) {
  const shiplength = length;

  let currentHits = 0;
  function registerHit() {
    currentHits += 1;
    return currentHits;
  }
  // register hit
  // array  update array, ship hits
  // is ship sunk

  // isSunk pure function that doesn't rely on state
  // two numbers and compare, if equal return true

  // add dependency injection

  function isThisShipSunk() {
    return currentHits >= shiplength;
  }

  return {
    registerHit,
    isThisShipSunk,
  };
}

// gameBoard functions

function makeEmptyBoard() {
  let emptyBoard = {};
  for (let i = 1; i < 11; i++) {
    emptyBoard[i] = Array(10).fill(0);
  }
  return emptyBoard;
}

function gameBoardFactory() {
  const gameBoard = makeEmptyBoard();

  function placeShip(startEndCoordinateArray, ship) {
    let [startxcoord, startycoord] = startEndCoordinateArray[0];
    let [endxcoord, endycoord] = startEndCoordinateArray[1];

    let privateShip = ship
      ? ship
      : shipFactory(deriveShipLengthFromCoordinates(startEndCoordinateArray));

    // Expects an array of arrays, with each sub array containing an x and y coordinate

    if (checkValidPlacement(startEndCoordinateArray)) {
      if (startxcoord !== endxcoord) {
        // take y axis and iterate through that array
        for (let i = startxcoord; i <= endxcoord; i++) {
          gameBoard[startycoord][i - 1] = privateShip;
        }
      } else {
        for (let i = startycoord; i <= endycoord; i++) {
          gameBoard[i][startxcoord - 1] = privateShip;
        }
      }
    }

    return gameBoard;
  }

  function returnValueAtCoordinate(coordinateArray, board) {
    let [xcoord, ycoord] = coordinateArray;
    return board[ycoord][xcoord - 1];
  }

  function registerAttack(hitCoordinateArray, gameboard = gameBoard) {
    if (returnValueAtCoordinate(hitCoordinateArray, gameboard)) {
      returnValueAtCoordinate(hitCoordinateArray, gameboard).hit();
    }
  }

  function checkValidPlacement(coordinateArray) {
    // checks if the placement is allowed.
    let [startxcoord, startycoord] = coordinateArray[0];
    let [endxcoord, endycoord] = coordinateArray[1];
    return !(startxcoord !== endxcoord && startycoord !== endycoord);
  }

  function deriveShipLengthFromCoordinates(startEndCoordinateArray) {
    let [startxcoord, startycoord] = startEndCoordinateArray[0];
    let [endxcoord, endycoord] = startEndCoordinateArray[1];
    if (startxcoord != endxcoord) {
      return Math.abs(startxcoord - endxcoord);
    }
    return Math.abs(startycoord - endycoord);
  }

  function returnBoardRepresentation() {
    return gameBoard;
  }
  return {
    returnBoardRepresentation,
    placeShip,
    registerAttack,
  };
}

module.exports = {
  shipFactory,
  returnOne,
  gameBoardFactory,
};

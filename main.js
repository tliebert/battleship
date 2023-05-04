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

  function placeShip(coordinateArray, ship) {
    let [yaxis, xaxis] = coordinateArray;
    // make the ship and assign references to it.

    gameBoard[`${yaxis}`][xaxis - 1] = { ship };
    console.log(gameBoard);
    return gameBoard;
  }

  function returnBoardRepresentation() {
    return gameBoard;
  }
  return {
    returnBoardRepresentation,
    placeShip,
  };
}

module.exports = {
  shipFactory,
  returnOne,
  gameBoardFactory,
};

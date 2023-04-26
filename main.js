function returnOne() {
  return 1;
}

function shipFactory(length) {
  const shiplength = length;
  function returnLength() {
    return shiplength;
  }
  const totalHits = length;
  let currentHits = 0;
  function registerHit() {
    currentHits += 1;
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
    returnLength,
    registerHit,
    isThisShipSunk,
  };
}

function danShipFactory(length) {
  const shipLength = length;
  let hits = 0;
  function isSunk() {
    if (shipLength === hits) {
      return true;
    } else {
      return false;
    }
  }
  function hit() {
    hits += 1;
  }
  return {
    isSunk,
    hit,
  };
}

// gameBoard functions

function makeEmptyBoard() {
  let emptyBoard = {};
  for (let i = 0; i < 10; i++) {
    emptyBoard[i] = Array(10).fill(0);
  }
  return emptyBoard;
}

function gameBoardFactory() {
  const gameBoard = makeEmptyBoard();
  function returnBoardRepresentation() {
    return gameBoard;
  }
  return {
    returnBoardRepresentation,
  };
}

// function danGameboardFactory() {
//   var grid = new Array(10).fill(new Array(10));

//   function placeShip(x, y, ship) {
//     grid[x][y] = ship;
//   }

//   function receiveAttack(x, y) {
//     grid[x][y].hit();
//   }

//   function areAllShipsSunk() {
//     for (let column in grid) {
//       for (let pin in column) {
//         if (typeof value === "object") {
//           if (!pin.isSunk()) {
//             return false;
//           }
//         }
//       }
//     }
//     return true;
//   }

//   return {
//     placeShip,
//     receiveAttack,
//     areAllShipsSunk,
//   };
// }

module.exports = {
  shipFactory,
  danShipFactory,
  returnOne,
  gameBoardFactory,
};

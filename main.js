// DOM Funcctions

// Game Logic

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

  const ships = [];

  function placeShip(startEndCoordinateArray) {
    let [startxcoord, startycoord] = startEndCoordinateArray[0];
    let [endxcoord, endycoord] = startEndCoordinateArray[1];
    let ship = shipFactory(
      deriveShipLengthFromCoordinates(startEndCoordinateArray)
    );
    let shipnumber = ships.length + 1;
    ships.push(ship);

    // Expects an array of arrays, with each sub array containing an x and y coordinate

    if (checkValidPlacement(startEndCoordinateArray)) {
      if (startxcoord !== endxcoord) {
        // take y axis and iterate through that array
        for (let i = startxcoord; i <= endxcoord; i++) {
          gameBoard[startycoord][i - 1] = shipnumber;
        }
      } else {
        for (let i = startycoord; i <= endycoord; i++) {
          gameBoard[i][startxcoord - 1] = shipnumber;
        }
      }
    }

    return returnBoardRepresentation();
  }

  function returnValueAtCoordinate(coordinateArray) {
    let [xcoord, ycoord] = coordinateArray;
    return gameBoard[ycoord][xcoord - 1];
  }

  function registerAttack(hitCoordinateArray) {
    let [xcoord, ycoord] = hitCoordinateArray;

    let valueAtCoordinate = returnValueAtCoordinate(
      hitCoordinateArray,
      gameBoard
    );

    if ((valueAtCoordinate = "Hit")) {
      throw new Error("already hit, shoulnd't be allowed to hit there");
    } else if (valueAtCoordinate === 0) {
      gameBoard[ycoord][xcoord - 1] = "Miss";
    } else if (typeof valueAtCoordinate === "number" && valueAtCoordinate < 0) {
      valueAtCoordinate.registerHit();
      return true;
    }
  }

  function everyShipSunkChecker() {}

  function canCoordinateBeHit(coordinateArray) {
    if (returnValueAtCoordinate(coordinateArray, gameBoard) === 0) {
      return false;
    } else {
      return true;
    }
  }

  function returnBoardRepresentation() {
    return JSON.stringify(gameBoard);
  }

  // function returnListOfHittableCoordinates() {
  //   let arrayOfHittableCoordinates = [];
  //   function isHittable(item, key, index) {
  //     if (item !== "Hit" && item !== "x") {
  //       arrayOfHittableCoordinates.push([parseInt(key), index + 1]);
  //     }
  //   }
  //   callFunctionOnEachCoordinate(board, isHittable);
  //   return arrayOfHittableCoordinates;
  // }

  // internal helper function

  // given a board, loop through each value. Callback function accepts parameters
  // for the value at coordinate of an arbitrary size array, then the y coordinate aka
  // key for the object, and finally the x-coordinate, aka the index in the array.

  function callFunctionOnEachCoordinate(callback) {
    for (const key in board) {
      if (gameBoard.hasOwnProperty(key)) {
        let array = board[key];
        for (let i = 0; i < array.length; i++) {
          callback(array[i], key, i);
        }
      }
    }
  }

  function returnArrayOfAllBoardValues() {
    let allvalues = [];
    function pusher(item) {
      allvalues.push(item);
    }
    callFunctionOnEachCoordinate(board, pusher);
    return allvalues;
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

  return {
    returnBoardRepresentation,
    placeShip,
    registerAttack,
    everyShipSunkChecker,
    canCoordinateBeHit,
  };
}

// returns player object
// player should be be able to attack squares
// ai player should have funtion that makes legal random move given gameboard

function playerFactory(name) {
  function registerAttack(coordinateArray, board) {
    return board.registerAttack(coordinateArray);
  }

  return {
    name,
    registerAttack,
  };
}

function makeRandomAttack(board, randomIndex) {
  let possibleCoordinates = board.returnListOfHittableCoordinates();
  let arrayIndex;
  if (randomIndex) {
    arrayIndex = randomIndex;
  } else {
    arrayIndex = Math.floor(Math.random() * possibleCoordinates.length);
  }
  board.registerAttack(possibleCoordinates[arrayIndex]);
}

function gameController() {
  let playerArray = [];
  const gameboardsArray = [];

  function addPlayer(name) {
    playerArray.push(playerFactory(name, true));
  }

  // there's an input and output element.

  function makeGameboardsForEachPlayer(
    players = playerArray,
    boardMakerFactory = gameBoardFactory(),
    gameboards = gameboardsArray
  ) {
    return (gameboards = players.map((playerObj) => {
      return { player: playerObj, board: boardMakerFactory() };
    }));
  }

  return {
    addPlayer,
    makeGameboardsForEachPlayer,
    populateEachBoard,
  };
}

module.exports = {
  shipFactory,
  returnOne,
  gameBoardFactory,
  playerFactory,
  gameController,
};

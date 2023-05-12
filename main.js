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
    // if it has a hit method
    let [xcoord, ycoord] = hitCoordinateArray;

    let valueAtCoordinate = returnValueAtCoordinate(
      hitCoordinateArray,
      gameboard
    );

    if (valueAtCoordinate.hasOwnProperty("registerHit")) {
      valueAtCoordinate.registerHit();
      gameboard[ycoord][xcoord - 1] = "Hit";
    } else if (valueAtCoordinate === 0) {
      gameboard[ycoord][xcoord - 1] = "x";
    } else if (valueAtCoordinate === "x") {
      return false;
    }

    return gameboard;
  }

  function everyShipSunkChecker(board = gameBoard) {
    // iterate through the array and for every item if it has a isThisShipSunk method, call it
    return returnArrayOfAllBoardValues(board).every((item) => {
      if (!item.hasOwnProperty("isThisShipSunk")) {
        return true;
      }
      if (item.hasOwnProperty("isThisShipSunk") && !item.isThisShipSunk()) {
        return false;
      }
      return true;
    });
  }

  function canCoordinateBeHit(coordinateArray, board = gameBoard) {
    if (returnValueAtCoordinate(coordinateArray, board) === "x") {
      return false;
    } else {
      return true;
    }
  }

  function returnBoardRepresentation() {
    return gameBoard;
  }

  function returnListOfHittableCoordinates(board = gameBoard) {
    let arrayOfHittableCoordinates = [];
    function isHittable(item, key, index) {
      if (item !== "Hit" && item !== "x") {
        arrayOfHittableCoordinates.push([parseInt(key), index + 1]);
      }
    }
    callFunctionOnEachCoordinate(board, isHittable);
    return arrayOfHittableCoordinates;
  }

  // internal helper function

  // given a board, loop through each value. Callback function accepts parameters
  // for the value at coordinate of an arbitrary size array, then the y coordinate aka
  // key for the object, and finally the x-coordinate, aka the index in the array.
  function callFunctionOnEachCoordinate(board = gameBoard, callback) {
    for (const key in board) {
      if (board.hasOwnProperty(key)) {
        let array = board[key];
        for (let i = 0; i < array.length; i++) {
          callback(array[i], key, i);
        }
      }
    }
  }

  // example callback for callFunctionOnEachCoordinate function
  function demologgerCallback(value, key, index) {
    console.log(value, key, index);
  }

  function returnArrayOfAllBoardValues(board = gameBoard) {
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
    returnListOfHittableCoordinates,
  };
}

// returns player object
// player should be be able to attack squares
// ai player should have funtion that makes legal random move given gameboard

function playerFactory(name, ai = false) {
  function registerAttack(coordinateArray, board) {
    return board.registerAttack(coordinateArray);
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

  return {
    name,
    registerAttack,
    makeRandomAttack,
  };
}

function mainGameLoop() {
  let playerArray = [];
  function addPlayer(players = playerArray, player, name) {
    if (player) {
      players.push(player);
    } else {
      players.push(playerFactory(name, true));
    }
    return players;
  }

  // storing gameboards... make one for each player

  makeGameboards();

  return {
    addPlayer,
  };
}

module.exports = {
  shipFactory,
  returnOne,
  gameBoardFactory,
  playerFactory,
  mainGameLoop,
};

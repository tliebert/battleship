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

// main controller for placing and coordinating attack on ships.
// Board is represented by Empty spaces (0), or by numbered ships (1, 2, 3), keyed
// by their place in a ships array. Representation of the board does not return objects
// but rather a stringified represntation of the board. Hits and Misses are spelled out as
// strings.

function gameBoardFactory() {
  const gameBoard = makeEmptyBoard();

  // function that makes gameBoard arbitrary size

  const ships = [];

  function getArrayOfShips() {
    return ships;
  }

  function placeShip(startEndCoordinateArray) {
    let [startxcoord, startycoord] = startEndCoordinateArray[0];
    let [endxcoord, endycoord] = startEndCoordinateArray[1];

    const isCoordinateEmpty = (coord) => {
      return coord === 0;
    };

    // if any of the coordinates are not empty (0), it will return false
    if (
      !runTestOnCoordinatesOfSubarray(
        startEndCoordinateArray,
        isCoordinateEmpty
      )
    ) {
      return false;
    }

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

  // takes a subarray and checks the value of the coordinate for each
  // coordinate between start and end.

  // testFunction is a callback that should take a single value
  // from the board and return either true if it passes the test or false
  function runTestOnCoordinatesOfSubarray(
    startEndCoordinateArray,
    testFunction
  ) {
    let [startxcoord, startycoord] = startEndCoordinateArray[0];
    let [endxcoord, endycoord] = startEndCoordinateArray[1];
    if (checkValidPlacement(startEndCoordinateArray)) {
      if (!(endxcoord === startxcoord)) {
        // do I need to check this?
        for (let i = startxcoord; i <= endxcoord; i++) {
          let valueAtShipLocation = returnValueAtCoordinate([i, startycoord]);
          if (!testFunction(valueAtShipLocation)) {
            return false;
          }
          continue;
        }
      }
    }
    return true;
  }

  function callHitOnShip(shipnumber) {
    ships[shipnumber - 1].registerHit();
  }

  function returnValueAtCoordinate(coordinateArray) {
    let [xcoord, ycoord] = coordinateArray;
    return gameBoard[ycoord][xcoord - 1];
  }

  function registerAttack(hitCoordinateArray) {
    let [xcoord, ycoord] = hitCoordinateArray;

    let valueAtCoordinate = returnValueAtCoordinate(hitCoordinateArray);

    if (valueAtCoordinate === "Hit" || valueAtCoordinate === "Miss") {
      throw new Error("already attacked, shoulnd't be allowed to hit there");
    } else if (valueAtCoordinate === 0) {
      gameBoard[ycoord][xcoord - 1] = "Miss";
    } else if (typeof valueAtCoordinate === "number" && valueAtCoordinate > 0) {
      callHitOnShip(valueAtCoordinate);
      gameBoard[ycoord][xcoord - 1] = "Hit";
    }
    return returnBoardRepresentation();
  }

  function everyShipSunkChecker() {
    let allValues = returnArrayOfAllBoardValues();
    if (
      allValues.some((boardspace) => {
        return typeof boardspace === "number" && boardspace > 0;
      })
    ) {
      return false;
    }
    return true;
  }

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

  function returnListOfHittableCoordinates() {
    let arrayOfHittableCoordinates = [];
    function isHittable(item, key, index) {
      if (!(item === "Hit") && !(item === "Miss")) {
        arrayOfHittableCoordinates.push([index + 1, parseInt(key)]);
      }
    }
    callFunctionOnEveryBoardCoordinate(isHittable);
    return arrayOfHittableCoordinates;
  }

  // internal helper function

  // given a board, loop through each value. Callback function accepts parameters
  // for the value at coordinate of an arbitrary size array, then the y coordinate aka
  // key for the object, and finally the x-coordinate, aka the index in the array.

  function callFunctionOnEveryBoardCoordinate(callback) {
    for (const key in gameBoard) {
      if (gameBoard.hasOwnProperty(key)) {
        let array = gameBoard[key];
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
    callFunctionOnEveryBoardCoordinate(pusher);
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
    getArrayOfShips,
    returnListOfHittableCoordinates,
  };
}

// returns player object
// player should be be able to attack squares
// ai player should have funtion that makes legal random move given gameboard

// p1board.placeShip
// p2board

//player.attackBoard(board)

function playerFactory(name) {
  function attackOpponentBoard(coordinateArray, opponentBoard) {
    opponentBoard.registerAttack(coordinateArray);
  }

  // function loadEnemyBoard(opponentBoardObject) {
  //   enemyBoard = opponentBoardObject;
  // }

  // make a board that's a mock w/ limited properties.
  // Use boardfactory to make a different type of board.

  function makeRandomAttack(opponentBoard) {
    // loop through board and create list of hittable coordinates
    let hittables = opponentBoard.returnListOfHittableCoordinates();
    // are hittables right

    let randomIndex = Math.floor(Math.random() * hittables.length);
    let coordinatesToHit = hittables[randomIndex];

    return opponentBoard.registerAttack(coordinatesToHit);

    // randomly pick a number between 0 and array length.
    // hit that coordinate.
  }

  return {
    name,
    attackOpponentBoard,
    makeRandomAttack,
  };
}

// function makeRandomAttack(board, randomIndex) {
//   let possibleCoordinates = board.returnListOfHittableCoordinates();
//   let arrayIndex;
//   if (randomIndex) {
//     arrayIndex = randomIndex;
//   } else {
//     arrayIndex = Math.floor(Math.random() * possibleCoordinates.length);
//   }
//   board.registerAttack(possibleCoordinates[arrayIndex]);
// }

function gameController() {
  const playerArray = [];
  const boardsArray = [];
  let activePlayerIndex = 0;

  function addPlayer(name) {
    playerArray.push(playerFactory(name));
    return playerArray;
  }

  function switchActivePlayer() {
    console.log("active player index, start of switch:", activePlayerIndex);
    if (activePlayerIndex === 0) {
      activePlayerIndex = 1;
    } else if (activePlayerIndex === 1) {
      activePlayerIndex = 0;
    } else throw new Error("player index not 0 or 1");
    console.log("active player index, end of switch:", activePlayerIndex);
  }

  function returnArrayOfBoardStrings() {
    return boardsArray.map((gameBoard) => {
      return gameBoard.returnBoardRepresentation();
    });
  }

  function returnActivePlayer() {
    return playerArray[activePlayerIndex];
  }

  function checkForWinner() {}

  function makeGameboardForEachPlayer() {
    for (let i = 0; i < playerArray.length; i++) {
      boardsArray.push(gameBoardFactory());
    }
  }

  function returnAvailableShipsToPlace() {}

  function placeShip() {}

  function registerHit() {
    switchActivePlayer();
  }

  return {
    addPlayer,
    registerHit,
    returnActivePlayer,
    checkForWinner,
    returnArrayOfBoardStrings,
    makeGameboardForEachPlayer,
  };
}

module.exports = {
  shipFactory,
  returnOne,
  gameBoardFactory,
  playerFactory,
  gameController,
};

import {
  returnOne,
  shipFactory,
  gameBoardFactory,
  registerAttack,
  playerFactory,
  gameController,
} from "./main.js";

test("returns the number one", () => {
  expect(returnOne()).toEqual(1);
});

describe("shipFactory", () => {
  // options here are either mock some object, have registerAttack return total hits, or not test
  let ship;
  beforeEach(() => {
    ship = shipFactory(1);
  });

  it("registers a hit", () => {
    expect(ship.registerHit()).toBe(1);
  });

  it("returns True if there are enough hits to sink ship", () => {
    ship.registerHit();
    expect(ship.isThisShipSunk()).toBe(true);
  });
});

describe("gameBoard", () => {
  let gameBoardInstance;

  beforeEach(() => {
    gameBoardInstance = gameBoardFactory();
  });

  it("returns empty board state", () => {
    let emptyBoard = JSON.stringify({
      1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    expect(gameBoardInstance.returnBoardRepresentation()).toEqual(emptyBoard);
  });

  //Options here:
  //placeShip returns gameboard entirely, pure function. Will always get same thing back
  //expect it to change a variable, aka the board state, and return that.

  it("places a one length ship at the given coordinates", () => {
    let oneShip = JSON.stringify({
      1: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    expect(
      gameBoardInstance.placeShip([
        [1, 1],
        [1, 1],
      ])
    ).toEqual(oneShip);
  });

  it("places a ship greather than length one at all the coordinates", () => {
    let threeLengthShip = JSON.stringify({
      1: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    expect(
      gameBoardInstance.placeShip([
        [1, 1],
        [3, 1],
      ])
    ).toEqual(threeLengthShip);
  });

  it("places two ships at valid coordinates", () => {
    let twoShips = JSON.stringify({
      1: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      2: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    gameBoardInstance.placeShip([
      [1, 1],
      [3, 1],
    ]);

    expect(
      gameBoardInstance.placeShip([
        [1, 2],
        [2, 2],
      ])
    ).toEqual(twoShips);
  });

  it("rejects a ship placement if overlapping other ship", () => {
    let threeLengthShip = JSON.stringify({
      1: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    gameBoardInstance.placeShip([
      [3, 3],
      [6, 3],
    ]);

    expect(
      gameBoardInstance.placeShip([
        [3, 3],
        [6, 3],
      ])
    ).toBe(false);
  });

  it("Recieves coordinates for a hit and calls hit on the ship at those coordinates", () => {
    test.skip;
  });

  // not a good way to test this part of the board, and it's really an integration of two units
  // my options there would be mocking or dependence injection
  // will revisit it later.

  it("Changes board to reflect hit after recieving attack", () => {
    let threeShip = JSON.stringify({
      1: ["Hit", 1, 1, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    gameBoardInstance.placeShip([
      [1, 1],
      [3, 1],
    ]);
    expect(gameBoardInstance.registerAttack([1, 1])).toEqual(threeShip);
  });

  it("Changes board to reflect miss after recieving attack on empty space", () => {
    let threeShip = JSON.stringify({
      1: [1, 1, 1, "Miss", 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    gameBoardInstance.placeShip([
      [1, 1],
      [3, 1],
    ]);
    expect(gameBoardInstance.registerAttack([4, 1])).toEqual(threeShip);
  });

  it("returns false if there are unsunk ships", () => {
    gameBoardInstance.placeShip([
      [1, 1],
      [3, 1],
    ]);
    expect(gameBoardInstance.everyShipSunkChecker()).toEqual(false);
  });

  it("returns true if there are no ships on the board", () => {
    expect(gameBoardInstance.everyShipSunkChecker()).toEqual(true);
  });

  // it("returns a list of hittable coordinates", () => {
  //   let unsunkship = { isThisShipSunk: () => false };
  //   let stubboard = {
  //     1: ["Hit", 0],
  //     2: [unsunkship, "x"],
  //   };
  //   expect(
  //     gameBoardInstance.returnListOfHittableCoordinates(stubboard)
  //   ).toEqual([
  //     [1, 2],
  //     [2, 1],
  //   ]);
  // });
});

// describe("player Factory", () => {
//   it("returns player object with correct properties", () => {
//     let playermock = { name: "Thomas", registerAttack: () => {} };
//     let player2mock = { name: "Dan", registerAttack: () => {} };
//     expect(playerFactory("Thomas")).toHaveProperty("registerAttack");
//     expect(playerFactory("Dan").name).toMatch("Dan");
//   });

//   it("can send an attack to a game board", () => {
//     // board that recieves message
//     // when given board, player object sucessfully sends message
//     let newPlayer = playerFactory("testname");
//     let board = { registerAttack: jest.fn() };
//     newPlayer.registerAttack([1, 1], board);
//     expect(board.registerAttack).toHaveBeenCalled();
//   });

//   it("initializes with a make random move function if passed ai argument is true", () => {
//     expect(playerFactory("robot", true)).toHaveProperty("makeRandomAttack");
//   });

//   it("sends a random attack when given a board", () => {
//     let mockboard = {
//       returnListOfHittableCoordinates: () => {
//         return [[1, 1]];
//       },
//       registerAttack: jest.fn(),
//     };
//     let player = playerFactory("Robot", true);
//     player.makeRandomAttack(mockboard, 0);
//     expect(mockboard.registerAttack).toHaveBeenCalled();
//     expect(mockboard.registerAttack).toHaveBeenCalledWith([1, 1]);
//   });
// });

// describe("main game loop", () => {
//   let gameController;

//   beforeEach(() => {
//     gameController = gameController();
//   });

//   it("creates different players", () => {
//     let testplayer = {
//       name: "Thomas",
//     };
//     let testplayer2 = {
//       name: "Joe",
//     };
//     let playersBefore = [testplayer];
//     let playersAfter = [testplayer, testplayer2];
//     expect(gameController.addPlayer(playersBefore, testplayer2)).toEqual(
//       playersAfter
//     );
//   });
//   it("creates a gameboard for each player", () => {
//     let mockplayers = [{ name: "One" }, { name: "Two" }];
//     let mockfactory = () => {
//       return {
//         board: "I am a board",
//       };
//     };
//     let mockboards = [];
//     let resultgameboards = [
//       {
//         player: { name: "One" },
//         board: {
//           board: "I am a board",
//         },
//       },
//       {
//         player: { name: "Two" },
//         board: {
//           board: "I am a board",
//         },
//       },
//     ];
//     expect(
//       gameController.makeGameboardsForEachPlayer(
//         mockplayers,
//         mockfactory,
//         mockboards
//       )
//     ).toEqual(resultgameboards);
//   });
// });

//options:
/* 
it's random, so 100 tries might not work. 
Better to just return "hittables, then pick from those and send back"

*/

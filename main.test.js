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

  // it("places a ship greather than length one at all the coordinates", () => {
  //   const othership = shipFactory(3); // should this be a stub
  //   let threeShip = {
  //     1: [othership, othership, othership, 0, 0, 0, 0, 0, 0, 0],
  //     2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   };
  //   expect(
  //     gameBoardInstance.placeShip(
  //       [
  //         [1, 1],
  //         [3, 1],
  //       ],
  //       othership
  //     )
  //   ).toEqual(threeShip);
  // });

  // it("rejects a ship placement if overlapping other ship", test.todo);

  // // recieve attack and determine if there was a hit, log that hit on the ship
  // // or records coordinates of missed shot

  // it("Recieves coordinates for a hit and calls hit on the ship at those coordinates", () => {
  //   // incoming command message
  //   // options: Mock correct ship
  //   // pass the board as an argument?

  //   let hitship = { registerHit: jest.fn() };
  //   let shipboard = {
  //     1: [hitship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   };

  //   gameBoardInstance.registerAttack([1, 1], shipboard);
  //   expect(hitship.registerHit).toHaveBeenCalled();
  // });

  // it("Changes board to reflect hit after recieving attack", () => {
  //   let hitship = {
  //     registerHit: () => {
  //       console.log("been hit");
  //     },
  //   };

  //   let shipboard = {
  //     1: [hitship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   };

  //   let hitboard = {
  //     1: ["Hit", 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   };

  //   expect(gameBoardInstance.registerAttack([1, 1], shipboard)).toEqual(
  //     hitboard
  //   );
  // });

  // it("recieves an unsuccessful attack on a ship and logs it was missed", () => {
  //   let missboard = {
  //     1: ["x", 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   };
  //   expect(gameBoardInstance.registerAttack([1, 1])).toEqual(missboard);
  // });

  // it("checks if all ships are sunk", () => {
  //   let sunkship = { isThisShipSunk: () => true };
  //   let unsunkship = { isThisShipSunk: () => false };
  //   let somesunkshipboard = {
  //     1: [sunkship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     10: [unsunkship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   };
  //   let allsunkshipboard = {
  //     1: [sunkship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     10: [sunkship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   };
  //   let nonesunkshipboard = {
  //     1: [unsunkship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     10: [unsunkship, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   };
  //   expect(gameBoardInstance.everyShipSunkChecker(allsunkshipboard)).toBe(true);
  //   expect(gameBoardInstance.everyShipSunkChecker(somesunkshipboard)).toBe(
  //     false
  //   );
  //   expect(gameBoardInstance.everyShipSunkChecker(nonesunkshipboard)).toBe(
  //     false
  //   );
  // });

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

import {
  returnOne,
  shipFactory,
  gameBoardFactory,
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
      //ship
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

  it("Recieves coordinates for a hit and calls hit on the ship at those coordinates", () => {
    gameBoardInstance.placeShip([
      [1, 1],
      [1, 1],
    ]);
    gameBoardInstance.registerAttack([1, 1]);
    let ships = gameBoardInstance.getArrayOfShips();
    expect(ships[0].isThisShipSunk()).toBe(true);
  });
});

describe("player Factory", () => {
  let testPlayer;
  beforeEach(() => {
    testPlayer = playerFactory("testname");
  });

  it("returns player object with correct properties", () => {
    expect(testPlayer.name).toEqual("testname");
  });

  //

  it("can attack another player's board", () => {
    // create test player
    // give player mock board w/ required functions
    // give mock board to player
    // play random attack & inspect results

    const registerAttack = jest.fn();
    let opponentBoard = { registerAttack: registerAttack };
    testPlayer.attackOpponentBoard([1, 1], opponentBoard);
    expect(registerAttack).toHaveBeenCalled();
  });

  it("it sends the register attack command on the correct interface", () => {
    const registerAttack = jest.fn();
    let opponentBoard = { registerAttack: registerAttack };
    testPlayer.attackOpponentBoard([1, 1], opponentBoard);
    expect(registerAttack.mock.calls).toHaveLength(1);
  });

  // it("can make a random attack that doesn't hit spaces already attacked", () => {
  //   let randomAttackBoard = { 1: ["Hit", 0] };
  //   let res = testPlayer.makeRandomAttack(randomAttackBoard); //gameBoard Object
  //   expect(res).toBe(JSON.stringify({ 1: ["Hit", "Hit"] }));
  // });

  // it("hit a one length board space", () => {
  //   let randomAttackBoard = { 1: [0] };
  //   //
  //   let res = testPlayer.makeRandomAttack(randomAttackBoard); //gameBoard Object
  //   expect(res).toBe(JSON.stringify({ 1: ["Hit"] }));
  // });

  it("fills up an empty gameboard with random attacks", () => {
    let randomAttackBoard = {
      1: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      2: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      3: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      4: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      5: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      6: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      7: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      8: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      9: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
      10: [
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
        "Miss",
      ],
    };

    let gameBoard = gameBoardFactory();

    for (let i = 0; i < 100; i++) {
      testPlayer.makeRandomAttack(gameBoard);
    }
    expect(gameBoard.returnBoardRepresentation()).toEqual(
      JSON.stringify(randomAttackBoard)
    );
  });
});

describe("Game Controller", () => {
  let testGameController;
  beforeEach(() => {
    testGameController = gameController();
  });
  it("adds a player of given name to the array of players", () => {
    expect(testGameController.addPlayer("Thomas")[0]["name"]).toBe("Thomas");
  });
  it("returns the active player", () => {
    testGameController.addPlayer("Thomas");
    expect(testGameController.returnActivePlayer()["name"]).toBe("Thomas");
  });
  it("switches the active player after recieving a hit", () => {
    testGameController.addPlayer("Thomas");
    testGameController.addPlayer("Player2");
    testGameController.registerHit();
    expect(testGameController.returnActivePlayer()["name"]).toBe("Player2");
  });
  it("Returns back to player1 after 2 hits", () => {
    testGameController.addPlayer("Thomas");
    testGameController.addPlayer("Player2");
    testGameController.registerHit();
    testGameController.registerHit();
    expect(testGameController.returnActivePlayer()["name"]).toBe("Thomas");
  });

  it("can return a representation of each board", () => {
    let dummyBoard = JSON.stringify({
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
    testGameController.addPlayer("Thomas");
    testGameController.addPlayer("Player2");
    testGameController.makeGameboardForEachPlayer();
    expect(testGameController.returnArrayOfBoardStrings()[0]).toEqual(
      dummyBoard
    );
    expect(testGameController.returnArrayOfBoardStrings()[1]).toEqual(
      dummyBoard
    );
  });

  it("Can recieve an incoming hit and player board number and direct it to the appropriate gameboard", () => {
    testGameController.addPlayer("Thomas");
    testGameController.registerHit("1", [1, 1]); // fixing Hit vs Attack syntax
    expect(testGameController.returnArrayOfBoardStrings()[0]["1"][0]).toBe(
      "Miss"
    );
  });

  // testGameController.registerHit(player1, [1,1])

  // it("switches the active player", () => {
  //   testGameController.switchActivePlayer();
  // });
  // Choosing not to test this, as it makes more sense as an internal command
});

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

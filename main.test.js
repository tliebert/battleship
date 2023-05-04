import { returnOne, shipFactory, gameBoardFactory } from "./main.js";

test("returns the number one", () => {
  expect(returnOne()).toEqual(1);
});

// test.todo("returns length of ship", () => {
//   let ship = shipFactory(3);
//   expect(ship.returnLength()).toBe(3);
// });

// Round 2
// test.todo("Ship Sinks after total hits", () => {
//   let ship = shipFactory(1);
//   ship.registerHit();
//   expect(ship.isThisShipSunk()).toBe(true);
// });

// Gameboard Tests
// place ships at coordinates by calling ship factory function
// have a recieve attack function that takes a pair of cooprdinates
// and logs attack w/ ship
// log misses
// report whether or not all ships sunk

// recieveAttack, areAllShipsSunk, returnBoardRepresentation, placeShip

describe("shipFacdtory", () => {
  // options here are either mock some object, have registerHit return total hits, or not test
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

describe("gameBoard Factory", () => {
  let gameBoardInstance;

  beforeEach(() => {
    gameBoardInstance = gameBoardFactory();
  });

  it("returns empty board state", () => {
    let emptyBoard = {
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
    };

    expect(gameBoardInstance.returnBoardRepresentation()).toEqual(emptyBoard);
  });

  //Options here:
  //placeShip returns gameboard entirely, pure function. Will always get same thing back
  //expect it to change a variable, aka the board state, and return that
  //I'm thinking about how to keep track of the ship

  it("places a one length ship at the given coordinates", () => {
    const ship = shipFactory(1);
    let oneShip = {
      1: [{ ship }, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    // The question for this test is how to resolve the problem of ship not matching
    // the two methods would be either to add "ship maker" as a functional parameter
    // to placeShip, also telling it how to make the ship...
    // or to
    // Public side effects aka "state"
    // The interface of placeShip
    // Method: refactor placeShip to take a ship object.

    // spyOne
    // requiring methods and checking manually.

    //["1"][0], ["1"][0]
    expect(gameBoardInstance.placeShip([1, 1], ship)).toEqual(oneShip);
  });

  //
});

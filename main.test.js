import { returnOne, shipFactory, gameBoardFactory } from "./main.js";

test("returns the number one", () => {
  expect(returnOne()).toEqual(1);
});

test("returns length of ship", () => {
  let ship = shipFactory(3);
  expect(ship.returnLength()).toBe(3);
});

// test("dan isSunk test", () => {
//   let ship = danShipFactory();
//   expect(ship.isSunk()).toBe(false);
// });

// Round 2
test("Ship Sinks after total hits", () => {
  let ship = shipFactory(1);
  ship.registerHit();
  expect(ship.isThisShipSunk()).toBe(true);
});

// test("dan isSunk 3 hit test", () => {
//   let ship = danShipFactory(3);
//   ship.hit();
//   ship.hit();
//   ship.hit();
//   expect(ship.isSunk()).toBe(true);
// });

// Gameboard Tests
// place ships at coordinates by calling ship factory function
// have a recieve attack function that takes a pair of cooprdinates
// and logs attack w/ ship
// log misses
// report whether or not all ships sunk

// recieveAttack, areAllShipsSunk, returnBoardRepresentation, placeShip

describe("gameBoard Factory", () => {
  let gameBoardInstance;
  beforeEach(() => {
    gameBoardInstance = gameBoardFactory();
  });

  it("returns empty board state", () => {
    let emptyBoard = {
      0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    expect(gameBoardInstance.returnBoardRepresentation()).toEqual(emptyBoard);
  });

  it("accepts the given coordinates", () => {
    expect();
  });
});

// test.todo("dan check gameboard initially", () => {
//   let gameboard = danGameboardFactory();
//   expect(gameboard.areAllShipsSunk()).toBe(true);
// });

// test("dan place ship and destroy", () => {
//   let gameboard = danGameboardFactory();
//   gameboard.placeShip(4, 4, danShipFactory(1));
//   expect(gameboard.areAllShipsSunk()).toBe(false);
//   gameboard.receiveAttack(4, 4);
//   expect(gameboard.areAllShipsSunk()).toBe(true);
// });

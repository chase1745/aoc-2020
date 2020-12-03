import { totalmem } from "os";
import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput()).split("\n");

const goA = (input: string[]) => {
  let map = input.map(line => line.split(""));
  let trees = 0, i = 0, j = 0;
  while (i < map.length) {
    if (j >= map[i].length) {
      map = map.map(row => row.concat(row));
    }

    if (map[i][j] === '#') {
      trees++;
    }

    i++;
    j += 3;
  }

  return trees;
}

const goB = (input) => {
  const movements = [[1,1],[1,3],[1,5],[1,7],[2,1]];
  let total = 1;

  for (const [down, right] of movements) {
    let map = input.map(line => line.split(""));
    let trees = 0, i = 0, j = 0;
    while (i < map.length) {
      if (j >= map[i].length) {
        map = map.map((row: string[]) => row.concat(row));
      }

      if (map[i][j] === '#') {
        trees++;
      }

      i += down;
      j += right;
    }
    total = total * trees;
  }

  return total;
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)

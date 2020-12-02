import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input: string[] = prepareInput(readInput()).split('\n');

const goA = (input: string[]) => {
  let valid = 0;
  for (const row of input) {
    const [badNums, badLetter, word] = row.split(' ');
    const nums = badNums.split('-');
    const mainLetter = badLetter[0];

    const letters = word.split('').reduce((letterMap, letter) => {
      letterMap[letter] = letterMap[letter] ? letterMap[letter]+1 : 1;
      return letterMap;
    }, {})

    if (letters[mainLetter] >= nums[0] && letters[mainLetter] <= nums[1]) {
      valid++;
    }
  }
  return valid;
}

const goB = (input: string[]) => {
  let valid = 0;
  for (const row of input) {
    const [badNums, badLetter, word] = row.split(' ');
    const nums = badNums.split('-').map(a => +a);
    const mainLetter = badLetter[0];

    if ((word[nums[0]-1] === mainLetter && word[nums[1]-1] !== mainLetter) || (word[nums[0]-1] !== mainLetter && word[nums[1]-1] === mainLetter)) {
      valid++;
    }
  }
  return valid;
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

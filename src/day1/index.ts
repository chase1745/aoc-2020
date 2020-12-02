import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const nums: number[] = input.split('\n').map(n => +n);
  const numSet = new Set(nums);
  for (const num of nums) {
    if (numSet.has(2020-num)) {
      return num*(2020-num);
    }
  }
  return 1
}

const goB = (input: string) => {
  const nums: number[] = input.split('\n').map(n => +n);
  const sortedNums = nums.sort();
  const numSet = new Set(nums);

  for (let i = 0; i < sortedNums.length; i++) {
    if (i === sortedNums.length - 1) {
      continue;
    }

    const currNum = sortedNums[i] + sortedNums[i+1];
    const diff = 2020 - currNum;
    if (numSet.has(diff)) {
      return sortedNums[i] * sortedNums[i+1] * diff;
    }
  }

  return
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

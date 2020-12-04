import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const rawPassports = input.split("\n\n");
  const passports = rawPassports.map(p => {
    let raw = p.replace(/\s/g, '\n');
    return raw.split('\n');
  });

  const parsedPassports = passports.map(p => {
    return p.map(line => line.split(':')[0])
  })

  const reqSet = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let num = 0;
  for (const pass of parsedPassports) {
    const currSet = new Set(pass);
    let all = true;
    for (const id of reqSet) {
      if (!currSet.has(id)) {
        all = false;
        break;
      }
    }

    if (all) {
      num++;
    }
  }
  return num;
}

const goB = (input) => {
  const rawPassports = input.split("\n\n");
  const passports = rawPassports.map(p => {
    let raw = p.replace(/\s/g, '\n');
    return raw.split('\n');
  });

  const parsedPassports = passports.map(p => {
    return p.map(line => line.split(':'))
  })

  const reqSet = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let num = 0;
  for (const pass of parsedPassports) {
    const currSet = new Set(pass.map(p => p[0]));
    let all = true;
    for (const id of reqSet) {
      if (!currSet.has(id)) {
        all = false;
        break;
      }
    }

    for (const [id, val] of pass) {
      switch (id) {
        case 'byr':
          if (val.length !== 4 || parseInt(val) < 1920 || parseInt(val) > 2002) {
            all = false;
          }
          break;
        case 'iyr':
          if (val.length !== 4 || parseInt(val) < 2010 || parseInt(val) > 2020) {
            all = false;
          }
          break;
        case 'eyr':
          if (val.length !== 4 || parseInt(val) < 2020 || parseInt(val) > 2030) {
            all = false;
          }
          break;
        case 'hgt':
          const num = parseInt(val.slice(0, val.length-2));
          if (isNaN(num)) {
            all = false;
            break;
          }
          const letters = val.slice(val.length-2, val.length);
          if (letters !== 'cm' && letters !== 'in') {
            all = false;
            break;
          }
          if (letters === 'cm' && (num < 150 || num  >193)) {
            all = false;
          } else if (letters === 'in' && (num < 59 || num  > 76)) {
            all = false;
          }
          break;
        case 'hcl':
          if (val[0] !== '#') {
            all = false;
            break;
          }
          const rest = val.slice(1, val.length);
          if (rest.length !== 6) {
            all = false;
            break;
          }
          const regex = new RegExp(/^([a-f|0-9)]){6}$/);
          if (!regex.test(rest)) {
            all = false;
          }

          break;
        case 'ecl':
          if (!(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val) && val.length === 3)) {
            all = false;
          }

          break;
        case 'pid':
          if (val.length !== 9 || isNaN(parseInt(val))) {
            all = false;
          }

          break;
      }
      if (!all) {
        break;
      }
    }

    if (all) {
      num++;
    }
  }
  return num;
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

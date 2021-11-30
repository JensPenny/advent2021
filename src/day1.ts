import { FileReader } from "./tools/filereader";

let reader = new FileReader();

let testdata = `1721
979
366
299
675
1456`;

let test = findPair(testdata, 2020);
console.log(test);

//Day 1 A
reader
  .read("./res/day1")
  .then((data) => findPair(data, 2020))
  .then((tuple) => {
    let value = tuple[0] * tuple[1];
    console.log('day 1 A: ' + value);
  })
  .catch((err) => console.error(err))

//Day 1 B
reader
  .read("./res/day1")
  .then((data) => findTriple(data))
  .then((tuple) => {
    let value = tuple[0] * tuple[1] * tuple[2];
    console.log('day 1 B: ' + value);
  })
  .catch((err) => console.error(err))


//Actual code, don't judge
export function findPair(data: string, tosearch: number): [number, number] {
  let values = reader.asStringList(data, "\n")
    .map((entry) => Number(entry));

  let largestFirst = Array.from(values.sort((l, r) => r - l));
  let smallestFirst = Array.from(values.sort((l, r) => l - r));


  let tuple: [number, number]
  tuple = [0, 0]
  for (let largest of largestFirst) {
    if (tuple[0] !== 0) {
      break;
    }

    for (let smallest of smallestFirst) {
      if (largest + smallest === tosearch) {
        tuple = [smallest, largest]
        break;
      }
      if (largest + smallest > tosearch) {
        break;
      }
    }
  }

  return tuple;
}

function findTriple(data: string): [number, number, number] {
  let values = reader.asStringList(data, "\n")
    .map((entry) => Number(entry));

  let smallestFirst = Array.from(values.sort((l, r) => l - r));

  let tuple: [number, number, number]
  tuple = [0, 0, 0]
  for (let small1 of smallestFirst) {
    if (tuple[0] !== 0) {
      break;
    }
    for (let small2 of smallestFirst) {
      for (let small3 of smallestFirst) {
        if (small1 + small2 + small3 === 2020) {
          tuple = [small1, small2, small3]
          break;
        }
        if (small1 + small2 + small3 > 2020) {
          break;
        }
      }
    }
  }

  return tuple;

}

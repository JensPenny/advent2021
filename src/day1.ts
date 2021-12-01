import { read } from "fs";
import { FileReader } from "./tools/filereader";

let reader = new FileReader();

let testdata = `199
200
208
210
200
207
240
269
260
263
`;


let values = reader.asStringList(testdata, "\n").map((entry) => Number(entry));
let test = countIncrements(values)
console.log('test 1A: ' + test);

const input = reader
  .read("./res/day1")
  .then((data) => reader.asStringList(data, "\n").map((entry) => Number(entry)));
//Day 1 A

input
  .then((input) => countIncrements(input))
  .then((result) => console.log('Day 1A: ' + result))
  .catch((err) => console.error(err));

let testB = countIncrements(mapToSlidingSums(values));
console.log('test 1B: ' + testB);

//Day 1 B
input
  .then((input) => mapToSlidingSums(input))
  .then((input) => countIncrements(input))
  .then((result) => console.log('Day 1B: ' + result))
  .catch((err) => console.error(err));

//Actual code, don't judge
export function countIncrements(data: number[]): number {
  let incremented = 0;
  data.reduce((prev, current) => {
    if (current > prev) {
      incremented++;
    }
    return current
  })
  return incremented;
}

export function mapToSlidingSums(data: number[]): number[] {
  let slidingSums: number[] = [];

  for (let index = 2; index < data.length; index++) {
      slidingSums.push(data[index] + data[index - 1] + data[index - 2]) 
  }

  return slidingSums;
}
import { FileReader } from "./tools/filereader";

let reader = new FileReader();

let testData = `16,1,2,0,4,2,7,1,2,14`;
let testA = findDistances(testData.split(',').map(Number));
console.log('testA: ' + testA);
let testB = findDistancesB(testData.split(',').map(Number));
console.log('testB: ' + testB);

const input = reader.read('./res/day7')
    .then((data) => data.split(',').map(Number));

input.then((input) => findDistances(input))
    .then((result) => console.log("Day 7A: " + result))
    .catch((error) => console.error(error));

input.then((input) => findDistancesB(input))
    .then((result) => console.log("Day 7A: " + result))
    .catch((error) => console.error(error));



function findDistances(input: number[]): number {
    let result = 99999999999999; //Large result just to get the ball started


    for (const rowIndex of input) {
        //find distances for this number
        let currentSum = 0;
        for (const crabSub of input) {
            currentSum = Math.abs(crabSub - rowIndex) + currentSum;
        }
        if (currentSum < result) {
            result = currentSum;
        }
    }

    return result;
}

function findDistancesB(input: number[]): number {
    let result = 9999999999999999999999999999999999999999999999999999999999999999999999999999999; //Large result just to get the ball started

    let max = input.reduce((max, current) => {
        if (current > max) {
            return current;
        }
        return max;
    });

    for (let currentRow = 0; currentRow < max; currentRow++) {
        //find distances for this number
        let currentSum = 0;
        for (const crabSub of input) {
            let distance = Math.abs(crabSub - currentRow);
            let sum = (distance + 1) * (distance / 2); //sum of all stuff = (max + min) * amount of items / 2 
            currentSum += sum;
        }
        if (currentSum < result) {
            result = currentSum;
        }
    }

    return result;
}
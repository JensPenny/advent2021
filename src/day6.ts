import { FileReader } from "./tools/filereader";

let reader = new FileReader();

let testData = `3,4,3,1,2`;
let testFish = testData.split(',').map((input) => Number(input));
let dayAfish = evolveFish(testFish, 80);
console.log('test 80 days: expected 5934 is ' + dayAfish.length);
testFish = evolveBetter(testFish, 80);
console.log('test B algo: ' + testFish.reduce((sum, curr) => sum = sum + curr));

const input = reader.read('./res/day6')
    .then((data) => data.split(',').map((input) => Number(input)));

input
    .then((input) => evolveFish(input, 80))
    .then((result) => console.log("Day6A: " + result.length))
    .catch((err) => console.error(err));

input
.then((input) => evolveBetter(input, 256))
.then((evolved) => evolved.reduce((sum, curr) => sum = sum + curr))
.then((result) => console.log("Day6B: " + result))
.catch((err) => console.error(err));


function evolveFish(fishies: number[], days: number): number[] {
    let mutableFish = [...fishies];
    let juveniles: number[] = [];
    for (let cycle = 0; cycle < days; cycle++) {
        for (let fishdex = 0; fishdex < mutableFish.length; fishdex++) {
            const fish = mutableFish[fishdex];

            if (fish == 0) {
                mutableFish[fishdex] = 6;
                juveniles.push(8);
            } else {
                mutableFish[fishdex] = fish - 1;
            }
        }
        mutableFish = mutableFish.concat(juveniles);
        juveniles = [];
    }
    return mutableFish;
}

function evolveBetter(fishies: number[], days: number) : number[] {
    let fishBuckets = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    fishies.forEach((fish) => {
        fishBuckets[fish] = fishBuckets[fish] + 1;
    });

    for (let cycle = 0; cycle < days; cycle++) {
        let currentNew = fishBuckets.shift() || 0;

        fishBuckets.push(currentNew);
        fishBuckets[6] = fishBuckets[6] + currentNew;
    }

    return fishBuckets;
}
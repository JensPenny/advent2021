import { FileReader } from "./tools/filereader";

let reader = new FileReader();

let testData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

const result = calculateGampsilon(reader.asStringList(testData, '\n'));
//console.log(result);
console.log('Day 3A test: ' + parseInt(result.a.epsilon, 2) * parseInt(result.a.gamma, 2))
console.log('Day 3B test: ' + parseInt(result.b.oxyrating, 2) * parseInt(result.b.scrubrating, 2))

const values = reader.read('./res/day3')
    .then((data) => reader.asStringList(data, '\n'))
    .then((input) => calculateGampsilon(input));

//day 3A
values
    .then((result) => {
        console.log(result);
        return parseInt(result.a.epsilon, 2) * parseInt(result.a.gamma, 2);
    })
    .then((result) => console.log('Day 3A result: ' + result))
    .catch((err) => console.error(err));

//day 3B
values
    .then((result) => parseInt(result.b.oxyrating, 2) * parseInt(result.b.scrubrating, 2))
    .then((result) => console.log('Day 3B result: ' + result))
    .catch((err) => console.error(err));

interface ResA {
    gamma: string;
    epsilon: string;
    equal: string; //briccoleren want ik lees opgaves niet tegoei fml
}

interface ResB {
    oxyrating: string;
    scrubrating: string;
}

function calculateGampsilon(data: string[]): { a: ResA, b: ResB } {

    //Part 1
    let { gamma, epsilon ,equal } = calculateGamma(data);

    //Part 2 - suffering incorporated. This code quality is a good example of sunk cost fallacy in refactoring imo
    let oxyrating = '';
    let scrubrating = '';

    let oxyPossibilities = [...data]; //clone data
    let scrubberPossibilities = [...data]
    for (let index = 0; index < data[0].length; index++) {
        let updatedGamma = calculateGamma(oxyPossibilities);
        let bit = updatedGamma.gamma.split('')[index];
        let isEqual = updatedGamma.equal.split('')[index];

        oxyPossibilities = oxyPossibilities.filter(data => {
            if (isEqual == '1') {
                bit = '1';
            }
            return data[index] == bit;
        });

        if (oxyPossibilities.length == 1) {
            oxyrating = oxyPossibilities[0];
        }

        //Redo this for the scrubber, since these lists can differ
        updatedGamma = calculateGamma(scrubberPossibilities);
        bit = updatedGamma.epsilon.split('')[index]; //use epsilon here instead of gamma
        isEqual = updatedGamma.equal.split('')[index];
        scrubberPossibilities = scrubberPossibilities.filter(data => {
            if (isEqual == '1') {
                bit = '0';
            }
            return data[index] == bit;
        });
        if (scrubberPossibilities.length == 1) {
            scrubrating = scrubberPossibilities[0];
        };

        if (oxyrating != '' && scrubrating != '') {
            break;
        }
    }

    return {
        a: { gamma: gamma, epsilon: epsilon, equal: equal },
        b: { oxyrating: oxyrating, scrubrating: scrubrating }
    }

    function calculateGamma(data: string[]): ResA {
        let totals: number[] = [];
        data.forEach(value => {
            const splitted = value.split('');
            for (let index = 0; index < splitted.length; index++) {
                const bit = splitted[index];
                if (bit == '1') {
                    totals[index] = totals[index] + 1 || 1; //falsy (nan) wordt 1
                } else {
                    totals[index] = totals[index] || 0;
                }
            }
        });

        let halfSize = data.length / 2;
        let gamma = '';
        let epsilon = '';
        let equal = '';

        totals.forEach(bitAmount => {

            if (bitAmount == halfSize) {
                equal = equal + '1'; 
            } else {
                equal = equal + '0';
            }

            if (bitAmount >= halfSize) {
                gamma = gamma + '1';
                epsilon = epsilon + '0'; //Geen idee hoe die bits te flippen, maar dit werkt even goed /shrug
            } else {
                gamma = gamma + '0';
                epsilon = epsilon + '1';
            }
        });
        return { gamma, epsilon, equal };
    }
}
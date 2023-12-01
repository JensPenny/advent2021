import { stringify } from "querystring";
import { FileReader } from "./tools/filereader";

let test = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

let testInput = parseInput(test);
let testA = countSpecialDigits(testInput);
console.log('TestA: ' + testA);

let reader = new FileReader();
const input = reader.read('./res/day8')
    .then((data) => parseInput(data));

input.then(countSpecialDigits)
    .then((output) => console.log("Day A: " + output))
    .catch((err) => console.error(err));


function parseInput(input: String): Row[] {
    const rows = input.split('\n');
    let rowObjects = rows.map((row) => {
        let splitted = row.split(' | ');
        return {
            signals: splitted[0].split(' '),
            digits: splitted[1].split(' ')
        }
    });
    return rowObjects;
}

function countSpecialDigits(input: Row[]): number {
    let digits = input.map((input) => input.digits).flat();

    let counter = 0;
    digits.forEach(digit => {
        let length = digit.length;
        if (length == 2 || length == 3 || length == 4 || length == 7) {
            counter++;
        }
    });
    return counter;
}

interface Row {
    signals: string[];
    digits: string[];
}
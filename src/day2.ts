import { FileReader } from './tools/filereader'

class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    resultALocation(): number {
        return this.x * -this.y;
    }
}

class Command {
    readonly direction: string;
    readonly amount: number;

    constructor(direction: string, amount: number) {
        this.direction = direction;
        this.amount = amount;
    }
}

let reader = new FileReader();
let testdata = `forward 5
down 5
forward 8
up 3
down 8
forward 2
`

const testvalues = reader.asStringList(testdata, "\n").map((value) => {
    let pair = value.split(' ');
    return new Command(pair[0], Number(pair[1]));
})
let testPointA = calculatePoint(testvalues);
console.log('Day 2A test: ' + testPointA.resultALocation());

let testB = calculateAimedPoint(testvalues);
console.log('Day 2B test: ' + testB.resultALocation());
const values = reader.read('./res/day2')
    .then((data) => reader.asStringList(data, "\n").map((value) => {
        let pair = value.split(' ');
        return new Command(pair[0], Number(pair[1]));
    }));

values
    .then((input) => calculatePoint(input))
    .then((result) => console.log('Day 2A: ' + result.resultALocation()))
    .catch((err) => console.error(err));

values
    .then((input) => calculateAimedPoint(input))
    .then((result) => console.log('Day 2B: ' + result.resultALocation()))
    .catch((err) => console.error(err));

function calculatePoint(commands: Command[]): Point {
    let point: Point = new Point(0, 0)

    commands.forEach(command => {
        switch (command.direction) {
            case 'forward':
                point.x += command.amount
                break;
            case 'up':
                point.y += command.amount
                break;
            case 'down':
                point.y -= command.amount
                break;
            default:
                console.error('unknown direction ' + command.direction);
                break;
        }
    });

    return point;
}

function calculateAimedPoint(commands: Command[]): Point {
    let point: Point = new Point(0, 0);
    let aim = 0;

    commands.forEach(command => {
        switch (command.direction) {
            case 'forward':
                point.x += command.amount;
                point.y += command.amount * aim;
                break;
            case 'up':
                aim += command.amount;
                break;
            case 'down':
                aim -= command.amount;
                break;
            default:
                console.error('unknown direction ' + command.direction);
                break;
        }
    })

    return point;
}

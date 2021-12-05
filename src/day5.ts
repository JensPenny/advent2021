import { FileReader } from "./tools/filereader";

const reader = new FileReader();

let testData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

let lines = parseInput(testData);
let grid = fillLines(lines);
console.log(grid);
let overlaps = countOverlaps(grid);
console.log('testoverlaps: ' + overlaps);

let grid2 = fillLines(lines, false);
console.log(grid2);
let overlapsB = countOverlaps(grid2);
console.log('testoverlaps B: ' + overlapsB);

const input = reader.read('./res/day5')
    .then((data) => parseInput(data));

input
    .then((input) => fillLines(input))
    .then((grid) => countOverlaps(grid))
    .then((result) => console.log("Day5A: " + result))
    .catch((err) => console.error(err));

input
    .then((input) => fillLines(input, false))
    .then((grid) => countOverlaps(grid))
    .then((result) => console.log("Day5B: " + result))
    .catch((err) => console.error(err));

function parseInput(input: string): Line[] {
    let linedata = input.split('\n');
    let lines: Line[] = [];
    linedata.forEach(singleLine => {
        let points = singleLine.split(' -> ');
        let start = points[0].split(',');
        let end = points[1].split(',')

        lines.push({
            start: { x: Number(start[0]), y: Number(start[1]) },
            end: { x: Number(end[0]), y: Number(end[1]) }
        })
    });

    return lines;
}

function fillLines(lines: Line[], onlystraight: boolean = true): number[][] {
    let grid: number[][] = [];
    let gridLines: Line[];
    if (onlystraight) {
        gridLines = lines.filter((line) => line.start.x == line.end.x || line.start.y == line.end.y);
    } else {
        gridLines = lines;
    }

    gridLines.forEach((line) => {
        //let sorted = sortedLine(line);

        let currentX = line.start.x;
        let currentY = line.start.y;

        //add starting point
        if (grid[currentY] == undefined) {
            grid[currentY] = [];
        }
        grid[currentY][currentX] = grid[currentY][currentX] + 1 || 1;

        while (!(currentX == line.end.x && currentY == line.end.y)) {

            if (currentX != line.end.x) {
                if (currentX > line.end.x) {
                    currentX--;
                } else if (currentX < line.end.x) {
                    currentX++;
                }
            }

            if (currentY != line.end.y) {
                if (currentY > line.end.y) {
                    currentY--;
                } else if (currentY < line.end.y) {
                    currentY++;
                }
            }

            //add next point
            if (grid[currentY] == undefined) {
                grid[currentY] = [];
            }
            grid[currentY][currentX] = grid[currentY][currentX] + 1 || 1;

        }
    })
    return grid;
}

function countOverlaps(grid: number[][]): number {
    let overlaps: number = 0;
    for (const rowAtt in grid) {
        const row = grid[rowAtt];
        for (const elementAtt in row) {
            const element = row[elementAtt];
            if (element > 1) {
                overlaps++;
            }
        }
    }
    return overlaps;
}

interface Point {
    x: number,
    y: number
}

interface Line {
    start: Point,
    end: Point
}
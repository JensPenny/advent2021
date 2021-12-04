import { FileReader } from "./tools/filereader";

let reader = new FileReader();

let testData = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

//dayA(createInput(testData));
//dayB(createInput(testData));

const input = reader.read('./res/day4')
    .then((data) => createInput(data));

//Day 4A
/*input
    .then((input) => dayA(input))
    .catch((error) => console.error(error));*/

input
    .then((input) => dayB(input))
    .catch((error) => console.error(error));

function dayA(input: Input) {
    printBoards(input);
    input.draw.forEach((drawn) => {
        input.boards.forEach((board) => {
            doDraw(board, drawn);
            if (checkWinner(board)) {
                console.log('winner winner');
                printBoard(board);
                let dayA = calculateWinA(board, drawn);
                console.log('result day4A: ' + dayA);
                process.exit(0);
            }
        })
        printBoards(input);
    });
}

function dayB(input: Input) {
    let boards = input.boards;
    let wonIndices: number[] = [];

    input.draw.forEach((drawn) => {
        boards.forEach((board, index) => {
            if (wonIndices.includes(index)) {
                return;
            }
            doDraw(board, drawn);
            if (checkWinner(board)) {
                console.log('winner winner on draw ' + drawn);
                wonIndices.push(index);
                if (wonIndices.length == boards.length) {
                    printBoard(board);
                    let dayA = calculateWinA(board, drawn);
                    console.log('result day4B: ' + dayA);
                    process.exit(0);
                }
            }
        })
        printBoards(input);
    });
}

function doDraw(board: Board, draw: number) {
    for (let rowIndex = 0; rowIndex < board.board.length; rowIndex++) {
        const row = board.board[rowIndex];
        const foundIndex = row.indexOf(draw);
        if (foundIndex != -1) {
            board.board[rowIndex][foundIndex] = NaN;
            return; //Quick break - each number is once on each board
        }
    }
}

function checkWinner(board: Board): boolean {
    for (let rowIndex = 0; rowIndex < board.board.length; rowIndex++) {
        const row = board.board[rowIndex];
        //Check rows for winners
        if (row.every((element) => isNaN(element))) {
            return true;
        }

        //Check columns for winners
        let column = [];
        for (let columnIndex = 0; columnIndex < board.board.length; columnIndex++) {
            const element = board.board[columnIndex][rowIndex];
            column.push(element);
        }
        if (column.every((element) => isNaN(element))) {
            return true;
        }
    }
    return false;
}

function calculateWinA(board: Board, drawn: number): number {
    let numbers = board.board.flat().filter((element) => !isNaN(element));
    let total = numbers.reduce((sum, current) => sum + current);
    return total * drawn;
}

function createInput(data: string): Input {
    let input = reader.asStringList(data, '\n\n');
    let draw = input[0].trim().split(',').map((entry) => Number(entry));

    let boards: Board[] = [];
    for (let index = 1; index < input.length; index++) {
        const boardData = input[index];
        let board = createBoard(boardData);
        boards.push(board);
    }
    return { draw, boards }
}

function createBoard(data: string): Board {
    let board: number[][] = [];

    let rows = data.split('\n');
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        let rowData = rows[rowIndex].trim().split(/\s+/).map((input) => Number(input.trim()));
        board[rowIndex] = [];

        for (let columnIndex = 0; columnIndex < rowData.length; columnIndex++) {
            const element = rowData[columnIndex];
            board[rowIndex][columnIndex] = element;
        }
    }

    return { board }
}

function printBoards(input: Input) {
    input.boards.forEach((board => {
        printBoard(board);
        console.log('');
    }));
}

function printBoard(board: Board) {
    board.board.forEach(row => {
        let rowString = ''
        row.forEach(element => {
            rowString += element + ' ';
        });
        console.log(rowString);
    });
}

interface Input {
    draw: number[];
    boards: Board[];
}

interface Board {
    board: number[][];
}


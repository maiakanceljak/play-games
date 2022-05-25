export const GRID = [
	[{row: 0, col: 0},{row: 0, col: 1},{row: 0, col: 2},
		{row: 1, col: 0},{row: 1, col: 1},{row: 1, col: 2},
		{row: 2, col: 0},{row: 2, col: 1},{row: 2, col: 2}],
	[{row: 0, col: 3},{row: 0, col: 4},{row: 0, col: 5},
		{row: 1, col: 3},{row: 1, col: 4},{row: 1, col: 5},
		{row: 2, col: 3},{row: 2, col: 4},{row: 2, col: 5}],
	[{row: 0, col: 6},{row: 0, col: 7},{row: 0, col: 8},
		{row: 1, col: 6},{row: 1, col: 7},{row: 1, col: 8},
		{row: 2, col: 6},{row: 2, col: 7},{row: 2, col: 8}],
	
	[{row: 3, col: 0},{row: 3, col: 1},{row: 3, col: 2},
		{row: 4, col: 0},{row: 4, col: 1},{row: 4, col: 2},
		{row: 5, col: 0},{row: 5, col: 1},{row: 5, col: 2}],
	[{row: 3, col: 3},{row: 3, col: 4},{row: 3, col: 5},
		{row: 4, col: 3},{row: 4, col: 4},{row: 4, col: 5},
		{row: 5, col: 3},{row: 5, col: 4},{row: 5, col: 5}],
	[{row: 3, col: 6},{row: 3, col: 7},{row: 3, col: 8},
		{row: 4, col: 6},{row: 4, col: 7},{row: 4, col: 8},
		{row: 5, col: 6},{row: 5, col: 7},{row: 5, col: 8}],

	[{row: 6, col: 0},{row: 6, col: 1},{row: 6, col: 2},
		{row: 7, col: 0},{row: 7, col: 1},{row: 7, col: 2},
		{row: 8, col: 0},{row: 8, col: 1},{row: 8, col: 2}],
	[{row: 6, col: 3},{row: 6, col: 4},{row: 6, col: 5},
		{row: 7, col: 3},{row: 7, col: 4},{row: 7, col: 5},
		{row: 8, col: 3},{row: 8, col: 4},{row: 8, col: 5}],
	[{row: 6, col: 6},{row: 6, col: 7},{row: 6, col: 8},
		{row: 7, col: 6},{row: 7, col: 7},{row: 7, col: 8},
		{row: 8, col: 6},{row: 8, col: 7},{row: 8, col: 8}]
]

export function puzzleComplete(cells, solution) {
	for (let i = 0; i < solution.length; i++) {
		for (let j = 0; j < solution[i].length; j++) {
			if (cells[i][j] !== solution[i][j]) {
				return false
			}
		}
	}
	return true
}

export function numAllUsed(num, cells) {
	let numUsed = 0
	for (let i=0; i<9; i++) {
		for (let j=0; j<9; j++) {
			if (cells[i][j] === num) {
				numUsed++
			}
			if (numUsed >= 9) {
				return true
			}
		}
	}
	return false
}

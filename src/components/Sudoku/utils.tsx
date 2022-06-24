import { cloneDeep } from 'lodash'

// eslint-disable-next-line
const BASE_GAME = [
	[null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],
    
  [null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],
    
  [null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],
    
  [null, null, null,
    null, null, null,
    null, null, null]
]

const GRID = [
	[{i: 0, j: 0},{i: 0, j: 1},{i: 0, j: 2},
		{i: 1, j: 0},{i: 1, j: 1},{i: 1, j: 2},
		{i: 2, j: 0},{i: 2, j: 1},{i: 2, j: 2}],
	[{i: 0, j: 3},{i: 0, j: 4},{i: 0, j: 5},
		{i: 1, j: 3},{i: 1, j: 4},{i: 1, j: 5},
		{i: 2, j: 3},{i: 2, j: 4},{i: 2, j: 5}],
	[{i: 0, j: 6},{i: 0, j: 7},{i: 0, j: 8},
		{i: 1, j: 6},{i: 1, j: 7},{i: 1, j: 8},
		{i: 2, j: 6},{i: 2, j: 7},{i: 2, j: 8}],
	
	[{i: 3, j: 0},{i: 3, j: 1},{i: 3, j: 2},
		{i: 4, j: 0},{i: 4, j: 1},{i: 4, j: 2},
		{i: 5, j: 0},{i: 5, j: 1},{i: 5, j: 2}],
	[{i: 3, j: 3},{i: 3, j: 4},{i: 3, j: 5},
		{i: 4, j: 3},{i: 4, j: 4},{i: 4, j: 5},
		{i: 5, j: 3},{i: 5, j: 4},{i: 5, j: 5}],
	[{i: 3, j: 6},{i: 3, j: 7},{i: 3, j: 8},
		{i: 4, j: 6},{i: 4, j: 7},{i: 4, j: 8},
		{i: 5, j: 6},{i: 5, j: 7},{i: 5, j: 8}],

	[{i: 6, j: 0},{i: 6, j: 1},{i: 6, j: 2},
		{i: 7, j: 0},{i: 7, j: 1},{i: 7, j: 2},
		{i: 8, j: 0},{i: 8, j: 1},{i: 8, j: 2}],
	[{i: 6, j: 3},{i: 6, j: 4},{i: 6, j: 5},
		{i: 7, j: 3},{i: 7, j: 4},{i: 7, j: 5},
		{i: 8, j: 3},{i: 8, j: 4},{i: 8, j: 5}],
	[{i: 6, j: 6},{i: 6, j: 7},{i: 6, j: 8},
		{i: 7, j: 6},{i: 7, j: 7},{i: 7, j: 8},
		{i: 8, j: 6},{i: 8, j: 7},{i: 8, j: 8}]
]


export const basicGrid = [
	{
		id: 0,
		inner: [0,1,2]
	},
	{
		id: 1,
		inner: [3,4,5]
	},
	{
		id: 2,
		inner: [6,7,8]
	}
]

type HistoryType = {
	cells: (number | null)[][],
	selected: {
		cell: number;
		box: number;
}
}

export type GameType = {
	history: HistoryType[],
	mistakes: number,
	lastClickBox: boolean
}


function puzzleComplete(cells: (number | null)[][], solution: number[][]) {
	for (let i = 0; i < solution.length; i++) {
		for (let j = 0; j < solution[i].length; j++) {
			if (cells[i][j] !== solution[i][j]) {
				return false
			}
		}
	}
	return true
}

export function numAllUsed(num: number, cells: (number | null)[][]) {
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

export function highlightColour(
	selectedCell: number, 
	selectedBox: number, 
	cell: number, 
	box: number, 
	cells: (number | null)[][], 
	mistakes: number, 
	solution: number[][]
) {
	if (selectedCell === null || selectedBox === null) {
		return "white"
	}

	if (mistakes >= 3) {
		return "rgb(220, 220, 220)"
	} 

	if (puzzleComplete(cells, solution)) {
		return "cornsilk"
	}
	
	if (cell === selectedCell && box === selectedBox) {
		return "lightskyblue"
	}

	const highlight = (cell === selectedCell || GRID[cell][box].i === GRID[selectedCell][selectedBox].i || GRID[cell][box].j === GRID[selectedCell][selectedBox].j)
	if (cells[selectedCell][selectedBox] === cells[cell][box]  && cells[cell][box] !== null) {
		return highlight ? "pink" : "rgb(197, 197, 197)"
	}

	return highlight ? "rgb(220, 220, 220)" : "white"
}

export function gameStatus(mistakes: number, solution: number[][], cells: (number | null)[][]) {
	if (mistakes >= 3) {
		return {message: "Game Over", colour: "red"}
	}
	
	if (puzzleComplete(cells, solution)) {
		return {message: "Complete!", colour: "mediumseagreen"}
	}

	return {message: "In Progress...", colour: "black"}
}

export function handleBoxClick(
	game: GameType, 
	cell: number, 
	box: number, 
	solution: number[][], 
	history: HistoryType[], 
	cells: (number | null)[][]
	) {
	if (puzzleComplete(cells, solution) || game.mistakes >= 3) {
		return game
	}
	if (history.length > 1 && game.lastClickBox) {
		history.pop()
	}
	return {
		history: history.concat({
			cells: cells,
			selected: {cell: cell, box: box}
		}),
		mistakes: game.mistakes,
		lastClickBox: true
	}
}

export function handleClearClick(
	game: GameType, 
	cell: number, 
	box: number,
	initial: (number | null)[][], 
	solution: number[][], 
	history: HistoryType[], 
	cells: (number | null)[][]
	) {
	if (puzzleComplete(cells, solution) || game.mistakes >= 3) {
		return game
	}
	if (cell !== null && box !== null) {
		if (initial[cell][box] === null) {
			cells[cell][box] = null
		}
		if (history.length > 1 && game.lastClickBox) {
			history.pop()
		}
		return {
			history: history.concat({
				cells: cells,
				selected: {cell: cell, box: box}
			}),
			mistakes: game.mistakes,
			lastClickBox: false
		}
	}
	return game
}

export function handleUndoClick(game: GameType, history: HistoryType[]) {
	if (history.length <= 1) {
		return game
	}
	if (game.lastClickBox) {
		history.pop()
	}

	const current = history[history.length - 1]
	if (current.selected.cell && current.selected.box && current.cells[current.selected.cell][current.selected.box]) {
		const cells = cloneDeep([...current.cells])
		const cell = current.selected.cell
		const box = current.selected.box
		cells[cell][box] = null
		history.pop()
		return {
			history: history.concat({
				cells: cells,
				selected: {cell: cell, box: box}
			}),
			mistakes: game.mistakes,
			lastClickBox: true
		}
	}
	history.pop()
	return {
		history: history,
		mistakes: game.mistakes,
		lastClickBox: false
	}
}

export function handleNumberClick(
	value: number | null, 
	game: GameType, 
	cell: number, 
	box: number,
	initial: (number | null)[][], 
	solution: number[][], 
	history: HistoryType[], 
	cells: (number | null)[][]) {
	if (puzzleComplete(cells, solution) || game.mistakes >= 3) {
		return game
	}
	let mistakes = game.mistakes
	if (cell !== null && box !== null) {
		if (initial[cell][box] === null) {
			if (cells[cell][box] === value) {
				cells[cell][box] = null
			} else {
				cells[cell][box] = value
				if (value !== solution[cell][box]) {
					mistakes++
				}
			}
		}
	}
	if (history.length > 1 && game.lastClickBox) {
		history.pop()
	}
	return {
		history: history.concat({
			cells: cells,
			selected: {cell: cell, box: box}
		}),
		mistakes: mistakes,
		lastClickBox: false
	}
}

type EmptyCell = {
	i: number,
	j: number,
}

export function getFirstEmptyCell(initial: (number | null)[][]): EmptyCell {
	return GRID.map(
		row => row.find(box => initial[box.i][box.j] === null)
	)[0]!
}